import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { cpuData, gpuData } from "../data/hardware";
import { gamesData } from "../data/games";
import { Cpu, Monitor, BarChart3, Zap, Gauge } from "lucide-react";

export function ComparePage() {
  const [selectedCPU1, setSelectedCPU1] = useState("");
  const [selectedCPU2, setSelectedCPU2] = useState("");
  const [selectedGPU1, setSelectedGPU1] = useState("");
  const [selectedGPU2, setSelectedGPU2] = useState("");

  const cpu1 = cpuData.find(c => c.id === selectedCPU1);
  const cpu2 = cpuData.find(c => c.id === selectedCPU2);
  const gpu1 = gpuData.find(g => g.id === selectedGPU1);
  const gpu2 = gpuData.find(g => g.id === selectedGPU2);

  const testGames = gamesData.slice(0, 5);

  const getPerformanceScore = (cpu: any, gpu: any) => {
    if (!cpu || !gpu) return 0;
    return Math.round((cpu.score + gpu.score) / 2);
  };

  const score1 = getPerformanceScore(cpu1, gpu1);
  const score2 = getPerformanceScore(cpu2, gpu2);

  const getWinner = () => {
    if (score1 > score2) return "config1";
    if (score2 > score1) return "config2";
    return "tie";
  };

  const winner = getWinner();

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Сравнение железа</h1>
        <p className="text-muted-foreground">
          Сравните производительность двух конфигураций ПК
        </p>
      </div>

      {/* Hardware Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              Конфигурация 1
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Процессор</label>
              <Select value={selectedCPU1} onValueChange={setSelectedCPU1}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите CPU" />
                </SelectTrigger>
                <SelectContent>
                  {cpuData.map((cpu) => (
                    <SelectItem key={cpu.id} value={cpu.id}>
                      {cpu.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Видеокарта</label>
              <Select value={selectedGPU1} onValueChange={setSelectedGPU1}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите GPU" />
                </SelectTrigger>
                <SelectContent>
                  {gpuData.map((gpu) => (
                    <SelectItem key={gpu.id} value={gpu.id}>
                      {gpu.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              Конфигурация 2
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Процессор</label>
              <Select value={selectedCPU2} onValueChange={setSelectedCPU2}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите CPU" />
                </SelectTrigger>
                <SelectContent>
                  {cpuData.map((cpu) => (
                    <SelectItem key={cpu.id} value={cpu.id}>
                      {cpu.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Видеокарта</label>
              <Select value={selectedGPU2} onValueChange={setSelectedGPU2}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите GPU" />
                </SelectTrigger>
                <SelectContent>
                  {gpuData.map((gpu) => (
                    <SelectItem key={gpu.id} value={gpu.id}>
                      {gpu.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Results */}
      {cpu1 && gpu1 && cpu2 && gpu2 && (
        <div className="space-y-6">
          {/* Overall Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Общая производительность
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">{score1}</div>
                  <div className="text-sm text-muted-foreground">Конфигурация 1</div>
                  {winner === "config1" && (
                    <Badge className="bg-primary">Победитель</Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="text-2xl font-bold text-muted-foreground">VS</div>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">{score2}</div>
                  <div className="text-sm text-muted-foreground">Конфигурация 2</div>
                  {winner === "config2" && (
                    <Badge className="bg-primary">Победитель</Badge>
                  )}
                  {winner === "tie" && (
                    <Badge variant="outline">Ничья</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Specs */}
          <Card>
            <CardHeader>
              <CardTitle>Детальное сравнение</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Конфигурация 1</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Cpu className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{cpu1.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {cpu1.cores}C/{cpu1.threads}T • {cpu1.baseFreq}GHz
                        </div>
                        <div className="text-sm font-medium text-primary">
                          Рейтинг: {cpu1.score}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Monitor className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{gpu1.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {gpu1.vram}GB VRAM • {gpu1.supportsRayTracing ? "RT поддержка" : "Без RT"}
                        </div>
                        <div className="text-sm font-medium text-primary">
                          Рейтинг: {gpu1.score}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Конфигурация 2</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Cpu className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{cpu2.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {cpu2.cores}C/{cpu2.threads}T • {cpu2.baseFreq}GHz
                        </div>
                        <div className="text-sm font-medium text-primary">
                          Рейтинг: {cpu2.score}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Monitor className="h-5 w-5 text-primary" />
                      <div>
                        <div className="font-medium">{gpu2.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {gpu2.vram}GB VRAM • {gpu2.supportsRayTracing ? "RT поддержка" : "Без RT"}
                        </div>
                        <div className="text-sm font-medium text-primary">
                          Рейтинг: {gpu2.score}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Game Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-primary" />
                Производительность в играх
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testGames.map((game) => {
                  const fps1 = Math.round(game.fps.medium * (score1 / 100));
                  const fps2 = Math.round(game.fps.medium * (score2 / 100));
                  
                  return (
                    <div key={game.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded overflow-hidden">
                          <img 
                            src={game.imageUrl} 
                            alt={game.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{game.title}</div>
                          <div className="text-sm text-muted-foreground">{game.genre}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="font-bold text-lg">{fps1} FPS</div>
                          <div className="text-xs text-muted-foreground">Конфиг 1</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">{fps2} FPS</div>
                          <div className="text-xs text-muted-foreground">Конфиг 2</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}