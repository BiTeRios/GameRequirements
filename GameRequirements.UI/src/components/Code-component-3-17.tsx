import { Gamepad2, Github, Twitter, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white/50 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">GameRequirements</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Проверьте совместимость вашего ПК с любимыми играми
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4>Игры</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Популярные игры</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Новые релизы</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">По жанрам</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4>Инструменты</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Проверка совместимости</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Сравнение железа</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Рекомендации</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4>Поддержка</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Связаться с нами</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Обратная связь</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 mt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 GameRequirements. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}