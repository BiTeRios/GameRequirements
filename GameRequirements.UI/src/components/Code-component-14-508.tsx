import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CompatibilityBadge } from "./CompatibilityBadge";
import { ProgressRing } from "./ProgressRing";
import { GameCard } from "./GameCard";
import { gamesData } from "../data/games";
import { Loader2, AlertCircle, CheckCircle, Search, Cpu, Monitor } from "lucide-react";

export function UIKitPage() {
  const sampleGame = gamesData[0];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">UI-Kit</h1>
        <p className="text-muted-foreground">
          Библиотека компонентов GameRequirements
        </p>
      </div>

      {/* Typography */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Типографика</h2>
        <div className="space-y-4">
          <div>
            <h1>Заголовок H1</h1>
            <p className="text-muted-foreground text-sm">font-size: 2xl, font-weight: medium</p>
          </div>
          <div>
            <h2>Заголовок H2</h2>
            <p className="text-muted-foreground text-sm">font-size: xl, font-weight: medium</p>
          </div>
          <div>
            <h3>Заголовок H3</h3>
            <p className="text-muted-foreground text-sm">font-size: lg, font-weight: medium</p>
          </div>
          <div>
            <p>Основной текст (Body)</p>
            <p className="text-muted-foreground text-sm">font-size: base, font-weight: normal</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Подпись (Caption)</p>
            <p className="text-muted-foreground text-sm">font-size: sm, color: muted-foreground</p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Кнопки</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Primary</h3>
            <div className="space-y-2">
              <Button>Проверить совместимость</Button>
              <Button size="sm">Маленькая</Button>
              <Button size="lg">Большая</Button>
              <Button disabled>Отключенная</Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Secondary</h3>
            <div className="space-y-2">
              <Button variant="outline">Автоопределение</Button>
              <Button variant="outline" size="sm">Маленькая</Button>
              <Button variant="outline" size="lg">Большая</Button>
              <Button variant="outline" disabled>Отключенная</Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Tertiary</h3>
            <div className="space-y-2">
              <Button variant="ghost">Подробнее</Button>
              <Button variant="ghost" size="sm">Маленькая</Button>
              <Button variant="ghost" size="lg">Большая</Button>
              <Button variant="ghost" disabled>Отключенная</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Form Controls */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Элементы форм</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Поле ввода</label>
              <Input placeholder="Поиск игр..." />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Поле с иконкой</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Поиск игр..." className="pl-10" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Select</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите процессор" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="i5-12400">Intel Core i5-12400</SelectItem>
                  <SelectItem value="ryzen-5-5600">AMD Ryzen 5 5600</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Checkbox</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="integrated" />
                  <label htmlFor="integrated" className="text-sm">Встроенная графика</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="multiplayer" checked />
                  <label htmlFor="multiplayer" className="text-sm">Мультиплеер</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="raytracing" disabled />
                  <label htmlFor="raytracing" className="text-sm">Ray Tracing (отключено)</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Badges & Tags */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Бейджи и теги</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Статусы совместимости</h3>
            <div className="flex flex-wrap gap-4">
              <CompatibilityBadge status="compatible" size="sm" />
              <CompatibilityBadge status="compatible" size="md" />
              <CompatibilityBadge status="compatible" size="lg" />
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
              <CompatibilityBadge status="borderline" size="sm" />
              <CompatibilityBadge status="borderline" size="md" />
              <CompatibilityBadge status="borderline" size="lg" />
            </div>
            <div className="flex flex-wrap gap-4 mt-2">
              <CompatibilityBadge status="incompatible" size="sm" />
              <CompatibilityBadge status="incompatible" size="md" />
              <CompatibilityBadge status="incompatible" size="lg" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Обычные бейджи</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge className="bg-warning text-warning-foreground">Warning</Badge>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Теги с иконками</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Cpu className="h-3 w-3" />
                i5-12400
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Monitor className="h-3 w-3" />
                RTX 3060
              </Badge>
              <Badge variant="outline">DirectX 12</Badge>
              <Badge variant="outline">Ray Tracing</Badge>
              <Badge variant="outline">Мультиплеер</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Progress & Loading */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Прогресс и индикаторы</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center space-y-4">
            <h3 className="font-semibold">Совместимо</h3>
            <ProgressRing percentage={85} status="compatible" />
          </div>
          <div className="text-center space-y-4">
            <h3 className="font-semibold">На грани</h3>
            <ProgressRing percentage={65} status="borderline" />
          </div>
          <div className="text-center space-y-4">
            <h3 className="font-semibold">Требуется апгрейд</h3>
            <ProgressRing percentage={35} status="incompatible" />
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Карточки</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Карточки игр</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GameCard game={sampleGame} size="sm" />
              <GameCard game={sampleGame} size="md" />
              <GameCard game={sampleGame} size="lg" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Обычные карточки</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Системные требования</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Минимальные и рекомендованные требования для игры
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-primary" />
                    Производительность
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ожидаемый FPS в различных разрешениях
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* States */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Состояния</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                Загрузка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Анализируем ваше железо...</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Ошибка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Не удалось получить данные</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Успех
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Анализ завершен успешно</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Empty State */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Пустое состояние</h2>
        <Card>
          <CardContent className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Игры не найдены</h3>
            <p className="text-muted-foreground mb-4">
              Попробуйте изменить фильтры или поисковый запрос
            </p>
            <Button variant="outline">Сбросить фильтры</Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}