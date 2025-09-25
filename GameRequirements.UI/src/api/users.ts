export type UserPublic = { email: string }; // остальное не нужно

export async function getMe(fetchWithAuth: any): Promise<UserPublic> {
    const res = await fetchWithAuth("/api/users/me");
    if (!res.ok) {
        let msg = `Ошибка ${res.status}`;
        try { const d = await res.json(); if (d?.message) msg = d.message; } catch { }
        throw new Error(msg);
    }
    return await res.json();
}
