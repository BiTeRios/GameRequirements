import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "./ui/input";

type Item = { id: number; name: string };

type Props = {
    value?: string;
    onChange: (v: string) => void;
    placeholder?: string;
    // функция, которая ходит в бэкенд за вариантами
    fetcher: (q: string, take?: number, signal?: AbortSignal) => Promise<Item[]>;
    take?: number;
    minLength?: number; // с какой длины начинаем показывать подсказки
    disabled?: boolean;
    className?: string; // чтобы не трогать твои стили извне
};

export default function AutocompleteInput({
    value = "",
    onChange,
    placeholder,
    fetcher,
    take = 15,
    minLength = 1,
    disabled,
    className,
}: Props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [highlight, setHighlight] = useState<number>(-1);
    const boxRef = useRef<HTMLDivElement | null>(null);

    // дебаунс 250мс
    useEffect(() => {
        if (!value || value.trim().length < minLength) {
            setItems([]);
            setOpen(false);
            setError(null);
            setLoading(false);
            return;
        }
        let alive = true;
        const ac = new AbortController();
        const t = setTimeout(async () => {
            try {
                setLoading(true);
                setError(null);
                const list = await fetcher(value.trim(), take, ac.signal);
                if (!alive) return;
                setItems(list);
                setOpen(list.length > 0);
                setHighlight(-1);
            } catch (e: any) {
                if (!alive) return;
                if (e?.name !== "AbortError") {
                    setError(e?.message || "Ошибка загрузки");
                    setItems([]);
                    setOpen(false);
                }
            } finally {
                if (alive) setLoading(false);
            }
        }, 250);
        return () => {
            alive = false;
            ac.abort();
            clearTimeout(t);
        };
    }, [value, fetcher, take, minLength]);

    // клик вне — закрываем список
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (!boxRef.current) return;
            if (!boxRef.current.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    function select(i: number) {
        if (i < 0 || i >= items.length) return;
        onChange(items[i].name);
        setOpen(false);
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (!open || items.length === 0) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlight((h) => (h + 1) % items.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlight((h) => (h - 1 + items.length) % items.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (highlight >= 0) select(highlight);
        } else if (e.key === "Escape") {
            setOpen(false);
        }
    }

    return (
        <div ref={boxRef} className="relative">
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                onFocus={() => items.length > 0 && setOpen(true)}
                onKeyDown={onKeyDown}
                disabled={disabled}
                className={className}
            />
            {/* Выпадающий список — абсолютное позиционирование, чтобы не менять глобальные стили */}
            {open && (
                <div
                    className="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md"
                    role="listbox"
                >
                    {loading && (
                        <div className="px-3 py-2 text-sm text-muted-foreground">Загрузка…</div>
                    )}
                    {error && !loading && (
                        <div className="px-3 py-2 text-sm text-destructive">{error}</div>
                    )}
                    {!loading &&
                        !error &&
                        items.map((it, idx) => (
                            <button
                                type="button"
                                key={it.id}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => select(idx)}
                                className={
                                    "w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground " +
                                    (idx === highlight ? "bg-accent text-accent-foreground" : "")
                                }
                                role="option"
                                aria-selected={idx === highlight}
                            >
                                {it.name}
                            </button>
                        ))}
                </div>
            )}
        </div>
    );
}
