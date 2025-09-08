import { useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Search, Cpu, Monitor, MemoryStick, Zap } from "lucide-react";
import { cpuData, gpuData, ramOptions } from "../data/hardware";

interface HardwareSelectorProps {
  onCheck?: (cpu: string, gpu: string, ram: string, integratedGraphics: boolean) => void;
}

export function HardwareSelector({ onCheck }: HardwareSelectorProps) {
  const [selectedCPU, setSelectedCPU] = useState("");
  const [selectedGPU, setSelectedGPU] = useState("");
  const [selectedRAM, setSelectedRAM] = useState("16");
  const [integratedGraphics, setIntegratedGraphics] = useState(false);

  const handleCheck = () => {
    if (onCheck && selectedCPU && selectedGPU) {
      onCheck(selectedCPU, selectedGPU, selectedRAM, integratedGraphics);
    }
  };

  const canCheck = selectedCPU && selectedGPU;

  return (
    <div className="bg-white rounded-lg border border-border p-6 space-y-6 shadow-sm">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Выберите конфигурацию ПК</h3>
        <p className="text-muted-foreground text-sm">
          Укажите ваше железо для проверки совместимости
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Cpu className="h-4 w-4 text-primary" />
            Процессор (CPU)
          </label>
          <Select value={selectedCPU} onValueChange={setSelectedCPU}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите процессор" />
            </SelectTrigger>
            <SelectContent>
              {cpuData.map((cpu) => (
                <SelectItem key={cpu.id} value={cpu.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{cpu.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {cpu.cores}C/{cpu.threads}T
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Monitor className="h-4 w-4 text-primary" />
            Видеокарта (GPU)
          </label>
          <Select value={selectedGPU} onValueChange={setSelectedGPU}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите видеокарту" />
            </SelectTrigger>
            <SelectContent>
              {gpuData.map((gpu) => (
                <SelectItem key={gpu.id} value={gpu.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{gpu.name}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {gpu.vram}GB
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MemoryStick className="h-4 w-4 text-primary" />
            Оперативная память (RAM)
          </label>
          <Select value={selectedRAM} onValueChange={setSelectedRAM}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ramOptions.map((ram) => (
                <SelectItem key={ram.value} value={ram.value}>
                  {ram.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Дополнительно</label>
          <div className="flex items-center space-x-2 py-2">
            <Checkbox 
              id="integrated" 
              checked={integratedGraphics}
              onCheckedChange={(checked) => setIntegratedGraphics(checked as boolean)}
            />
            <label htmlFor="integrated" className="text-sm">
              Встроенная графика
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={handleCheck}
          disabled={!canCheck}
          className="flex-1 flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          Проверить совместимость
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
        >
          <Zap className="h-4 w-4" />
          Автоопределение
        </Button>
      </div>
    </div>
  );
}