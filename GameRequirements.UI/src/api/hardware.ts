export type ComboItem = { id: number; name: string };

async function fetchJson<T>(url: string, signal?: AbortSignal): Promise<T> {
    const res = await fetch(url, { signal });
    if (!res.ok) {
        let msg = `Ошибка ${res.status}`;
        try { const d = await res.json(); if (d?.message) msg = d.message; } catch { }
        throw new Error(msg);
    }
    return res.json();
}

export function findCpus(q: string, take = 15, signal?: AbortSignal) {
    // GET /api/hardware/cpus?q=...
    const url = `/api/hardware/cpus?q=${encodeURIComponent(q)}&take=${take}`;
    return fetchJson<ComboItem[]>(url, signal);
}

export function findGpus(q: string, take = 15, signal?: AbortSignal) {
    // GET /api/hardware/gpus?q=...
    const url = `/api/hardware/gpus?q=${encodeURIComponent(q)}&take=${take}`;
    return fetchJson<ComboItem[]>(url, signal);
}
