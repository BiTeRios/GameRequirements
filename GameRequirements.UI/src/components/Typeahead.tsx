import React, { useEffect, useMemo, useRef, useState } from "react";

type Item = { id: number; name: string };
type Props = {
    label: string;
    placeholder?: string;
    value: Item | null;
    onChange: (v: Item | null) => void;
    loader: (q: string) => Promise<Item[]>;
};

export default function Typeahead({ label, placeholder, value, onChange, loader }: Props) {
    const [q, setQ] = useState(value?.name ?? "");
    const [items, setItems] = useState<Item[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const boxRef = useRef<HTMLDivElement>(null);

    // закрытие выпадашки при клике вне
    useEffect(() => {
        const onDoc = (e: MouseEvent) => {
            if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    // дебаунс поиска
    useEffect(() => {
        const h = setTimeout(async () => {
            if (!q || q.length < 1) { setItems([]); return; }
            setLoading(true);
            try { setItems(await loader(q)); } finally { setLoading(false); }
        }, 200);
        return () => clearTimeout(h);
    }, [q, loader]);

    useEffect(() => {
        // синхронизация, если проп value поменялся извне
        if (value?.name && value.name !== q) setQ(value.name);
    }, [value]);

    return (
        <div ref={boxRef} className="w-full">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring focus:ring-indigo-200"
                placeholder={placeholder}
                value={q}
                onChange={(e) => { setQ(e.target.value); setOpen(true); onChange(null); }}
                onFocus={() => setOpen(true)}
            />
            {open && (items.length > 0 || loading) && (
                <div className="mt-1 border rounded-lg bg-white shadow-lg max-h-56 overflow-auto">
                    {loading && <div className="px-3 py-2 text-sm text-gray-500">Поиск…</div>}
                    {!loading && items.map(it => (
                        <button
                            type="button"
                            key={it.id}
                            className={`w-full text-left px-3 py-2 hover:bg-indigo-50 ${value?.id === it.id ? "bg-indigo-50" : ""}`}
                            onClick={() => { onChange(it); setQ(it.name); setOpen(false); }}
                        >
                            {it.name}
                        </button>
                    ))}
                    {!loading && items.length === 0 && <div className="px-3 py-2 text-sm text-gray-500">Ничего не найдено</div>}
                </div>
            )}
        </div>
    );
}
