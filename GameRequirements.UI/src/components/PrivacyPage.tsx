import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function PrivacyPage() {
    return (
        <div className="min-h-[calc(100vh-56px)] flex justify-center px-6 py-10 relative">
            <div className="absolute inset-0 cyber-grid opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

            <Card className="w-full max-w-4xl glass-morphism border-primary/20 relative">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        Политика конфиденциальности
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                        Последнее обновление: 17 сентября 2025 г.
                    </p>
                </CardHeader>

                <CardContent className="space-y-8 text-sm leading-6 text-foreground/90">
                    {/* Содержание */}
                    <nav className="rounded-md border border-border/60 p-4 bg-background/60">
                        <p className="font-semibold mb-2">Содержание</p>
                        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 list-disc list-inside text-muted-foreground">
                            <li><a href="#who" className="text-primary hover:underline">Кто мы</a></li>
                            <li><a href="#data-we-collect" className="text-primary hover:underline">Какие данные мы собираем</a></li>
                            <li><a href="#how-we-use" className="text-primary hover:underline">Как мы используем данные</a></li>
                            <li><a href="#legal-basis" className="text-primary hover:underline">Правовые основания (GDPR)</a></li>
                            <li><a href="#cookies" className="text-primary hover:underline">Cookies и аналитика</a></li>
                            <li><a href="#sharing" className="text-primary hover:underline">Передача третьим лицам</a></li>
                            <li><a href="#retention" className="text-primary hover:underline">Срок хранения</a></li>
                            <li><a href="#security" className="text-primary hover:underline">Безопасность</a></li>
                            <li><a href="#rights" className="text-primary hover:underline">Права пользователей</a></li>
                            <li><a href="#intl" className="text-primary hover:underline">Международные передачи</a></li>
                            <li><a href="#kids" className="text-primary hover:underline">Дети</a></li>
                            <li><a href="#contact" className="text-primary hover:underline">Контакты</a></li>
                        </ul>
                    </nav>

                    <section id="who" className="space-y-2">
                        <h2 className="text-xl font-semibold">1. Кто мы</h2>
                        <p>
                            GameRequirements — web-сервис, который помогает оценить, запустится ли игра на
                            выбранной конфигурации (CPU, GPU, RAM и т.п.). Оператор данных: <strong>GameRequirements SRL</strong> (пример), юридический адрес — укажите ваш адрес. Контакт: <a className="text-primary hover:underline" href="mailto:support@gamerequirements.local">support@gamerequirements.local</a>.
                        </p>
                    </section>

                    <section id="data-we-collect" className="space-y-2">
                        <h2 className="text-xl font-semibold">2. Какие данные мы собираем</h2>
                        <ul className="list-disc list-inside">
                            <li><strong>Аккаунт:</strong> email, имя (если указано), хэш пароля (пароли в открытом виде не храним), ID пользователя.</li>
                            <li><strong>Технические логи:</strong> IP-адрес, user-agent, время запросов, коды ответов.</li>
                            <li><strong>Данные использования:</strong> выбранные CPU/GPU, результаты подборов, нажатия в интерфейсе.</li>
                            <li><strong>Cookies:</strong> cookie сессии/аутентификации, предпочтения интерфейса.</li>
                            <li><strong>Обратная связь:</strong> тексты обращений в поддержку.</li>
                        </ul>
                    </section>

                    <section id="how-we-use" className="space-y-2">
                        <h2 className="text-xl font-semibold">3. Как мы используем данные</h2>
                        <ul className="list-disc list-inside">
                            <li>создание и обслуживание аккаунта, аутентификация;</li>
                            <li>проказ результатов подбора игр под конфигурацию;</li>
                            <li>улучшение качества сервиса, диагностика ошибок;</li>
                            <li>правовая отчётность и безопасность (пресечение злоупотреблений, анти-фрод);</li>
                            <li>информационные сообщения по работе сервиса (без спама).</li>
                        </ul>
                    </section>

                    <section id="legal-basis" className="space-y-2">
                        <h2 className="text-xl font-semibold">4. Правовые основания (GDPR)</h2>
                        <ul className="list-disc list-inside">
                            <li><strong>Исполнение договора</strong> — регистрация, вход, предоставление функционала;</li>
                            <li><strong>Законный интерес</strong> — безопасность, аналитика использования;</li>
                            <li><strong>Согласие</strong> — для необязательных cookies/рассылок (если включите).</li>
                        </ul>
                    </section>

                    <section id="cookies" className="space-y-2">
                        <h2 className="text-xl font-semibold">5. Cookies и аналитика</h2>
                        <p>Мы используем строго необходимые cookies для сессии и, опционально, аналитику (например, Plausible/GA). Необязательные cookies включаются только с вашего согласия (баннер/настройки).</p>
                    </section>

                    <section id="sharing" className="space-y-2">
                        <h2 className="text-xl font-semibold">6. Передача третьим лицам</h2>
                        <p>Мы не продаём персональные данные. Передача возможна обработчикам (хостинг, CDN, почтовые сервисы) по договорам обработки данных и только в объёме, необходимом для работы сервиса.</p>
                    </section>

                    <section id="retention" className="space-y-2">
                        <h2 className="text-xl font-semibold">7. Срок хранения</h2>
                        <p>Данные аккаунта храним, пока аккаунт активен. Логи — обычно до 12 месяцев, если иное не требуется законом или для защиты прав.</p>
                    </section>

                    <section id="security" className="space-y-2">
                        <h2 className="text-xl font-semibold">8. Безопасность</h2>
                        <p>Мы применяем технические и организационные меры: шифрование каналов (HTTPS), хэширование паролей, ограничение доступа, мониторинг событий безопасности.</p>
                    </section>

                    <section id="rights" className="space-y-2">
                        <h2 className="text-xl font-semibold">9. Права пользователей</h2>
                        <ul className="list-disc list-inside">
                            <li>доступ к данным и копия;</li>
                            <li>исправление и удаление («право быть забытым»);</li>
                            <li>ограничение и возражение на обработку;</li>
                            <li>переносимость данных;</li>
                            <li>отзыв согласия (если основание — согласие).</li>
                        </ul>
                        <p>Чтобы воспользоваться правами, напишите на <a className="text-primary hover:underline" href="mailto:support@gamerequirements.local">support@gamerequirements.local</a>. Мы ответим в разумный срок.</p>
                    </section>

                    <section id="intl" className="space-y-2">
                        <h2 className="text-xl font-semibold">10. Международные передачи</h2>
                        <p>Если данные передаются за пределы вашей юрисдикции, мы обеспечиваем адекватные гарантии (стандартные договорные положения/аналогичные механизмы).</p>
                    </section>

                    <section id="kids" className="space-y-2">
                        <h2 className="text-xl font-semibold">11. Дети</h2>
                        <p>Сервис не предназначен для лиц младше 13 лет (или иного возраста в вашей юрисдикции). Мы сознательно не собираем данные детей.</p>
                    </section>

                    <section id="contact" className="space-y-2">
                        <h2 className="text-xl font-semibold">12. Контакты</h2>
                        <p>Вопросы по приватности: <a className="text-primary hover:underline" href="mailto:support@gamerequirements.local">support@gamerequirements.local</a>.</p>
                        <p className="text-xs text-muted-foreground mt-2">Этот документ — общий шаблон и не является юридической консультацией.</p>
                    </section>
                </CardContent>
            </Card>
        </div>
    );
}
