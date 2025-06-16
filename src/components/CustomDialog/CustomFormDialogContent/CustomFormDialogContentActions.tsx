import {DialogClose, DialogFooter} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

interface CustomFormDialogContentActionsProps {
    cancelActionText: string,
    saveActionText: string,
    onCancelAction?: () => void,
    onSaveAction?: () => void,
}

export function CustomFormDialogContentActions({cancelActionText, saveActionText, onCancelAction}:CustomFormDialogContentActionsProps){
    return (
    <DialogFooter>
        <DialogClose asChild>
            <Button variant="outline" onClick={onCancelAction}>{cancelActionText}</Button>
        </DialogClose>
        <Button type="submit">{saveActionText}</Button>
    </DialogFooter>
    );
}