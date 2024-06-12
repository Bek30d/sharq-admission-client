import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const unformatDate = (value: string) => {
  return value.replace(/\D+/g, ""); // Remove all non-digit characters
};

export const formatPassportField = (value: string) => {
  const cleanedValue = value.replace(/\W+/g, ""); // Remove all non-word characters
  const part1 = cleanedValue.slice(0, 2);
  const part2 = cleanedValue.slice(2, 9);

  let formattedValue = part1;
  if (part2) formattedValue += ` ${part2}`;

  return formattedValue.toUpperCase();
};

export const unformatPassportField = (value: string) => {
  return value.replace(/\W+/g, ""); // Remove all non-word characters
};


export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false; // Return false if code is running on server-side
  const token = localStorage.getItem('access_token');
  return token !== null;
};
