import { Button } from "./ui/button";
import { Monitor, Gamepad2, BarChart3, Info, User, Palette, UserCircle } from "lucide-react";

interface HeaderProps {
  onNavigate?: (page: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="border-b border-border glass-morphism sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onNavigate?.("home")}
              className="flex items-center gap-2 hover:opacity-80 transition-all duration-300 group"
            >
              <Gamepad2 className="h-8 w-8 text-primary group-hover:neon-glow transition-all duration-300" />
              <span className="text-xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                GameRequirements
              </span>
            </button>
            
            <nav className="hidden lg:flex items-center gap-6">
              <button 
                onClick={() => onNavigate?.("games")}
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10"
              >
                <Gamepad2 className="h-4 w-4" />
                Игры
              </button>
              <button 
                onClick={() => onNavigate?.("home")}
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10"
              >
                <Monitor className="h-4 w-4" />
                Подбор
              </button>
              <button 
                onClick={() => onNavigate?.("compare")}
                className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/10"
              >
                <BarChart3 className="h-4 w-4" />
                Сравнить
              </button>
              <button 
                onClick={() => onNavigate?.("profile")}
                className="text-muted-foreground hover:text-[#00ffff] transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#00ffff]/10"
              >
                <UserCircle className="h-4 w-4" />
                Профиль
              </button>
              <button 
                onClick={() => onNavigate?.("about")}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/20"
              >
                <Info className="h-4 w-4" />
                О проекте
              </button>
              <button 
                onClick={() => onNavigate?.("uikit")}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/20"
              >
                <Palette className="h-4 w-4" />
                UI-Kit
              </button>
            </nav>
          </div>
          
          <Button 
            onClick={() => onNavigate?.("login")}
            variant="outline" 
            className="flex items-center gap-2 border-primary/30 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-300"
          >
            <User className="h-4 w-4" />
            Войти
          </Button>
        </div>
      </div>
    </header>
  );
}