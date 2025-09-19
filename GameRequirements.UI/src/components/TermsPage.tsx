import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function TermsPage() {
    return (
        <div className="min-h-[calc(100vh-56px)] flex justify-center px-6 py-10 relative">
            <div className="absolute inset-0 cyber-grid opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

            <Card className="w-full max-w-4xl glass-morphism border-primary/20 relative">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Условия сервиса
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                        Последнее обновление: 17 сентября 2025 г.
                    </p>
                </CardHeader>

                <CardContent className="space-y-8 text-sm leading-6 text-foreground/90">
                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold">1. Принятие условий</h2>
                        <p>
                            Используя GameRequirements (далее — «Сервис»), вы соглашаетесь с настоящими условиями. Если вы не согласны — не используйте Сервис.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold">2. Описание Сервиса</h2>
                        <p>
                            Сервис позволяет сравнивать характеристики ПК (CPU, GPU, RAM и др.) с ориентировочными требованиями видеоигр и получать список игр, которые, вероятно, запустятся. Результаты носят информационный, оценочный характер и не являются гарантией производительности.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold">3. Аккаунт и безопасность</h2>
                        <ul className="list-disc list-inside">
                            <li>Вы отвечаете за сохранность учётных данных.</li>
                            <li>Запрещено передавать аккаунт третьим лицам без разрешения.</li>
                            <li>Мы можем приостановить/удалить аккаунт при нарушении условий.</li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold">4. Допустимое использование</h2>
                        <ul className="list-disc list-inside">
                            <li>Нельзя пытаться взломать, обойти ограничения или вмешиваться в работу Сервиса.</li>
                            <li>Запрещён автоматизированный сбор данных без согласования (скрейпинг, массовые запросы).</li>
                            <li>Нельзя публиковать незаконный контент, нарушающий права третьих лиц.</li>
                        </ul>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold">5. Интеллектуальная собственность</h2>
                        <p>
                            Сервис, его дизайн, база данных сопоставлений и программный код принадлежат GameRequirements SRL (пример) или используются на праве лицензии. Бренды и названия игр принадлежат соответствующим правообладателям.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold">6. Отказ от гарантий</h2>
                        <p>
                            Сервис предоставляется «как есть». Мы не обещаем точности, бесперебойности или соответствия вашим ожиданиям. Производительность игр зависит от множества факторов (драйверы, настройки, температура, фоновые процессы и т.п.).
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold">7. Ограничение ответственности</h2>
                        <p>
                            В пределах, допустимых законом, мы не несем ответственности за косвенные, случайные, штрафные или сопутствующие убытки, а также за потерю данных, прибыли или репутации, возникшие в связи с использованием Сервиса.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold">8. Изменения Сервиса и условий</h2>
                        <p>
                            Мы можем обновлять функциональность и условия. Существенные изменения публикуем на этой странице. Продолжая пользоваться Сервисом, вы принимаете обновлённые условия.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold">9. Прекращение использования</h2>
                        <p>
                            Вы можете удалить аккаунт, обратившись в поддержку. Мы можем прекратить доступ при нарушении условий либо по требованиям закона.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold">10. Применимое право</h2>
                        <p>
                            Укажите вашу применимую юрисдикцию/право (например, Республика Молдова или иная).
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold">11. Контакты</h2>
                        <p>
                            Вопросы по условиям: <a className="text-primary hover:underline" href="mailto:support@gamerequirements.local">support@gamerequirements.local</a>.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">Этот документ — общий шаблон и не является юридической консультацией.</p>
                    </section>
                </CardContent>
            </Card>
        </div>
    );
}
