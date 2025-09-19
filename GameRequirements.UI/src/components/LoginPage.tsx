import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // Если пришли со страницы, защищённой RequireAuth — вернём туда, иначе /profile
    const from = (location.state as any)?.from?.pathname ?? "/profile";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login({ email, password });
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err?.message ?? "Не удалось войти");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 cyber-grid opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

            <form onSubmit={handleSubmit} className="w-full max-w-md relative">
                <Card className="w-full glass-morphism border-primary/20">
                    <CardHeader className="text-center space-y-4">
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            ВХОД В СИСТЕМУ
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Войдите в свой аккаунт для доступа ко всем функциям
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        {error && (
                            <div className="text-sm text-red-500 border border-red-500/30 rounded-md p-2">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10 bg-input-background border-border focus:border-primary transition-colors"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-foreground">
                                    Пароль
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
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
                                        onClick={() => setShowPassword((v) => !v)}
                                        title={showPassword ? "Скрыть пароль" : "Показать пароль"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-primary-foreground font-semibold neon-glow"
                                size="lg"
                                disabled={loading}
                            >
                                {loading ? "Входим..." : (
                                    <>
                                        Войти <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>

                            <div className="text-center space-y-2">
                                <Link to="/forgot-password">
                                    <Button
                                        type="button"
                                        variant="link"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Забыли пароль?
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">или</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-muted-foreground">
                                Нет аккаунта?{" "}
                                <Link to="/register">
                                    <Button
                                        type="button"
                                        variant="link"
                                        className="text-primary hover:text-primary/80 p-0 h-auto font-semibold"
                                    >
                                        Зарегистрируйтесь
                                    </Button>
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
