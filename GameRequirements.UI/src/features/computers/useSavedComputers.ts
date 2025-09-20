import { useCallback, useEffect, useMemo, useState } from "react";
import type { ComputerConfig } from "./types";

const KEY = "gr:savedComputers:v1";

function load(): ComputerConfig[] {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
function save(list: ComputerConfig[]) {
    localStorage.setItem(KEY, JSON.stringify(list));
}

export function useSavedComputers() {
    const [items, setItems] = useState<ComputerConfig[]>(() => load());

    useEffect(() => { save(items); }, [items]);

    const add = useCallback((input: Omit<ComputerConfig, "id" | "createdAt">) => {
        const cfg: ComputerConfig = {
            id: crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2),
            createdAt: new Date().toISOString(),
            ...input,
        };
        setItems(prev => [cfg, ...prev]);
        return cfg.id;
    }, []);

    const remove = useCallback((id: string) => {
        setItems(prev => prev.filter(x => x.id !== id));
    }, []);

    const update = useCallback((id: string, patch: Partial<Omit<ComputerConfig, "id" | "createdAt">>) => {
        setItems(prev => prev.map(x => x.id === id ? { ...x, ...patch } : x));
    }, []);

    const clear = useCallback(() => setItems([]), []);

    const count = useMemo(() => items.length, [items]);

    return { items, count, add, remove, update, clear };
}
