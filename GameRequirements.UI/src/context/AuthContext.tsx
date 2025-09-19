import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

type User = {
    email: string;
    id?: string;
};

type LogInPayload = { email: string; password: string };
type SignUpPayload = { email: string; password: string };

type AuthContextValue = {
    user: User | null;
    isAuthenticated: boolean;
    accessToken: string | null;
    login: (payload: LogInPayload) => Promise<void>;
    register: (payload: SignUpPayload) => Promise<void>;
    logout: () => void;
    fetchWithAuth: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// ——— API endpoints ———
// На бэке у тебя методы: SignUp → маршрут обычно /api/auth/signin, LogIn → /api/auth/login, Refresh → /api/auth/refresh
const API = {
    login: "/api/auth/login",
    register: "/api/auth/register",
    refresh: "/api/auth/refresh",
};

// ——— localStorage ключи ———
const LS_ACCESS = "gr_access_token";
const LS_REFRESH = "gr_refresh_token";

// ——— утилита: безопасно читаем JSON-ошибку из API ———
async function readErrorMessage(res: Response) {
    let msg = `Ошибка ${res.status}`;
    try {
        const data = await res.json();
        if (data?.message) msg = data.message;
        // При желании — кастомизация по errorCode
        // if (data?.errorCode === "email_taken") msg = "Этот email уже занят";
        return msg;
    } catch {
        return msg;
    }
}

// ——— утилита: обёртка проверки res.ok с броском Error ———
async function ensureOk(res: Response) {
    if (!res.ok) {
        const msg = await readErrorMessage(res);
        throw new Error(msg);
    }
    return res;
}

// ——— утилита: дешифруем JWT без верификации (для вытаскивания email/id) ———
function decodeJwt(token: string | null): { sub?: string; email?: string } | null {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    try {
        const json = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
        return { sub: json?.sub, email: json?.email };
    } catch {
        return null;
    }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem(LS_ACCESS));
    const [refreshToken, setRefreshToken] = useState<string | null>(() => localStorage.getItem(LS_REFRESH));
    const [user, setUser] = useState<User | null>(() => {
        const info = decodeJwt(localStorage.getItem(LS_ACCESS));
        if (info?.email) return { email: info.email, id: info.sub };
        return null;
    });

    const isAuthenticated = !!accessToken && !!user;

    // ——— helpers для сохранения/сброса токенов ———
    const applyTokens = useCallback((access: string, refresh: string) => {
        setAccessToken(access);
        setRefreshToken(refresh);
        localStorage.setItem(LS_ACCESS, access);
        localStorage.setItem(LS_REFRESH, refresh);

        const info = decodeJwt(access);
        if (info?.email) setUser({ email: info.email, id: info.sub });
    }, []);

    const clearTokens = useCallback(() => {
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        localStorage.removeItem(LS_ACCESS);
        localStorage.removeItem(LS_REFRESH);
    }, []);

    // ——— login ———
    const login = useCallback(async (payload: LogInPayload) => {
        const res = await fetch(API.login, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            credentials: "include",
        });
        await ensureOk(res);
        const data: { accessToken: string; refreshToken: string } = await res.json();
        applyTokens(data.accessToken, data.refreshToken);

        // если по каким-то причинам email не в JWT — возьмём из формы
        if (!decodeJwt(data.accessToken)?.email) {
            setUser({ email: payload.email });
        }
    }, [applyTokens]);

    // ——— register ———
    const register = useCallback(async (payload: SignUpPayload) => {
        const res = await fetch(API.register, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            credentials: "include",
        });
        await ensureOk(res);
        const data: { accessToken: string; refreshToken: string } = await res.json();
        applyTokens(data.accessToken, data.refreshToken);

        if (!decodeJwt(data.accessToken)?.email) {
            setUser({ email: payload.email });
        }
    }, [applyTokens]);

    // ——— logout ———
    const logout = useCallback(() => {
        // Бэкенд у тебя logout не обязателен; достаточно локально очистить токены.
        clearTokens();
    }, [clearTokens]);

    // ——— refresh ———
    const doRefresh = useCallback(async (): Promise<boolean> => {
        if (!accessToken || !refreshToken) return false;

        const res = await fetch(API.refresh, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accessToken, refreshToken }),
            credentials: "include",
        });

        if (!res.ok) {
            // Рефреш не удался — очищаем авторизацию
            clearTokens();
            return false;
        }

        try {
            const data: { accessToken: string; refreshToken: string } = await res.json();
            applyTokens(data.accessToken, data.refreshToken);
            return true;
        } catch {
            clearTokens();
            return false;
        }
    }, [accessToken, refreshToken, applyTokens, clearTokens]);

    // ——— защищённый fetch: добавляет Authorization и делает один рефреш на 401 ———
    const fetchWithAuth = useCallback(async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
        const makeReq = (token?: string) => {
            const headers = new Headers(init?.headers || {});
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return fetch(input, { ...init, headers, credentials: "include" });
        };

        // 1-й запрос
        const res1 = await makeReq(accessToken || undefined);
        if (res1.status !== 401) return res1;

        // Пытаемся обновить токены один раз
        const refreshed = await doRefresh();
        if (!refreshed) return res1; // вернём 401 — пусть вызывающий обработает

        // Повторный запрос с новым access
        return makeReq(localStorage.getItem(LS_ACCESS) || undefined);
    }, [accessToken, doRefresh]);

    // ——— при первой загрузке: если есть токен, попробуем просто восстановить user из JWT ———
    useEffect(() => {
        if (!accessToken) return;
        const info = decodeJwt(accessToken);
        if (info?.email && !user) setUser({ email: info.email, id: info.sub });
    }, [accessToken, user]);

    const value = useMemo<AuthContextValue>(() => ({
        user,
        isAuthenticated,
        accessToken,
        login,
        register,
        logout,
        fetchWithAuth,
    }), [user, isAuthenticated, accessToken, login, register, logout, fetchWithAuth]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};
