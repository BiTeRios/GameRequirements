// Базовый fetch с общим обработчиком ошибок
export async function http<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const res = await fetch(input, {
        credentials: "include",
        headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
        ...init,
    });

    if (!res.ok) {
        let msg = `Ошибка ${res.status}`;
        try {
            const data = await res.json();
            if (data?.message) msg = data.message;
            if (data?.errors && Array.isArray(data.errors)) msg = data.errors.join(", ");
        } catch { }
        throw new Error(msg);
    }
    // 204/201 без тела
    if (res.status === 204) return undefined as T;
    try { return (await res.json()) as T; } catch { return undefined as T; }
}
