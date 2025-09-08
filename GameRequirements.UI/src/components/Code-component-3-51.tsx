import { useState } from "react";
import { HardwareSelector } from "./HardwareSelector";
import { GameCard } from "./GameCard";
import { gamesData } from "../data/games";
import { Monitor, Search, BarChart3 } from "lucide-react";

interface HomePageProps {
  onCheckCompatibility?: (cpu: string, gpu: string, ram: string, integratedGraphics: boolean) => void;
}

export function HomePage({ onCheckCompatibility }: HomePageProps) {
  const popularGames = gamesData.slice(0, 3);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Потянет ли мой ПК?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Выбери CPU и GPU — получи список игр с оценкой FPS и индикаторами совместимости
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <HardwareSelector onCheck={onCheckCompatibility} />
        </div>
      </section>

      {/* How it works */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Как это работает</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Простой процесс в три шага для получения точных рекомендаций
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Monitor className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">1. Выберите железо</h3>
            <p className="text-muted-foreground">
              Укажите процессор, видеокарту и объем RAM вашего компьютера
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">2. Получите анализ</h3>
            <p className="text-muted-foreground">
              Система проанализирует ваше железо и покажет совместимость с играми
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">3. Изучите результаты</h3>
            <p className="text-muted-foreground">
              Просмотрите FPS, системные требования и рекомендации по апгрейду
            </p>
          </div>
        </div>
      </section>

      {/* Popular Games Preview */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Популярные игры</h2>
            <p className="text-muted-foreground">
              Проверьте совместимость с самыми популярными играми
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
}