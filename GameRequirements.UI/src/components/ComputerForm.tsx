import React, { useState } from "react";
import Typeahead from "./Typeahead";
import { searchCpus, searchGpus } from "@/services/hardware";
import { createComputer } from "@/services/computers";
import { useAuth } from "@/context/AuthContext";
type Item = { id: number; name: string };

type Props = {
    onCreated?: () => void; // вызов после успешного создания
};

export default function ComputerForm({ onCreated }: Props) {
    const { fetchWithAuth } = useAuth();  
    const [cpu, setCpu] = useState<Item | null>(null);
    const [gpu, setGpu] = useState<Item | null>(null);
    const [ram, setRam] = useState<number>(16);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErr(null);
        if (!cpu || !gpu || !ram) { setErr("Заполните CPU, GPU и RAM"); return; }
        setLoading(true);
        try {
            await createComputer({ cpuName: cpu.name, gpuName: gpu.name, ramGB: ram },
                fetchWithAuth);
            setCpu(null); setGpu(null); setRam(16);
            onCreated?.();
        } catch (e: any) {
            setErr(e?.message || "Не удалось сохранить конфигурацию");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="border rounded-2xl p-4 space-y-3 bg-white shadow-sm">
            <h3 className="text-lg font-semibold">Добавить конфигурацию ПК</h3>
            <Typeahead label="Процессор" value={cpu} onChange={setCpu} loader={searchCpus} placeholder="например, Intel Core i5-12400F" />
            <Typeahead label="Видеокарта" value={gpu} onChange={setGpu} loader={searchGpus} placeholder="например, GeForce RTX 3060 12GB" />
            <div>
                <label className="block text-sm font-medium mb-1">RAM (GB)</label>
                <input
                    type="number"
                    min={1}
                    max={4096}
                    value={ram}
                    onChange={(e) => setRam(Number(e.target.value))}
                    className="w-full border rounded-lg px-3 py-2 outline-none focus:ring focus:ring-indigo-200"
                />
            </div>
            {err && <div className="text-sm text-red-600">{err}</div>}
            <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
            >
                {loading ? "Сохраняю…" : "Сохранить"}
            </button>
        </form>
    );
}
