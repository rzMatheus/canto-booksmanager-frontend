import {DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";

interface CustomFormDialogContentHeaderProps {
    title: string,
    description: string,
}
export function CustomFormDialogContentHeader( {title,description}: CustomFormDialogContentHeaderProps){
    return(
        <DialogHeader>
            <DialogTitle>{ title }</DialogTitle>
            <DialogDescription>
                { description }
            </DialogDescription>
        </DialogHeader>
    );
}