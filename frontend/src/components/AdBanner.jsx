import { useEffect, useRef } from 'react'

export default function AdBanner() {
  const adRef = useRef(null)

  useEffect(() => {
    try {
      if (adRef.current && adRef.current.offsetWidth > 0) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (e) {
      // adsbygoogle already initialized
    }
  }, [])

  return (
    <div ref={adRef} className="w-full my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6225160369861502"
        data-ad-slot="4387572495"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
