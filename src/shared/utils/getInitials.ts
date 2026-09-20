const MAX_INITIALS = 2

// "Andrés Franco" → "AF"
export function getInitials(fullName: string): string {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, MAX_INITIALS)
    .map((namePart) => namePart.charAt(0).toUpperCase())
    .join('')
}
