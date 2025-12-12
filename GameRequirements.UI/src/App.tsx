import * as React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { HomePage } from "./components/HomePage";
import { ResultsPage } from "./components/ResultsPage";
import { ComparePage } from "./components/ComparePage";
import { AboutPage } from "./components/AboutPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
import {ProfilePage} from "./components/ProfilePage";
import { GamesPage } from "./components/GamesPage";
import { TermsPage } from "./components/TermsPage";
import { PrivacyPage } from "./components/PrivacyPage";
import { RequireAuth } from "./routes/RequireAuth";
import { NotFoundPage } from "./routes/NotFoundPage";
import { PredictionsPage } from "./components/PredictionsPage";
function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                {/* Публичные страницы */}
                <Route index element={<HomePage />} />
                <Route path="/results" element={<PredictionsPage />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/compare" element={<ComparePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />

                {/* Аутентификация */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                {/* Закрытые роуты */}
                <Route
                    path="/profile"
                    element={
                        <RequireAuth>
                            <ProfilePage />
                        </RequireAuth>
                    }
                />

                {/* Редиректы/404 */}
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
