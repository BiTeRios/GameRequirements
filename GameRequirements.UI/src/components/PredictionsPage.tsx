import { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Cpu, Monitor, MemoryStick, Zap, Search, BarChart3 } from "lucide-react";

import { HardwareSelector } from "./HardwareSelector";
import { gamesData } from "../data/games";
import { cpuData, gpuData } from "../data/hardware";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

type FpsPreset = "low" | "medium" | "high" | "ultra";

const BAR_CLASS = "recharts-fps-green";

// универсальный парсер цвета из CSS var(--primary)
function resolveThemeColor(fallback = "#76BC21") {
    try {
        const raw = getComputedStyle(document.documentElement)
            .getPropertyValue("--primary")
            .trim();

        if (!raw) return fallback;

        // готовые форматы — используем как есть
        if (/^(#|rgb|hsl|var\()/i.test(raw)) return raw;

        // тройка для hsl из shadcn: "146 62% 45%"
        if (/^\d/.test(raw) && raw.includes("%")) return `hsl(${raw})`;

        return fallback;
    } catch {
        return fallback;
    }
}

export function PredictionsPage() {
    const [query, setQuery] = useState("");
    const [preset, setPreset] = useState<FpsPreset>("high");

    const [selectedCPU, setSelectedCPU] = useState("");
    const [selectedGPU, setSelectedGPU] = useState("");
    const [selectedRAM, setSelectedRAM] = useState("16");
    const [integratedGraphics, setIntegratedGraphics] = useState(false);

    const selectedCpuObj = useMemo(() => cpuData.find((c) => c.id === selectedCPU), [selectedCPU]);
    const selectedGpuObj = useMemo(() => gpuData.find((g) => g.id === selectedGPU), [selectedGPU]);

    // цвет столбцов
    const [barColor, setBarColor] = useState<string>("#76BC21");
    useEffect(() => {
        setBarColor(resolveThemeColor());
    }, []);

    // кастомный прямоугольник — жёстко красим fill
    const GreenBarShape = (props: any) => {
        const { x, y, width, height } = props;
        const rx = 6, ry = 6;
        const h = Math.max(0, height);
        const yy = height < 0 ? y + height : y;
        return (
            <rect
                className={BAR_CLASS}
                x={x}
                y={yy}
                width={Math.max(0, width)}
                height={h}
                rx={rx}
                ry={ry}
                fill={barColor}
                style={{ fill: barColor, stroke: "none" }}
            />
        );
    };

    function scaleFps(base: number): number {
        if (!selectedCpuObj || !selectedGpuObj) return base;
        const cpuFactor = (selectedCpuObj.score ?? 100) / 100;
        const gpuFactor = (selectedGpuObj.score ?? 100) / 100;
        const igPenalty = integratedGraphics ? 0.75 : 1;
        const scaled = Math.floor(base * cpuFactor * gpuFactor * igPenalty);
        return scaled > 0 ? scaled : base;
    }

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return gamesData.filter((g) => {
            if (!q) return true;
            return (
                g.title.toLowerCase().includes(q) ||
                g.genre.toLowerCase().includes(q) ||
                String(g.year).includes(q)
            );
        });
    }, [query]);

    return (
        <div className="space-y-8">
            {/* локальный стиль с !important на случай глобальных svg правил */}
            <style>{`.${BAR_CLASS}{ fill: ${barColor} !important; }`}</style>

            <section className="text-center space-y-2">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Прогнозы <span className="text-primary">FPS</span>
                </h1>
                <p className="text-muted-foreground">
                    Выбирай конфигурацию и смотри ожидаемую частоту кадров по пресетам.
                </p>
            </section>

            <Card className="bg-[rgba(20,7,7,1)] border-border">
                <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        Конфигурация для прогноза
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <HardwareSelector
                        onCheck={(cpu, gpu, ram, ig) => {
                            setSelectedCPU(cpu);
                            setSelectedGPU(gpu);
                            setSelectedRAM(ram);
                            setIntegratedGraphics(ig);
                        }}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                            <Cpu className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">CPU:</span>
                            <Badge variant="outline">{selectedCpuObj?.name ?? "не выбран"}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">GPU:</span>
                            <Badge variant="outline">{selectedGpuObj?.name ?? "не выбрана"}</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <MemoryStick className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">RAM:</span>
                            <Badge variant="outline">{selectedRAM} GB</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-[rgba(20,7,7,1)] border-border">
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Search className="h-4 w-4 text-primary" />
                                Поиск по играм
                            </label>
                            <Input
                                placeholder="Название, жанр, год…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Пресет графики</label>
                            <Select value={preset} onValueChange={(v: FpsPreset) => setPreset(v)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите пресет" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                    <SelectItem value="ultra">Ultra</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-end">
                            <Button
                                variant="secondary"
                                className="w-full"
                                onClick={() => {
                                    setQuery("");
                                    setPreset("high");
                                }}
                            >
                                Сбросить
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="grid" className="w-full">
                <TabsList className="grid grid-cols-2 md:w-auto">
                    <TabsTrigger value="grid">Сетка</TabsTrigger>
                    <TabsTrigger value="list">Список</TabsTrigger>
                </TabsList>

                <TabsContent value="grid" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((g) => {
                            const rows = [
                                { preset: "Low", fps: scaleFps(g.fps.low) },
                                { preset: "Medium", fps: scaleFps(g.fps.medium) },
                                { preset: "High", fps: scaleFps(g.fps.high) },
                                { preset: "Ultra", fps: scaleFps(g.fps.ultra) },
                            ];
                            const current = rows.find((r) => r.preset.toLowerCase() === preset)!;

                            return (
                                <Card key={g.id} className="bg-[rgba(20,7,7,1)] border-border overflow-hidden">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="flex items-center justify-between">
                                            <span>{g.title}</span>
                                            <Badge variant="outline">{g.year}</Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="h-32 w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={rows} barCategoryGap="20%">
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="preset" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Bar
                                                        dataKey="fps"
                                                        // важно: и проп, и инлайн-стиль, и CSS-класс
                                                        fill={barColor}
                                                        shape={(p: any) => <GreenBarShape {...p} />}
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Zap className="h-4 w-4 text-primary" />
                                                <span className="text-sm text-muted-foreground">Пресет:</span>
                                                <Badge>{preset.toUpperCase()}</Badge>
                                            </div>
                                            <div className="text-2xl font-bold tracking-tight">
                                                {current.fps} FPS
                                            </div>
                                        </div>

                                        <div className="text-xs text-muted-foreground">
                                            Жанр: {g.genre} • RT: {g.hasRayTracing ? "да" : "нет"} • Онлайн:{" "}
                                            {g.isMultiplayer ? "да" : "нет"}
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </TabsContent>

                <TabsContent value="list" className="mt-6">
                    <Card className="bg-[rgba(20,7,7,1)] border-border">
                        <CardContent className="p-0 overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="text-left text-muted-foreground">
                                    <tr className="border-b border-border">
                                        <th className="py-3 px-4">Игра</th>
                                        <th className="py-3 px-4">Год</th>
                                        <th className="py-3 px-4">Low</th>
                                        <th className="py-3 px-4">Medium</th>
                                        <th className="py-3 px-4">High</th>
                                        <th className="py-3 px-4">Ultra</th>
                                        <th className="py-3 px-4">Текущий пресет</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((g) => {
                                        const L = scaleFps(g.fps.low);
                                        const M = scaleFps(g.fps.medium);
                                        const H = scaleFps(g.fps.high);
                                        const U = scaleFps(g.fps.ultra);
                                        const current =
                                            preset === "low" ? L : preset === "medium" ? M : preset === "high" ? H : U;

                                        return (
                                            <tr key={g.id} className="border-b border-border/60">
                                                <td className="py-3 px-4 font-medium">{g.title}</td>
                                                <td className="py-3 px-4">{g.year}</td>
                                                <td className="py-3 px-4">{L}</td>
                                                <td className="py-3 px-4">{M}</td>
                                                <td className="py-3 px-4">{H}</td>
                                                <td className="py-3 px-4">{U}</td>
                                                <td className="py-3 px-4">
                                                    <Badge>{preset.toUpperCase()}</Badge>{" "}
                                                    <span className="font-semibold">{current} FPS</span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default PredictionsPage;
