function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}

export function scrollElementToStart(element: HTMLElement | null): void {
  element?.scrollIntoView({ block: 'start', behavior: getScrollBehavior() })
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}
