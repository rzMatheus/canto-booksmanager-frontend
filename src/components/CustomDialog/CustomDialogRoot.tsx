import {Dialog} from "@/components/ui/dialog.tsx";
import type {ReactNode} from "react";

interface CustomDialogWrapperProps {
    children: ReactNode
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function CustomDialogRoot({ children, open, onOpenChange }: CustomDialogWrapperProps){
    return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        {children}
    </Dialog>)
}