import { Button } from "./ui/button";
import { Monitor, Gamepad2, BarChart3, Info, User } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold">GameRequirements</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a href="#games" className="text-secondary hover:text-foreground transition-colors flex items-center gap-2">
                <Gamepad2 className="h-4 w-4" />
                Игры
              </a>
              <a href="#check" className="text-secondary hover:text-foreground transition-colors flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Подбор по железу
              </a>
              <a href="#compare" className="text-secondary hover:text-foreground transition-colors flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Сравнить
              </a>
              <a href="#about" className="text-secondary hover:text-foreground transition-colors flex items-center gap-2">
                <Info className="h-4 w-4" />
                О проекте
              </a>
            </nav>
          </div>
          
          <Button variant="outline" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Войти
          </Button>
        </div>
      </div>
    </header>
  );
}