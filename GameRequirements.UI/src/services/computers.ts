// src/services/computers.ts
import { http } from "./http";

export type ComputerDTO = { cpuName: string; gpuName: string; ramGB: number };
export type ComputerListItem = { id: number; cpu: string; gpu: string; ram: number };

export async function createComputer(dto: ComputerDTO) {
    // было: fetch("/services/computers", ...)
    return http<{ id: number }>(`/api/computers`, {
        method: "POST",
        body: JSON.stringify(dto),
    });
}

export async function getMyComputers() {
    // было: fetch("/services/computers/my", ...)
    return http<ComputerListItem[]>(`/api/computers/my`);
}
