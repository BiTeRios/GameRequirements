import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function RegisterPage() {
    const navigate = useNavigate();
    const { register: registerUser } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPass1, setShowPass1] = useState(false);
    const [showPass2, setShowPass2] = useState(false);

    const [agree, setAgree] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!agree) {
            setError("Пожалуйста, подтвердите согласие с условиями.");
            return;
        }
        if (password.length < 6) {
            setError("Минимальная длина пароля — 6 символов.");
            return;
        }
        if (password !== confirm) {
            setError("Пароли не совпадают.");
            return;
        }

        setLoading(true);
        try {
            await registerUser({ email, password, name });
            // после успешной регистрации отправим на страницу логина
            navigate("/login", { replace: true });
        } catch (err: any) {
            setError(err?.message ?? "Ошибка регистрации");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative">
            {/* Background Effects — как на логине */}
            <div className="absolute inset-0 cyber-grid opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

            <form onSubmit={onSubmit} className="w-full max-w-md relative">
                <Card className="w-full glass-morphism border-primary/20">
                    <CardHeader className="text-center space-y-4">
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            РЕГИСТРАЦИЯ
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Создайте аккаунт, чтобы пользоваться всеми функциями
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {error && (
                            <div className="text-sm text-red-500 border border-red-500/30 rounded-md p-2">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Имя */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-foreground">
                                    Имя (необязательно)
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Как к вам обращаться"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="pl-10 bg-input-background border-border focus:border-primary transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-input-background border-border focus:border-primary transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Пароль */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-foreground">
                                    Пароль
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPass1 ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-10 bg-input-background border-border focus:border-primary transition-colors"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPass1((v) => !v)}
                                        title={showPass1 ? "Скрыть пароль" : "Показать пароль"}
                                    >
                                        {showPass1 ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Повтор пароля */}
                            <div className="space-y-2">
                                <Label htmlFor="confirm" className="text-foreground">
                                    Подтверждение пароля
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="confirm"
                                        type={showPass2 ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={confirm}
                                        onChange={(e) => setConfirm(e.target.value)}
                                        className="pl-10 pr-10 bg-input-background border-border focus:border-primary transition-colors"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPass2((v) => !v)}
                                        title={showPass2 ? "Скрыть пароль" : "Показать пароль"}
                                    >
                                        {showPass2 ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Согласие с условиями — аккуратное выравнивание */}
                            <div className="w-full flex items-start gap-3">
                                <input
                                    id="agree"
                                    type="checkbox"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                    className="mt-1 h-4 w-4 shrink-0 rounded border-border text-primary focus:ring-primary"
                                    required
                                />

                                <Label
                                    htmlFor="agree"
                                    // делаем метку блочной, нормальную межстрочку и нормальные переносы
                                    className="block text-sm leading-6 text-muted-foreground whitespace-normal break-words m-0"
                                >
                                    Я согласен с{" "}
                                    <Link to="/terms" className="text-primary hover:underline">
                                        Условиями сервиса
                                    </Link>{" "}
                                    и{" "}
                                    <Link to="/privacy" className="text-primary hover:underline">
                                        Политикой конфиденциальности
                                    </Link>
                                    .
                                </Label>
                            </div>

                        </div>

                        {/* Кнопка в стиле логина */}
                        <div className="space-y-4">
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground font-semibold neon-glow"
                                size="lg"
                                disabled={loading || !agree}
                            >
                                {loading ? "Создаём аккаунт..." : (
                                    <>
                                        Зарегистрироваться <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>

                            <div className="text-center">
                                <p className="text-muted-foreground">
                                    Уже есть аккаунт?{" "}
                                    <Link to="/login" className="text-primary hover:underline font-semibold">
                                        Войти
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
