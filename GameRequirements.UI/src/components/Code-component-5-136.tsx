import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { 
  User, 
  Settings, 
  Monitor, 
  Gamepad2, 
  BarChart3, 
  Trophy, 
  Calendar,
  Edit,
  Save,
  X
} from "lucide-react";

interface ProfilePageProps {
  onNavigate?: (page: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: "CyberGamer2077",
    email: "cyber.gamer@example.com",
    firstName: "Алексей",
    lastName: "Киберпанк",
    bio: "Заядлый геймер, коллекционирую RTX карты и люблю киберпанк эстетику",
    joinDate: "2023-01-15",
    gamesChecked: 127,
    configurationsCompared: 34,
    favoriteGames: ["Cyberpunk 2077", "Valorant", "Fortnite"],
    currentConfig: {
      cpu: "AMD Ryzen 7 5800X",
      gpu: "NVIDIA RTX 3070",
      ram: "32GB DDR4"
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    // Здесь будет логика сохранения профиля
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="glass-morphism border-primary/20">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-primary/20">
                <AvatarImage src="/api/placeholder/96/96" />
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-2xl font-bold">
                  АК
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary hover:bg-primary/80 neon-glow"
              >
                <Edit className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {profile.username}
                  </h1>
                  <p className="text-muted-foreground">{profile.email}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="border-primary/30 hover:border-primary hover:bg-primary/10"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Редактировать
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        className="bg-primary hover:bg-primary/80 neon-glow"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Сохранить
                      </Button>
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-destructive/30 hover:border-destructive hover:bg-destructive/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Регистрация: {new Date(profile.joinDate).toLocaleDateString('ru-RU')}
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <Gamepad2 className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold text-primary">{profile.gamesChecked}</div>
                    <div className="text-xs text-muted-foreground">Игр проверено</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  <div>
                    <div className="font-semibold text-accent">{profile.configurationsCompared}</div>
                    <div className="text-xs text-muted-foreground">Конфигураций сравнено</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-[#00ffff]/10 border border-[#00ffff]/20">
                  <Trophy className="h-5 w-5 text-[#00ffff]" />
                  <div>
                    <div className="font-semibold text-[#00ffff]">Эксперт</div>
                    <div className="text-xs text-muted-foreground">Уровень пользователя</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 glass-morphism">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Личная информация
          </TabsTrigger>
          <TabsTrigger value="gaming" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Игровая конфигурация
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Настройки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card className="glass-morphism border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Персональная информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    disabled={!isEditing}
                    onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                    className="bg-input-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    disabled={!isEditing}
                    onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                    className="bg-input-background"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">О себе</Label>
                <textarea
                  id="bio"
                  value={profile.bio}
                  disabled={!isEditing}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full p-3 rounded-md bg-input-background border border-border focus:border-primary transition-colors resize-none"
                  rows={3}
                />
              </div>
              
              <div>
                <Label>Любимые игры</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {profile.favoriteGames.map((game, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {game}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaming" className="space-y-6">
          <Card className="glass-morphism border-accent/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                Текущая конфигурация
              </CardTitle>
              <CardDescription>
                Ваша основная игровая конфигурация для тестирования совместимости
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div>
                    <div className="font-semibold text-foreground">Процессор</div>
                    <div className="text-muted-foreground">{profile.currentConfig.cpu}</div>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">Отлично</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-accent/5 border border-accent/20">
                  <div>
                    <div className="font-semibold text-foreground">Видеокарта</div>
                    <div className="text-muted-foreground">{profile.currentConfig.gpu}</div>
                  </div>
                  <Badge className="bg-accent/10 text-accent border-accent/20">Отлично</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-[#00ffff]/5 border border-[#00ffff]/20">
                  <div>
                    <div className="font-semibold text-foreground">Оперативная память</div>
                    <div className="text-muted-foreground">{profile.currentConfig.ram}</div>
                  </div>
                  <Badge className="bg-[#00ffff]/10 text-[#00ffff] border-[#00ffff]/20">Отлично</Badge>
                </div>
              </div>
              
              <Separator />
              
              <Button
                onClick={() => onNavigate?.("home")}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 neon-glow"
              >
                Обновить конфигурацию
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="glass-morphism border-muted/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Настройки аккаунта
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Email уведомления</div>
                    <div className="text-sm text-muted-foreground">Получать уведомления о новых играх</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Включено
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">Публичный профиль</div>
                    <div className="text-sm text-muted-foreground">Показывать профиль другим пользователям</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Включено
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="font-semibold text-destructive">Опасная зона</div>
                  <Button variant="destructive" className="w-full">
                    Удалить аккаунт
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}