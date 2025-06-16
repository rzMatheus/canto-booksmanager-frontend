import {DialogContent} from "@/components/ui/dialog.tsx";
import type {ReactNode} from "react";

interface CustomFormDialogContentProps {
    children: ReactNode
}

export function CustomFormDialogContentRoot({ children }: CustomFormDialogContentProps){
    return(
        <DialogContent className="sm:max-w-[425px]">
            {children}
        </DialogContent>
    )
}