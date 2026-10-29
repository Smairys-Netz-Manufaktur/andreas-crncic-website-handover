'use client'

import { useEffect, useRef } from 'react'
import { trackEvent, getFromPage } from '@/lib/plausible'
import { ANALYTICS_EVENTS } from '@/config/analytics'

type ScrollDepth = '25%' | '50%' | '75%' | '100%'

/**
 * Hook to track scroll depth milestones.
 * Fires analytics events when user scrolls past 25%, 50%, 75%, and 100% of page.
 * Each milestone only fires once per page load.
 */
export function useScrollDepthTracking() {
  const trackedDepths = useRef<Set<ScrollDepth>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      
      // Avoid division by zero on short pages
      if (scrollHeight <= 0) return
      
      const scrollPercent = (window.scrollY / scrollHeight) * 100

      const milestones: { threshold: number; depth: ScrollDepth }[] = [
        { threshold: 25, depth: '25%' },
        { threshold: 50, depth: '50%' },
        { threshold: 75, depth: '75%' },
        { threshold: 100, depth: '100%' },
      ]

      for (const { threshold, depth } of milestones) {
        if (scrollPercent >= threshold && !trackedDepths.current.has(depth)) {
          trackedDepths.current.add(depth)
          trackEvent(ANALYTICS_EVENTS.ENGAGEMENT.SCROLL_DEPTH, {
            depth,
            from_page: getFromPage(),
          })
        }
      }
    }

    // Throttle scroll events for performance
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [])
}

/**
 * Component wrapper to add scroll tracking to any page.
 * Just include this component anywhere in your page.
 */
export function ScrollDepthTracker() {
  useScrollDepthTracking()
  return null
}
