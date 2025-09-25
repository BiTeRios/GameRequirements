import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export function NotFoundPage() {
    return (
        <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-6">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">404</h1>
                <p className="text-muted-foreground">Страница не найдена</p>
                <Link to="/"><Button>На главную</Button></Link>
            </div>
        </div>
    );
}
