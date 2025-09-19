import * as React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "../context/AuthContext";

export function Header() {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const linkCls = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded-md text-sm font-medium ${isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
        }`;

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
            <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
                {/* Лого */}
                <div className="flex items-center gap-6">
                    <Link to="/" className="font-bold text-lg">
                        GameRequirements
                    </Link>

                    {/* Навигация */}
                    <nav className="hidden md:flex items-center gap-1">
                        <NavLink to="/" className={linkCls} end>
                            Главная
                        </NavLink>
                        <NavLink to="/games" className={linkCls}>
                            Игры
                        </NavLink>
                        <NavLink to="/compare" className={linkCls}>
                            Сравнить
                        </NavLink>
                        <NavLink to="/about" className={linkCls}>
                            О проекте
                        </NavLink>
                        <NavLink to="/uikit" className={linkCls}>
                            UI Kit
                        </NavLink>
                    </nav>
                </div>

                {/* Правый блок */}
                <div className="flex items-center gap-3">
                    {isAuthenticated ? (
                        <>
                            <span className="text-sm text-foreground/70 hidden sm:inline">
                                {user?.name || user?.email}
                            </span>
                            <NavLink to="/profile">
                                <Button variant="secondary">Профиль</Button>
                            </NavLink>
                            <Button
                                onClick={() => {
                                    logout();
                                    navigate("/login");
                                }}
                            >
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login">
                                <Button>Войти</Button>
                            </NavLink>
                            <NavLink to="/register">
                                <Button variant="secondary">Регистрация</Button>
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
