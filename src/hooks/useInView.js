"use client"

import { useEffect, useRef, useState } from "react"

const defaultOptions = {
  rootMargin: "0px 0px -80px 0px",
  threshold: 0.1,
  triggerOnce: true,
}

/**
 * Hook que añade la clase "visible" al elemento cuando entra en el viewport.
 * Útil para animaciones CSS (.animate-in-view.visible).
 * @param {Object} options - { rootMargin, threshold, triggerOnce }
 * @returns [ref, isVisible]
 */
export function useInView(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const { rootMargin, threshold, triggerOnce } = { ...defaultOptions, ...options }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible")
          setIsVisible(true)
          if (triggerOnce && el) observer.unobserve(el)
        }
      },
      { rootMargin, threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin, threshold, triggerOnce])

  return [ref, isVisible]
}
