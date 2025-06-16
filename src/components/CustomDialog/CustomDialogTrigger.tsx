import {Button} from "@/components/ui/button.tsx";
import {DialogTrigger} from "@/components/ui/dialog.tsx";
import type {ButtonHTMLAttributes, ElementType} from "react";

interface CustomDialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonText: string,
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined,
    icon?: ElementType,
}

export function CustomDialogTrigger({ buttonText, icon: Icon, variant, ...rest }: CustomDialogTriggerProps){
    return(
        <DialogTrigger asChild>
            <Button variant={variant} {...rest}  size="sm">
                { Icon && <Icon size={24} /> } {buttonText}
            </Button>
        </DialogTrigger>
    );

}