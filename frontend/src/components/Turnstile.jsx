import { useEffect, useRef } from 'react'

// Cloudflare's "always passes" test site key — works in any browser.
// Replace with a real key by setting PUBLIC_TURNSTILE_SITE_KEY in Netlify env.
const DEFAULT_SITE_KEY = '1x00000000000000000000AA'

export default function Turnstile({ onToken }) {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)
  const onTokenRef = useRef(onToken)

  // Always use the latest callback without re-rendering the widget
  useEffect(() => {
    onTokenRef.current = onToken
  }, [onToken])

  useEffect(() => {
    const siteKey =
      import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || DEFAULT_SITE_KEY

    let mounted = true

    const render = () => {
      if (!mounted || !containerRef.current || !window.turnstile) return
      if (widgetIdRef.current !== null) return

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        appearance: 'always',
        theme: 'light',
        callback: (token) => onTokenRef.current?.(token),
        'expired-callback': () => onTokenRef.current?.(null),
        'error-callback': () => onTokenRef.current?.(null),
      })
    }

    if (window.turnstile) {
      render()
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval)
          render()
        }
      }, 200)
      // Stop polling after 10s
      setTimeout(() => clearInterval(interval), 10_000)
    }

    return () => {
      mounted = false
      if (widgetIdRef.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          // widget already gone
        }
      }
    }
  }, [])

  return (
    <div className="flex justify-center">
      <div ref={containerRef} />
    </div>
  )
}
