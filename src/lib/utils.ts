import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export  function getOrdinalSuffix(position: number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = position % 100;
  return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
}
export function isSubsequence(seq: string, word: string) {
  let i = 0;
  for (let j = 0; j < word.length; j++) {
      if (seq[i] === word[j]) i++;
      if (i === seq.length) return true;
  }
  return false;
}