// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: (string | undefined)[]) {
  return twMerge(clsx(inputs))
}
