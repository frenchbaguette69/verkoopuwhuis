import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(title: string, id: number): string {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Verwijder speciale tekens
    .replace(/\s+/g, "-") // Vervang spaties door streepjes
    .replace(/-+/g, "-") // Vervang meerdere streepjes door één streepje
    .trim()

  return `${baseSlug}-${id}`
}

/**
 * Berekent de geschatte leestijd in minuten
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const textOnly = content.replace(/<[^>]*>/g, "") // Verwijder HTML tags
  const wordCount = textOnly.split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return Math.max(1, readingTime) // Minimaal 1 minuut
}

/**
 * Formatteert een datum in Nederlands formaat
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}
