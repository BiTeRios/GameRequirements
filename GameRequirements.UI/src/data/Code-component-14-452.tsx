import { GameData } from "../components/GameCard";

export const gamesData: GameData[] = [
  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    genre: "RPG",
    year: 2020,
    imageUrl: "https://images.unsplash.com/photo-1607896426171-99097eb60cb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjAyMDc3JTIwZ2FtZXxlbnwxfHx8fDE3NTczMjM5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    compatibility: "borderline",
    fps: { low: 45, medium: 38, high: 28, ultra: 20 },
    requirements: {
      min: {
        cpu: "Intel Core i5-3570K",
        gpu: "GTX 780 / RX 470",
        ram: "8 GB",
        storage: "70 GB",
        directx: "DirectX 12"
      },
      recommended: {
        cpu: "Intel Core i7-4790",
        gpu: "GTX 1060 6GB / RX 580",
        ram: "12 GB",
        storage: "70 GB SSD",
        directx: "DirectX 12"
      }
    },
    isMultiplayer: false,
    hasRayTracing: true
  },
  {
    id: "fortnite",
    title: "Fortnite",
    genre: "Battle Royale",
    year: 2017,
    imageUrl: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3J0bml0ZSUyMGdhbWluZ3xlbnwxfHx8fDE3NTczMjM5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    compatibility: "compatible",
    fps: { low: 120, medium: 95, high: 75, ultra: 60 },
    requirements: {
      min: {
        cpu: "Intel Core i3-3225",
        gpu: "Intel HD 4000",
        ram: "8 GB",
        storage: "30 GB",
        directx: "DirectX 11"
      },
      recommended: {
        cpu: "Intel Core i5-7300U",
        gpu: "GTX 960 / RX 470",
        ram: "16 GB",
        storage: "30 GB",
        directx: "DirectX 12"
      }
    },
    isMultiplayer: true,
    hasRayTracing: false
  },
  {
    id: "valorant", 
    title: "Valorant",
    genre: "FPS",
    year: 2020,
    imageUrl: "https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YWxvcmFudCUyMGVzcG9ydHN8ZW58MXx8fHwxNzU3MzIzOTcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    compatibility: "compatible",
    fps: { low: 144, medium: 120, high: 100, ultra: 85 },
    requirements: {
      min: {
        cpu: "Intel i3-4150",
        gpu: "GTX 730",
        ram: "4 GB",
        storage: "8 GB",
        directx: "DirectX 11"
      },
      recommended: {
        cpu: "Intel i5-4460",
        gpu: "GTX 1050 Ti",
        ram: "8 GB",
        storage: "8 GB",
        directx: "DirectX 11"
      }
    },
    isMultiplayer: true,
    hasRayTracing: false
  },
  {
    id: "gta-v",
    title: "Grand Theft Auto V",
    genre: "Action",
    year: 2013,
    imageUrl: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    compatibility: "compatible",
    fps: { low: 85, medium: 72, high: 58, ultra: 45 },
    requirements: {
      min: {
        cpu: "Intel Core 2 Quad Q6600",
        gpu: "GTX 660 2GB / HD 7870",
        ram: "8 GB",
        storage: "72 GB",
        directx: "DirectX 10"
      },
      recommended: {
        cpu: "Intel Core i5 3470",
        gpu: "GTX 660 2GB / HD 7870",
        ram: "8 GB",
        storage: "72 GB",
        directx: "DirectX 11"
      }
    },
    isMultiplayer: true,
    hasRayTracing: false
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    genre: "Action RPG",
    year: 2022,
    imageUrl: "https://images.unsplash.com/photo-1560439514-4e9645039924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    compatibility: "borderline",
    fps: { low: 55, medium: 48, high: 35, ultra: 28 },
    requirements: {
      min: {
        cpu: "Intel Core i5-8400",
        gpu: "GTX 1060 3GB / RX 580",
        ram: "12 GB",
        storage: "60 GB",
        directx: "DirectX 12"
      },
      recommended: {
        cpu: "Intel Core i7-8700K",
        gpu: "GTX 1070 / RX Vega 56",
        ram: "16 GB",
        storage: "60 GB",
        directx: "DirectX 12"
      }
    },
    isMultiplayer: true,
    hasRayTracing: false
  },
  {
    id: "hogwarts-legacy",
    title: "Hogwarts Legacy",
    genre: "Action RPG",
    year: 2023,
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    compatibility: "incompatible",
    fps: { low: 25, medium: 20, high: 15, ultra: 12 },
    requirements: {
      min: {
        cpu: "Intel Core i5-6600",
        gpu: "GTX 960 / RX 470",
        ram: "16 GB",
        storage: "85 GB",
        directx: "DirectX 12"
      },
      recommended: {
        cpu: "Intel Core i7-8700",
        gpu: "GTX 1080 Ti / RX 6800 XT",
        ram: "16 GB",
        storage: "85 GB SSD",
        directx: "DirectX 12"
      }
    },
    isMultiplayer: false,
    hasRayTracing: true
  }
];