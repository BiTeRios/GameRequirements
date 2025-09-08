import { useState, useMemo } from "react";
import { GameCard } from "./GameCard";
import { gamesData } from "../data/games";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  Search, 
  Filter, 
  Gamepad2, 
  TrendingUp, 
  Calendar, 
  Trophy,
  Users,
  Zap,
  Eye
} from "lucide-react";

interface GamesPageProps {
  onNavigate?: (page: string) => void;
}

export function GamesPage({ onNavigate }: GamesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedCompatibility, setSelectedCompatibility] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [sortBy, setSortBy] = useState("title");

  // Get unique genres and years for filters
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(gamesData.map(game => game.genre))];
    return uniqueGenres.sort();
  }, []);

  const years = useMemo(() => {
    const uniqueYears = [...new Set(gamesData.map(game => game.year))];
    return uniqueYears.sort((a, b) => b - a);
  }, []);

  // Filter and sort games
  const filteredGames = useMemo(() => {
    let filtered = gamesData.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === "all" || game.genre === selectedGenre;
      const matchesCompatibility = selectedCompatibility === "all" || game.compatibility === selectedCompatibility;
      const matchesYear = selectedYear === "all" || game.year.toString() === selectedYear;
      
      return matchesSearch && matchesGenre && matchesCompatibility && matchesYear;
    });

    // Sort games
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "year":
          return b.year - a.year;
        case "fps":
          return b.fps.high - a.fps.high;
        case "compatibility":
          const compatibilityOrder = { "compatible": 3, "borderline": 2, "incompatible": 1 };
          return compatibilityOrder[b.compatibility] - compatibilityOrder[a.compatibility];
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [searchQuery, selectedGenre, selectedCompatibility, selectedYear, sortBy]);

  const popularGames = gamesData.filter(game => game.compatibility === "compatible").slice(0, 3);
  const recentGames = gamesData.sort((a, b) => b.year - a.year).slice(0, 3);
  const rayTracingGames = gamesData.filter(game => game.hasRayTracing);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("all");
    setSelectedCompatibility("all");
    setSelectedYear("all");
    setSortBy("title");
  };

  const getCompatibilityColor = (compatibility: string) => {
    switch (compatibility) {
      case "compatible": return "text-primary";
      case "borderline": return "text-warning";
      case "incompatible": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getCompatibilityText = (compatibility: string) => {
    switch (compatibility) {
      case "compatible": return "Совместимо";
      case "borderline": return "Ограниченно";
      case "incompatible": return "Несовместимо";
      default: return "Неизвестно";
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative min-h-[40vh] flex items-center justify-center overflow-hidden rounded-2xl">
        {/* Background */}
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1672872476232-da16b45c9001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBnYW1pbmclMjBuZW9ufGVufDF8fHx8MTc1NzMwNTgwNXww&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)'
          }}
        />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 z-10 cyber-grid opacity-30" />
        
        {/* Content */}
        <div className="relative z-20 text-center space-y-6 px-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-[#00ffff] bg-clip-text text-transparent neon-text">
            БАЗА ИГР
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Исследуйте нашу коллекцию из {gamesData.length}+ современных игр с детальными требованиями и тестами производительности
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mt-8">
            <div className="glass-morphism rounded-lg p-4 text-center border border-primary/20">
              <div className="text-2xl font-bold text-primary">{gamesData.length}</div>
              <div className="text-xs text-muted-foreground">Всего игр</div>
            </div>
            <div className="glass-morphism rounded-lg p-4 text-center border border-accent/20">
              <div className="text-2xl font-bold text-accent">{genres.length}</div>
              <div className="text-xs text-muted-foreground">Жанров</div>
            </div>
            <div className="glass-morphism rounded-lg p-4 text-center border border-[#00ffff]/20">
              <div className="text-2xl font-bold text-[#00ffff]">{rayTracingGames.length}</div>
              <div className="text-xs text-muted-foreground">С RTX</div>
            </div>
            <div className="glass-morphism rounded-lg p-4 text-center border border-warning/20">
              <div className="text-2xl font-bold text-warning">{gamesData.filter(g => g.isMultiplayer).length}</div>
              <div className="text-xs text-muted-foreground">Мультиплеер</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="glass-morphism border-border/50">
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Найти игру..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input-background border-border focus:border-primary"
              />
            </div>
            
            {/* Filters Row */}
            <div className="flex flex-wrap gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Жанр</label>
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="w-40 bg-input-background">
                    <SelectValue placeholder="Все жанры" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все жанры</SelectItem>
                    {genres.map(genre => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Совместимость</label>
                <Select value={selectedCompatibility} onValueChange={setSelectedCompatibility}>
                  <SelectTrigger className="w-40 bg-input-background">
                    <SelectValue placeholder="Все" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                    <SelectItem value="compatible">Совместимо</SelectItem>
                    <SelectItem value="borderline">Ограниченно</SelectItem>
                    <SelectItem value="incompatible">Несовместимо</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Год</label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-32 bg-input-background">
                    <SelectValue placeholder="Все" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Сортировка</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 bg-input-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="title">По названию</SelectItem>
                    <SelectItem value="year">По году</SelectItem>
                    <SelectItem value="fps">По FPS</SelectItem>
                    <SelectItem value="compatibility">По совместимости</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="border-muted/30 hover:border-primary hover:bg-primary/10"
              >
                <Filter className="h-4 w-4 mr-2" />
                Сбросить
              </Button>
            </div>
            
            {/* Active Filters */}
            {(searchQuery || selectedGenre !== "all" || selectedCompatibility !== "all" || selectedYear !== "all") && (
              <div className="flex flex-wrap gap-2 pt-2">
                {searchQuery && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Поиск: {searchQuery}
                  </Badge>
                )}
                {selectedGenre !== "all" && (
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    {selectedGenre}
                  </Badge>
                )}
                {selectedCompatibility !== "all" && (
                  <Badge variant="secondary" className={`bg-current/10 ${getCompatibilityColor(selectedCompatibility)}`}>
                    {getCompatibilityText(selectedCompatibility)}
                  </Badge>
                )}
                {selectedYear !== "all" && (
                  <Badge variant="secondary" className="bg-[#00ffff]/10 text-[#00ffff]">
                    {selectedYear}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Games Content */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 glass-morphism">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Все игры ({filteredGames.length})
          </TabsTrigger>
          <TabsTrigger value="popular" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Популярные
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Новинки
          </TabsTrigger>
          <TabsTrigger value="rtx" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Ray Tracing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <div key={game.id} className="transform hover:scale-105 transition-all duration-300">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          ) : (
            <Card className="glass-morphism border-border/50">
              <CardContent className="p-12 text-center">
                <Gamepad2 className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Игры не найдены</h3>
                <p className="text-muted-foreground mb-4">
                  Попробуйте изменить фильтры или поисковый запрос
                </p>
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="border-primary/30 hover:border-primary hover:bg-primary/10"
                >
                  Сбросить фильтры
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Популярные игры
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularGames.map((game) => (
                <div key={game.id} className="transform hover:scale-105 transition-all duration-300">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-accent to-[#00ffff] bg-clip-text text-transparent">
              Последние релизы
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentGames.map((game) => (
                <div key={game.id} className="transform hover:scale-105 transition-all duration-300">
                  <GameCard game={game} />
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rtx" className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#00ffff] to-primary bg-clip-text text-transparent">
              Игры с Ray Tracing
            </h3>
            {rayTracingGames.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rayTracingGames.map((game) => (
                  <div key={game.id} className="transform hover:scale-105 transition-all duration-300">
                    <GameCard game={game} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="glass-morphism border-border/50">
                <CardContent className="p-12 text-center">
                  <Zap className="h-16 w-16 text-[#00ffff] mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Игры с Ray Tracing</h3>
                  <p className="text-muted-foreground">
                    В базе пока нет игр с поддержкой трассировки лучей
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}