import { useState, useMemo } from "react";
import { GameCard, GameData } from "./GameCard";
import { ProgressRing } from "./ProgressRing";
import { CompatibilityBadge, CompatibilityStatus } from "./CompatibilityBadge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { gamesData } from "../data/games";
import { cpuData, gpuData } from "../data/hardware";
import { Search, Filter, Cpu, Monitor, MemoryStick, AlertCircle } from "lucide-react";

interface ResultsPageProps {
  selectedCPU: string;
  selectedGPU: string;
  selectedRAM: string;
  integratedGraphics: boolean;
}

export function ResultsPage({ selectedCPU, selectedGPU, selectedRAM, integratedGraphics }: ResultsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [compatibilityFilter, setCompatibilityFilter] = useState("all");
  
  const cpu = cpuData.find(c => c.id === selectedCPU);
  const gpu = gpuData.find(g => g.id === selectedGPU);
  
  // Calculate overall compatibility score
  const compatibilityScore = useMemo(() => {
    if (!cpu || !gpu) return 0;
    const avgScore = (cpu.score + gpu.score) / 2;
    // Adjust for RAM
    const ramScore = parseInt(selectedRAM) >= 16 ? 1 : parseInt(selectedRAM) >= 8 ? 0.9 : 0.7;
    return Math.round(avgScore * ramScore);
  }, [cpu, gpu, selectedRAM]);

  const getCompatibilityStatus = (score: number): CompatibilityStatus => {
    if (score >= 80) return "compatible";
    if (score >= 60) return "borderline";
    return "incompatible";
  };

  const overallStatus = getCompatibilityStatus(compatibilityScore);

  // Filter games
  const filteredGames = useMemo(() => {
    return gamesData.filter((game) => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = genreFilter === "all" || game.genre === genreFilter;
      const matchesCompatibility = compatibilityFilter === "all" || game.compatibility === compatibilityFilter;
      return matchesSearch && matchesGenre && matchesCompatibility;
    });
  }, [searchQuery, genreFilter, compatibilityFilter]);

  const compatibleGames = gamesData.filter(g => g.compatibility === "compatible").length;
  const borderlineGames = gamesData.filter(g => g.compatibility === "borderline").length;
  const incompatibleGames = gamesData.filter(g => g.compatibility === "incompatible").length;

  const genres = [...new Set(gamesData.map(game => game.genre))];

  return (
    <div className="space-y-8">
      {/* System Summary */}
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 flex justify-center">
            <ProgressRing 
              percentage={compatibilityScore} 
              status={overallStatus}
              size={140}
            />
          </div>
          
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Анализ совместимости</h2>
              <div className="flex items-center gap-2 mb-4">
                <CompatibilityBadge status={overallStatus} size="lg" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Cpu className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{cpu?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {cpu?.cores}C/{cpu?.threads}T
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Monitor className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{gpu?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {gpu?.vram}GB VRAM
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <MemoryStick className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{selectedRAM} GB RAM</div>
                  <div className="text-sm text-muted-foreground">
                    {integratedGraphics ? "Интегрированная графика" : "Дискретная графика"}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{compatibleGames}</div>
                <div className="text-sm text-muted-foreground">Совместимо</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">{borderlineGames}</div>
                <div className="text-sm text-muted-foreground">На грани</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-muted-foreground">{incompatibleGames}</div>
                <div className="text-sm text-muted-foreground">Требуется апгрейд</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск игр..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={genreFilter} onValueChange={setGenreFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Жанр" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все жанры</SelectItem>
              {genres.map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={compatibilityFilter} onValueChange={setCompatibilityFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Совместимость" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все игры</SelectItem>
              <SelectItem value="compatible">Совместимо</SelectItem>
              <SelectItem value="borderline">На грани</SelectItem>
              <SelectItem value="incompatible">Требуется апгрейд</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Games Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold">
            Результаты ({filteredGames.length} {filteredGames.length === 1 ? 'игра' : filteredGames.length < 5 ? 'игры' : 'игр'})
          </h3>
        </div>
        
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-border">
            <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Игры не найдены</h3>
            <p className="text-muted-foreground mb-4">
              Попробуйте изменить фильтры или поисковый запрос
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setGenreFilter("all");
                setCompatibilityFilter("all");
              }}
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}