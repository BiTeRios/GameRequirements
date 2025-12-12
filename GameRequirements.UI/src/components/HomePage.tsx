import { useState } from "react";
import { HardwareSelector } from "./HardwareSelector";
import { GameCard } from "./GameCard";
import { gamesData } from "../data/games";
import { Monitor, Search, BarChart3, Zap, Cpu, HardDrive } from "lucide-react";

interface HomePageProps {
  onCheckCompatibility?: (cpu: string, gpu: string, ram: string, integratedGraphics: boolean) => void;
}

export function HomePage({ onCheckCompatibility }: HomePageProps) {
  const popularGames = gamesData.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section with Background */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBncmFwaGljcyUyMGNhcmQlMjBnbG93aW5nJTIwbmVvbnxlbnwxfHx8fDE3NTczMjYwMjV8MA&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(2px)'
          }}
        />
        
        {/* Cyber Grid Overlay */}
        <div className="absolute inset-0 z-10 cyber-grid opacity-20" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-background/70 via-background/50 to-background/90" />
        
        {/* Content */}
        <div className="relative z-30 space-y-8 px-6 max-w-6xl">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-[#00ffff] to-accent bg-clip-text text-transparent neon-text">
              ПОТЯНЕТ ЛИ МОЙ ПК?
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Выбери CPU и GPU — получи список игр с оценкой FPS и индикаторами совместимости
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto glass-morphism rounded-2xl p-8">
            <HardwareSelector onCheck={onCheckCompatibility} />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="glass-morphism rounded-xl p-6 text-center border border-primary/20">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 neon-glow">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">1000+</div>
              <div className="text-muted-foreground">Игр в базе</div>
            </div>
            <div className="glass-morphism rounded-xl p-6 text-center border border-accent/20">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 neon-glow">
                <Cpu className="h-6 w-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent">500+</div>
              <div className="text-muted-foreground">Видеокарт</div>
            </div>
            <div className="glass-morphism rounded-xl p-6 text-center border border-[#00ffff]/20">
              <div className="w-12 h-12 bg-[#00ffff]/20 rounded-full flex items-center justify-center mx-auto mb-4 neon-glow">
                <HardDrive className="h-6 w-6 text-[#00ffff]" />
              </div>
              <div className="text-2xl font-bold text-[#00ffff]">300+</div>
              <div className="text-muted-foreground">Процессоров</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            КАК ЭТО РАБОТАЕТ
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Простой процесс в три шага для получения точных рекомендаций в стиле будущего
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="glass-morphism rounded-2xl p-8 text-center space-y-6 border border-primary/20 hover:border-primary/50 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center mx-auto neon-glow">
              <Monitor className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-3">
              <div className="text-primary font-bold text-lg">STEP 01</div>
              <h3 className="text-xl font-bold text-foreground">Выберите железо</h3>
              <p className="text-muted-foreground leading-relaxed">
                Укажите процессор, видеокарту и объем RAM вашего компьютера для анализа
              </p>
            </div>
          </div>
          
          <div className="glass-morphism rounded-2xl p-8 text-center space-y-6 border border-accent/20 hover:border-accent/50 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full flex items-center justify-center mx-auto neon-glow">
              <Search className="h-10 w-10 text-accent" />
            </div>
            <div className="space-y-3">
              <div className="text-accent font-bold text-lg">STEP 02</div>
              <h3 className="text-xl font-bold text-foreground">Получите анализ</h3>
              <p className="text-muted-foreground leading-relaxed">
                Система проанализирует ваше железо и покажет совместимость с играми
              </p>
            </div>
          </div>
          
          <div className="glass-morphism rounded-2xl p-8 text-center space-y-6 border border-[#00ffff]/20 hover:border-[#00ffff]/50 transition-all duration-300">
            <div className="w-20 h-20 bg-gradient-to-br from-[#00ffff]/20 to-[#00ffff]/5 rounded-full flex items-center justify-center mx-auto neon-glow">
              <BarChart3 className="h-10 w-10 text-[#00ffff]" />
            </div>
            <div className="space-y-3">
              <div className="text-[#00ffff] font-bold text-lg">STEP 03</div>
              <h3 className="text-xl font-bold text-foreground">Изучите результаты</h3>
              <p className="text-muted-foreground leading-relaxed">
                Просмотрите FPS, системные требования и рекомендации по апгрейду
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Games Preview */}
      <section className="py-16 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-[#00ffff] bg-clip-text text-transparent">
            ПОПУЛЯРНЫЕ ИГРЫ
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Проверьте совместимость с самыми популярными играми в нашей базе данных
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {popularGames.map((game) => (
            <div key={game.id} className="transform hover:scale-105 transition-all duration-300">
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}