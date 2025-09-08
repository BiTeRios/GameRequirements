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
import { Search, Filter, Cpu, Monitor, MemoryStick, HardDrive, Gamepad2 } from "lucide-react";

interface ResultsPageProps {
  selectedCPU: string;
  selectedGPU: string;
  selectedRAM: string;
  integratedGraphics: boolean;
}

export function ResultsPage({ 
  selectedCPU, 
  selectedGPU, 
  selectedRAM, 
  integratedGraphics 
}: ResultsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [compatibilityFilter, setCompatibilityFilter] = useState("all");
  
  const cpu = cpuData.find(c => c.id === selectedCPU);
  const gpu = gpuData.find(g => g.id === selectedGPU);
  
  // Calculate compatibility score based on hardware
  const compatibilityScore = useMemo(() => {
    if (!cpu || !gpu) return 0;
    const cpuScore = cpu.score;
    const gpuScore = gpu.score;
    const ramBonus = parseInt(selectedRAM) >= 16 ? 5 : 0;
    return Math.min(95, Math.round((cpuScore + gpuScore) / 2 + ramBonus));
  }, [cpu, gpu, selectedRAM]);
  
  const compatibilityStatus: CompatibilityStatus = 
    compatibilityScore >= 80 ? "compatible" : 
    compatibilityScore >= 60 ? "borderline" : "incompatible";
  
  // Filter games based on search and filters
  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           game.genre.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = genreFilter === "all" || game.genre === genreFilter;
      const matchesYear = yearFilter === "all" || 
                         (yearFilter === "recent" && game.year >= 2020) ||
                         (yearFilter === "classic" && game.year < 2020);
      const matchesCompatibility = compatibilityFilter === "all" || 
                                  game.compatibility === compatibilityFilter;
      
      return matchesSearch && matchesGenre && matchesYear && matchesCompatibility;
    });
  }, [searchQuery, genreFilter, yearFilter, compatibilityFilter]);
  
  const genres = [...new Set(gamesData.map(game => game.genre))];

  return (
    <div className="space-y-8">
      {/* Hardware Summary */}
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl font-bold">Ваша конфигурация</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Cpu className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{cpu?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {cpu?.cores}C/{cpu?.threads}T @ {cpu?.baseFreq}GHz
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
                    Системная память
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <HardDrive className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">SSD/HDD</div>
                  <div className="text-sm text-muted-foreground">
                    {integratedGraphics ? "Встроенная графика" : "Дискретная графика"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center space-y-4 lg:min-w-[200px]">
            <ProgressRing 
              percentage={compatibilityScore} 
              status={compatibilityStatus}
              size={120}
            />
            <CompatibilityBadge status={compatibilityStatus} size="lg" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Поиск по играм..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:w-auto">
            <Select value={genreFilter} onValueChange={setGenreFilter}>
              <SelectTrigger className="w-full lg:w-[140px]">
                <SelectValue placeholder="Жанр" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все жанры</SelectItem>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger className="w-full lg:w-[140px]">
                <SelectValue placeholder="Год" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все годы</SelectItem>
                <SelectItem value="recent">2020+</SelectItem>
                <SelectItem value="classic">До 2020</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={compatibilityFilter} onValueChange={setCompatibilityFilter}>
              <SelectTrigger className="w-full lg:w-[150px]">
                <SelectValue placeholder="Совместимость" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все игры</SelectItem>
                <SelectItem value="compatible">Совместимо</SelectItem>
                <SelectItem value="borderline">На грани</SelectItem>
                <SelectItem value="incompatible">Нужен апгрейд</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="w-full lg:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Фильтры
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">
              Найдено игр: {filteredGames.length}
            </h3>
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">
                <Gamepad2 className="h-3 w-3 mr-1" />
                {filteredGames.filter(g => g.compatibility === "compatible").length} совместимо
              </Badge>
              <Badge variant="secondary">
                {filteredGames.filter(g => g.compatibility === "borderline").length} на грани
              </Badge>
              <Badge variant="secondary">
                {filteredGames.filter(g => g.compatibility === "incompatible").length} требует апгрейда
              </Badge>
            </div>
          </div>
        </div>
        
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="text-6xl">🎮</div>
            <h3 className="text-xl font-semibold">Игры не найдены</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить параметры поиска или фильтры
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setGenreFilter("all");
                setYearFilter("all");
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