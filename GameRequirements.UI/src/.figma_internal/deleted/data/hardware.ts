export interface CPU {
  id: string;
  name: string;
  manufacturer: "Intel" | "AMD";
  cores: number;
  threads: number;
  baseFreq: number;
  score: number;
}

export interface GPU {
  id: string;
  name: string;
  manufacturer: "NVIDIA" | "AMD" | "Intel";
  vram: number;
  score: number;
  supportsRayTracing: boolean;
}

export const cpuData: CPU[] = [
  {
    id: "i5-12400",
    name: "Intel Core i5-12400",
    manufacturer: "Intel",
    cores: 6,
    threads: 12,
    baseFreq: 2.5,
    score: 85
  },
  {
    id: "ryzen-5-5600",
    name: "AMD Ryzen 5 5600",
    manufacturer: "AMD",
    cores: 6,
    threads: 12,
    baseFreq: 3.5,
    score: 83
  },
  {
    id: "i7-12700k",
    name: "Intel Core i7-12700K",
    manufacturer: "Intel",
    cores: 12,
    threads: 20,
    baseFreq: 3.6,
    score: 95
  },
  {
    id: "ryzen-7-5800x",
    name: "AMD Ryzen 7 5800X",
    manufacturer: "AMD",
    cores: 8,
    threads: 16,
    baseFreq: 3.8,
    score: 92
  },
  {
    id: "i5-10400",
    name: "Intel Core i5-10400",
    manufacturer: "Intel",
    cores: 6,
    threads: 12,
    baseFreq: 2.9,
    score: 75
  },
  {
    id: "ryzen-5-3600",
    name: "AMD Ryzen 5 3600",
    manufacturer: "AMD",
    cores: 6,
    threads: 12,
    baseFreq: 3.6,
    score: 78
  }
];

export const gpuData: GPU[] = [
  {
    id: "rtx-3060",
    name: "NVIDIA GeForce RTX 3060",
    manufacturer: "NVIDIA",
    vram: 12,
    score: 82,
    supportsRayTracing: true
  },
  {
    id: "rx-6600",
    name: "AMD Radeon RX 6600",
    manufacturer: "AMD", 
    vram: 8,
    score: 80,
    supportsRayTracing: true
  },
  {
    id: "rtx-4060",
    name: "NVIDIA GeForce RTX 4060",
    manufacturer: "NVIDIA",
    vram: 8,
    score: 85,
    supportsRayTracing: true
  },
  {
    id: "rtx-3070",
    name: "NVIDIA GeForce RTX 3070",
    manufacturer: "NVIDIA",
    vram: 8,
    score: 90,
    supportsRayTracing: true
  },
  {
    id: "rx-6700-xt",
    name: "AMD Radeon RX 6700 XT",
    manufacturer: "AMD",
    vram: 12,
    score: 88,
    supportsRayTracing: true
  },
  {
    id: "gtx-1660-super",
    name: "NVIDIA GeForce GTX 1660 Super",
    manufacturer: "NVIDIA",
    vram: 6,
    score: 70,
    supportsRayTracing: false
  },
  {
    id: "rx-580",
    name: "AMD Radeon RX 580",
    manufacturer: "AMD",
    vram: 8,
    score: 65,
    supportsRayTracing: false
  }
];

export const ramOptions = [
  { value: "8", label: "8 GB" },
  { value: "16", label: "16 GB" }, 
  { value: "32", label: "32 GB" },
  { value: "64", label: "64+ GB" }
];