import { http } from "./http";

export type ComboItem = { id: number; name: string };

export async function searchCpus(q: string): Promise<ComboItem[]> {
    const qs = q ? `?q=${encodeURIComponent(q)}` : "";
    return http<ComboItem[]>(`/api/hardware/cpus${qs}`);
}

export async function searchGpus(q: string): Promise<ComboItem[]> {
    const qs = q ? `?q=${encodeURIComponent(q)}` : "";
    return http<ComboItem[]>(`/api/hardware/gpus${qs}`);
}
