import React from "react";
import { ComputerListItem } from "@/services/computers";

type Props = {
    items: ComputerListItem[];
    loading?: boolean;
    error?: string | null;
};

export default function ComputerList({ items, loading, error }: Props) {
    if (loading) return <div className="text-gray-500">Загрузка конфигураций…</div>;
    if (error) return <div className="text-red-600">{error}</div>;
    if (!items.length) return <div className="text-gray-500">Конфигураций пока нет.</div>;

    return (
        <div className="grid gap-3">
            {items.map((x) => (
                <div key={x.id} className="border rounded-2xl p-4 bg-white shadow-sm">
                    <div className="text-sm text-gray-500 mb-1">ID: {x.id}</div>
                    <div className="text-base"><span className="font-medium">CPU:</span> {x.cpu}</div>
                    <div className="text-base"><span className="font-medium">GPU:</span> {x.gpu}</div>
                    <div className="text-base"><span className="font-medium">RAM:</span> {x.ram} GB</div>
                </div>
            ))}
        </div>
    );
}
