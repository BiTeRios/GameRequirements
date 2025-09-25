import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMe, UserPublic } from "../api/users";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
    Settings,
    Monitor,
    Edit,
    Save,
    X,
    Plus,
    Trash2,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

interface ProfilePageProps {
    onNavigate?: (page: string) => void;
}

type Config = {
    id: string;
    name: string;
    cpu: string;
    gpu: string;
    ram: string;
    createdAt: string;
    isEditing?: boolean;
};

const LS_KEY = "gr:configs:v1";

// демо-списки
const CPU_OPTIONS = [
    "Intel Core i5-10400F",
    "Intel Core i5-12400",
    "Intel Core i7-12700",
    "AMD Ryzen 5 5600",
    "AMD Ryzen 7 5800X",
    "AMD Ryzen 5 7600",
];
const GPU_OPTIONS = [
    "NVIDIA GeForce GTX 1660 Super",
    "NVIDIA GeForce RTX 3060",
    "NVIDIA GeForce RTX 3070",
    "AMD Radeon RX 6600",
    "AMD Radeon RX 6700 XT",
    "AMD Radeon RX 7800 XT",
];
const RAM_OPTIONS = ["8GB", "16GB", "32GB", "64GB"];

function loadConfigs(): Config[] {
    try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? (JSON.parse(raw) as Config[]) : [];
    } catch {
        return [];
    }
}
function saveConfigs(list: Config[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
    const nav = useNavigate();
    const { fetchWithAuth } = useAuth();

    // ---- только email ----
    const [loadingUser, setLoadingUser] = useState(true);
    const [userError, setUserError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>("");

    // заглушка-никнейм для красивого заголовка
    const nicknamePlaceholder = "CyberGamer2077";

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const me: UserPublic = await getMe(fetchWithAuth);
                if (!alive) return;
                setEmail(me.email);
                setUserError(null);
            } catch (e: any) {
                if (!alive) return;
                setUserError(e?.message || "Не удалось загрузить email");
            } finally {
                if (alive) setLoadingUser(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, [fetchWithAuth]);

    // ---- мульти-конфиги ----
    const [configs, setConfigs] = useState<Config[]>(() => loadConfigs());
    useEffect(() => saveConfigs(configs), [configs]);

    const startEdit = (id: string) =>
        setConfigs((p) => p.map((c) => (c.id === id ? { ...c, isEditing: true } : c)));
    const cancelEdit = (id: string) =>
        setConfigs((p) => p.map((c) => (c.id === id ? { ...c, isEditing: false } : c)));
    const applyEdit = (id: string, patch: Partial<Config>) =>
        setConfigs((p) => p.map((c) => (c.id === id ? { ...c, ...patch } : c)));
    const saveEdit = (id: string) =>
        setConfigs((p) => p.map((c) => (c.id === id ? { ...c, isEditing: false } : c)));
    const deleteConfig = (id: string) => setConfigs((p) => p.filter((c) => c.id !== id));

    const goToGames = (cfg: Config) => {
        const q = new URLSearchParams({
            cpu: cfg.cpu,
            gpu: cfg.gpu,
            ramGb: cfg.ram.replace(/[^0-9]/g, "") || "16",
        }).toString();
        nav(`/games?${q}`);
    };

    // ---- диалог создания ----
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [newName, setNewName] = useState("");
    const [newCpu, setNewCpu] = useState<string | undefined>();
    const [newGpu, setNewGpu] = useState<string | undefined>();
    const [newRam, setNewRam] = useState<string | undefined>("16GB");

    const canCreate = useMemo(
        () => Boolean(newName.trim()) && !!newCpu && !!newGpu && !!newRam,
        [newName, newCpu, newGpu, newRam]
    );

    const createConfig = () => {
        if (!canCreate) return;
        const id = (crypto as any)?.randomUUID?.() ?? Math.random().toString(36).slice(2);
        const cfg: Config = {
            id,
            name: newName.trim(),
            cpu: newCpu!,
            gpu: newGpu!,
            ram: newRam!,
            createdAt: new Date().toISOString(),
        };
        setConfigs((p) => [cfg, ...p]);
        setNewName("");
        setNewCpu(undefined);
        setNewGpu(undefined);
        setNewRam("16GB");
        setIsAddOpen(false);
    };

    return (
        <div className="space-y-8">
            {/* ---------- Шапка профиля: старый градиентный ник (заглушка) + реальный email ---------- */}
            <Card className="glass-morphism border-primary/20">
                <CardContent className="p-8">
                    {loadingUser ? (
                        <div className="animate-pulse space-y-2">
                            <div className="h-8 w-48 bg-muted rounded" />
                            <div className="h-4 w-64 bg-muted rounded" />
                        </div>
                    ) : userError ? (
                        <div className="text-destructive">⚠ Ошибка 500</div>
                    ) : (
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                {nicknamePlaceholder}
                            </h1>
                            <p className="text-muted-foreground">{email}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* ---------- Вкладки ---------- */}
            <Tabs defaultValue="gaming" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 glass-morphism">
                    <TabsTrigger value="gaming" className="flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        Игровая конфигурация
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Настройки
                    </TabsTrigger>
                </TabsList>

                {/* ---------- Игровая конфигурация ---------- */}
                <TabsContent value="gaming" className="space-y-6">
                    <Card className="glass-morphism border-accent/10">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center justify-between">
                                <span>Мои конфигурации</span>
                                <Button
                                    onClick={() => setIsAddOpen(true)}
                                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 neon-glow"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Добавить конфигурацию
                                </Button>
                            </CardTitle>
                            <CardDescription>
                                Сохраняйте несколько ПК и быстро переходите к рекомендациям игр
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {configs.length === 0 ? (
                                <div className="text-muted-foreground">Пока нет сохранённых конфигураций.</div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {configs.map((cfg) => (
                                        <Card key={cfg.id} className="glass-morphism border-primary/10">
                                            <CardHeader className="pb-3">
                                                <CardTitle className="flex items-center justify-between gap-3">
                                                    <span className="truncate">{cfg.name || "Без названия"}</span>
                                                    <div className="flex gap-2">
                                                        {!cfg.isEditing ? (
                                                            <>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="border-primary/30 hover:border-primary hover:bg-primary/10"
                                                                    onClick={() => startEdit(cfg.id)}
                                                                >
                                                                    <Edit className="h-4 w-4 mr-1" /> Редактировать
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => goToGames(cfg)}
                                                                >
                                                                    К играм
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="border-destructive/30 hover:border-destructive hover:bg-destructive/10"
                                                                    onClick={() => deleteConfig(cfg.id)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Button
                                                                    size="sm"
                                                                    className="bg-primary hover:bg-primary/80"
                                                                    onClick={() => saveEdit(cfg.id)}
                                                                >
                                                                    <Save className="h-4 w-4 mr-1" /> Сохранить
                                                                </Button>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="border-destructive/30 hover:border-destructive hover:bg-destructive/10"
                                                                    onClick={() => cancelEdit(cfg.id)}
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            </>
                                                        )}
                                                    </div>
                                                </CardTitle>
                                                <CardDescription>
                                                    Создано: {new Date(cfg.createdAt).toLocaleString("ru-RU")}
                                                </CardDescription>
                                            </CardHeader>

                                            <CardContent className="space-y-3">
                                                {!cfg.isEditing ? (
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
                                                            <div>
                                                                <div className="font-semibold text-foreground">Процессор</div>
                                                                <div className="text-muted-foreground">{cfg.cpu}</div>
                                                            </div>
                                                            <Badge className="bg-primary/10 text-primary border-primary/20">OK</Badge>
                                                        </div>

                                                        <div className="flex items-center justify-between p-3 rounded-lg bg-accent/5 border border-accent/20">
                                                            <div>
                                                                <div className="font-semibold text-foreground">Видеокарта</div>
                                                                <div className="text-muted-foreground">{cfg.gpu}</div>
                                                            </div>
                                                            <Badge className="bg-accent/10 text-accent border-accent/20">OK</Badge>
                                                        </div>

                                                        <div className="flex items-center justify-between p-3 rounded-lg bg-[#00ffff]/5 border border-[#00ffff]/20">
                                                            <div>
                                                                <div className="font-semibold text-foreground">Оперативная память</div>
                                                                <div className="text-muted-foreground">{cfg.ram}</div>
                                                            </div>
                                                            <Badge className="bg-[#00ffff]/10 text-[#00ffff] border-[#00ffff]/20">OK</Badge>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-1 gap-3">
                                                        <div className="space-y-1">
                                                            <Label>Название</Label>
                                                            <Input
                                                                value={cfg.name}
                                                                onChange={(e) => applyEdit(cfg.id, { name: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label>CPU</Label>
                                                            <Input
                                                                value={cfg.cpu}
                                                                onChange={(e) => applyEdit(cfg.id, { cpu: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label>GPU</Label>
                                                            <Input
                                                                value={cfg.gpu}
                                                                onChange={(e) => applyEdit(cfg.id, { gpu: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label>RAM</Label>
                                                            <Input
                                                                value={cfg.ram}
                                                                onChange={(e) => applyEdit(cfg.id, { ram: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Диалог создания */}
                    <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                        <DialogContent className="sm:max-w-[560px]">
                            <DialogHeader>
                                <DialogTitle>Новая конфигурация</DialogTitle>
                                <DialogDescription>Задайте имя и выберите комплектующие</DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-2">
                                <div className="space-y-1">
                                    <Label htmlFor="new-name">Название</Label>
                                    <Input
                                        id="new-name"
                                        placeholder="Дом / Офис / Игровой"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <Label>Процессор (CPU)</Label>
                                        <Select value={newCpu} onValueChange={setNewCpu}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Выберите CPU" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Популярные CPU</SelectLabel>
                                                    {CPU_OPTIONS.map((c) => (
                                                        <SelectItem key={c} value={c}>
                                                            {c}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1">
                                        <Label>Видеокарта (GPU)</Label>
                                        <Select value={newGpu} onValueChange={setNewGpu}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Выберите GPU" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Популярные GPU</SelectLabel>
                                                    {GPU_OPTIONS.map((g) => (
                                                        <SelectItem key={g} value={g}>
                                                            {g}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <Label>Оперативная память (RAM)</Label>
                                    <Select value={newRam} onValueChange={setNewRam}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Выберите RAM" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Объём</SelectLabel>
                                                {RAM_OPTIONS.map((r) => (
                                                    <SelectItem key={r} value={r}>
                                                        {r}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                                    Отмена
                                </Button>
                                <Button disabled={!canCreate} onClick={createConfig} className="bg-primary hover:bg-primary/80">
                                    Сохранить
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </TabsContent>

                {/* ---------- Настройки ---------- */}
                <TabsContent value="settings" className="space-y-6">
                    <Card className="glass-morphism border-muted/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Настройки аккаунта
                            </CardTitle>
                            <CardDescription>Базовые параметры профиля</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="font-semibold">Email</div>
                                    <div className="text-sm text-muted-foreground">Почта вашей учётной записи</div>
                                </div>
                                <div className="text-sm font-medium">{loadingUser ? "…" : email || "—"}</div>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <div className="font-semibold text-destructive">Опасная зона</div>
                                <Button variant="destructive" className="w-full">Удалить аккаунт</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
