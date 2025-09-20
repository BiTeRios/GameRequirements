import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
    return (
        <footer className="mt-12 border-t">
            <div className="container mx-auto px-4 py-6 max-w-6xl flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="text-sm text-gray-600">
                    © {new Date().getFullYear()} GameRequirements
                </div>
                <nav className="flex flex-wrap gap-4 text-sm">
                    <Link to="/games" className="hover:underline">Игры</Link>
                    <Link to="/compare" className="hover:underline">Сравнение</Link>
                    <Link to="/about" className="hover:underline">О проекте</Link>
                    <Link to="/privacy" className="hover:underline">Политика конфиденциальности</Link>
                    <Link to="/terms" className="hover:underline">Условия сервиса</Link>
                    {/* если нужен внешний линк: */}
                    {/* <a href="https://github.com/..." target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a> */}
                </nav>
            </div>
        </footer>
    );
}
