import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Cpu, Monitor, BarChart3, Shield, Zap, HelpCircle, Mail, Github } from "lucide-react";

export function AboutPage() {
  const faqItems = [
    {
      question: "Как работает анализ совместимости?",
      answer: "Мы сравниваем характеристики вашего железа с минимальными и рекомендованными требованиями игр, учитывая реальные тесты производительности и бенчмарки."
    },
    {
      question: "Насколько точны прогнозы FPS?",
      answer: "Прогнозы основаны на средних показателях из множества тестов. Реальный FPS может отличаться в зависимости от настроек игры, драйверов и других факторов."
    },
    {
      question: "Как часто обновляется база данных игр?",
      answer: "База игр обновляется еженедельно. Мы добавляем новые релизы и актуализируем системные требования."
    },
    {
      question: "Можно ли добавить свою игру в базу?",
      answer: "Да, мы принимаем предложения по добавлению игр. Свяжитесь с нами через форму обратной связи."
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">О проекте GameRequirements</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Помогаем геймерам принимать обоснованные решения о совместимости их ПК с современными играми
        </p>
      </div>

      {/* Mission */}
      <section>
        <Card>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Наша миссия</h2>
                <p className="text-muted-foreground">
                  Мы создали GameRequirements, чтобы избавить геймеров от неопределенности при покупке новых игр. 
                  Наш сервис позволяет быстро понять, потянет ли ваш ПК конкретную игру и с какой производительностью.
                </p>
                <p className="text-muted-foreground">
                  Больше никаких разочарований от низкого FPS или невозможности запустить игру. 
                  Планируйте апгрейды осознанно и наслаждайтесь играми на полную.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Игр в базе</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary">1000+</div>
                  <div className="text-sm text-muted-foreground">Конфигураций ПК</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Точность прогнозов</div>
                </div>
                <div className="text-center p-4 bg-primary/5 rounded-lg">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Доступность</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How it works */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Методика расчета</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Наш алгоритм учитывает множество факторов для максимально точного прогноза
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                Анализ железа
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Сравниваем характеристики вашего CPU и GPU с требованиями игр, 
                учитывая архитектуру, частоты и количество ядер.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                Бенчмарки
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Используем данные реальных тестов производительности из авторитетных источников 
                для точного прогноза FPS.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Monitor className="h-6 w-6 text-primary" />
                </div>
                Оптимизация
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Учитываем особенности оптимизации каждой игры и предлагаем 
                настройки для достижения оптимального баланса качества и производительности.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Disclaimer */}
      <section>
        <Card className="border-warning/20 bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <Shield className="h-5 w-5" />
              Важное уведомление
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              <strong>Дисклеймер:</strong> Все прогнозы производительности являются приблизительными и основаны на усредненных данных. 
              Реальная производительность может отличаться в зависимости от:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
              <li>Версии драйверов видеокарты</li>
              <li>Настроек операционной системы</li>
              <li>Температурного режима компонентов</li>
              <li>Фоновых процессов и программ</li>
              <li>Особенностей конкретной модели железа</li>
            </ul>
            <p className="text-muted-foreground">
              Мы не несем ответственности за неточность прогнозов. Сервис предназначен для ориентировочной оценки совместимости.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Часто задаваемые вопросы</h2>
        </div>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  {item.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Связаться с нами</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">support@gamerequirements.ru</p>
                  <Button variant="outline" className="mt-2">
                    Написать письмо
                  </Button>
                </div>
              </div>
              
              <div className="text-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <Github className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">GitHub</h3>
                  <p className="text-muted-foreground">Открытый исходный код</p>
                  <Button variant="outline" className="mt-2">
                    Посмотреть код
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}