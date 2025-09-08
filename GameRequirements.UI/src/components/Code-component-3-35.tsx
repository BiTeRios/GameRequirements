import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { CompatibilityBadge, CompatibilityStatus } from "./CompatibilityBadge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Cpu, HardDrive, Monitor, MemoryStick, Gamepad2 } from "lucide-react";

export interface GameData {
  id: string;
  title: string;
  genre: string;
  year: number;
  imageUrl: string;
  compatibility: CompatibilityStatus;
  fps: {
    low: number;
    medium: number;
    high: number;
    ultra: number;
  };
  requirements: {
    min: {
      cpu: string;
      gpu: string;
      ram: string;
      storage: string;
      directx: string;
    };
    recommended: {
      cpu: string;
      gpu: string;
      ram: string;
      storage: string;
      directx: string;
    };
  };
  isMultiplayer: boolean;
  hasRayTracing: boolean;
}

interface GameCardProps {
  game: GameData;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function GameCard({ game, size = "md", onClick }: GameCardProps) {
  const sizeClasses = {
    sm: "w-64",
    md: "w-80", 
    lg: "w-96",
  };
  
  const imageSizes = {
    sm: "h-32",
    md: "h-40",
    lg: "h-48",
  };

  return (
    <Card 
      className={`${sizeClasses[size]} hover:shadow-lg transition-all duration-200 cursor-pointer bg-card border-border`}
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className={`${imageSizes[size]} bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden relative`}>
          <ImageWithFallback
            src={game.imageUrl}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <CompatibilityBadge status={game.compatibility} size="sm" />
          </div>
          {game.hasRayTracing && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="text-xs">RT</Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-foreground mb-1">{game.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{game.genre}</span>
            <span>•</span>
            <span>{game.year}</span>
            {game.isMultiplayer && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Gamepad2 className="h-3 w-3" />
                  Мультиплеер
                </span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            <Monitor className="h-3 w-3 mr-1" />
            {game.fps.medium} FPS (1080p)
          </Badge>
          <Badge variant="outline" className="text-xs">
            <Monitor className="h-3 w-3 mr-1" />
            {game.fps.high} FPS (1440p)
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Cpu className="h-3 w-3" />
            <span className="truncate">{game.requirements.min.cpu}</span>
          </div>
          <div className="flex items-center gap-1">
            <MemoryStick className="h-3 w-3" />
            <span>{game.requirements.min.ram}</span>
          </div>
          <div className="flex items-center gap-1 col-span-2">
            <HardDrive className="h-3 w-3" />
            <span className="truncate">{game.requirements.min.gpu}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}