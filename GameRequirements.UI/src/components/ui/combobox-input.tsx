import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils"; // если у тебя есть util для className
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface ComboBoxInputProps {
    label: string;
    placeholder: string;
    options: string[];
    value: string;
    onChange: (val: string) => void;
}

export function ComboBoxInput({
    label,
    placeholder,
    options,
    value,
    onChange,
}: ComboBoxInputProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="space-y-1">
            <label className="text-sm font-medium">{label}</label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value ? value : placeholder}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                    <Command>
                        <CommandInput
                            placeholder={`Поиск ${label.toLowerCase()}...`}
                            value={value}
                            onValueChange={onChange}
                        />
                        <CommandList>
                            <CommandEmpty>Ничего не найдено</CommandEmpty>
                            <CommandGroup>
                                {options.map((opt) => (
                                    <CommandItem
                                        key={opt}
                                        value={opt}
                                        onSelect={(current) => {
                                            onChange(current);
                                            setOpen(false);
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === opt ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {opt}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
