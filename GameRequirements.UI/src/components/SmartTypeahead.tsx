import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Check, Loader2, Search } from "lucide-react";

type Item = { id: number; name: string };

type Props = {
    label: string;
    placeholder?: string;
    value: string;                  // текст из внешнего стейта
    onChange: (v: string) => void;  // меняем текст при вводе
    onPick: (v: Item) => void;      // выбрали вариант из списка
    loader: (q: string) => Promise<Item[]>; // загрузка совпадений из БД
    minChars?: number;              // порог запуска поиска
};

const SmartTypeahead: React.FC<Props> = ({
    label,
    placeholder,
    value,
    onChange,
    onPick,
    loader,
    minChars = 1,
}) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [active, setActive] = useState<number>(-1);
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const composingRef = useRef(false);
    const reqId = useRef(0);

    // клик вне — закрыть
    useEffect(() => {
        const onDoc = (e: MouseEvent) => {
            if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    // загрузка результатов (дебаунс 200мс)
    useEffect(() => {
        if (!open) return;
        if (composingRef.current) return;
        const q = value.trim();
        const h = setTimeout(async () => {
            if (q.length < minChars) { setItems([]); setActive(-1); return; }
            setLoading(true);
            const id = ++reqId.current;
            try {
                const res = await loader(q);
                if (id === reqId.current) {
                    setItems(res);
                    setActive(res.length ? 0 : -1);
                }
            } finally {
                if (id === reqId.current) setLoading(false);
            }
        }, 200);
        return () => clearTimeout(h);
    }, [value, open, loader, minChars]);

    // клавиатура
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!open) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((p) => (items.length ? (p + 1) % items.length : -1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((p) => (items.length ? (p - 1 + items.length) % items.length : -1));
        } else if (e.key === "Enter") {
            if (active >= 0 && active < items.length) {
                e.preventDefault();
                pick(items[active]);
            }
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    };

    const pick = (it: Item) => {
        onPick(it);
        onChange(it.name);
        setOpen(false);
    };

    return (
        <div className="space-y-1" ref={wrapRef}>
            <label className="block text-sm font-medium">{label}</label>

            <div className="relative">
                <Input
                    placeholder={placeholder}
                    value={value}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    onCompositionStart={() => { composingRef.current = true; }}
                    onCompositionEnd={(e) => {
                        composingRef.current = false;
                        onChange((e.target as HTMLInputElement).value);
                        setOpen(true);
                    }}
                    onChange={(e) => { onChange(e.target.value); setOpen(true); }}
                    onFocus={() => setOpen(true)}
                    onKeyDown={onKeyDown}
                />

                {open && (
                    <div
                        className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md"
                        onMouseDown={(e) => e.preventDefault()} // чтобы клики не блюрили инпут раньше времени
                    >
                        <div className="flex items-center px-3 pt-3 pb-2 gap-2 text-sm text-muted-foreground select-none">
                            <Search className="h-4 w-4" />
                            <span className="truncate">
                                {value.trim().length >= minChars ? `Поиск: "${value.trim()}"` : `Начните ввод (${minChars}+)`}
                            </span>
                            {loading && <Loader2 className="ml-auto h-4 w-4 animate-spin" />}
                        </div>

                        <div className="max-h-60 overflow-auto">
                            {!loading && value.trim().length >= minChars && items.length === 0 && (
                                <div className="px-3 py-2 text-sm text-muted-foreground">Совпадений не найдено</div>
                            )}

                            {items.map((it, i) => {
                                const selected = it.name.toLowerCase() === value.toLowerCase();
                                const activeCls = i === active ? "bg-accent" : "hover:bg-accent/60";
                                const checkVis = selected ? "opacity-100" : "opacity-0";
                                return (
                                    <button
                                        key={it.id}
                                        type="button"
                                        className={`w-full flex items-center text-left px-3 py-2 cursor-pointer ${activeCls}`}
                                        onClick={() => pick(it)}
                                    >
                                        <Check className={`mr-2 h-4 w-4 ${checkVis}`} />
                                        {highlight(it.name, value)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SmartTypeahead;

function highlight(text: string, needle: string) {
    const q = needle.trim();
    if (!q) return <span>{text}</span>;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx < 0) return <span>{text}</span>;
    const pre = text.slice(0, idx);
    const mid = text.slice(idx, idx + q.length);
    const post = text.slice(idx + q.length);
    return (
        <span>
            {pre}
            <span className="bg-accent text-accent-foreground/90 rounded px-0.5">{mid}</span>
            {post}
        </span>
    );
}
