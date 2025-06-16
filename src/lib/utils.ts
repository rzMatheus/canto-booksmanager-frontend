import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {toast} from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const showToast = (message: string, description: string) => toast(
    message, {
      description: description,
      action: {
        label: "OK",
        onClick: () => {}
      }})
