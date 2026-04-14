import { useState, useEffect } from 'react'

export const useScrollReveal = (): ((node: HTMLElement | null) => void) => {
  const [ref, setRef] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        } else {
          entry.target.classList.remove('active')
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref])

  return setRef
}