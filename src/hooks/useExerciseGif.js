import { useState, useEffect } from 'react'

const cache = new Map()

export function useExerciseGif(englishName) {
  const [gifUrl, setGifUrl] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!englishName) { setLoading(false); return }

    if (cache.has(englishName)) {
      setGifUrl(cache.get(englishName))
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)

    fetch(
      `https://wger.de/api/v2/exercise/search/?term=${encodeURIComponent(englishName)}&language=english&format=json`
    )
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        const match = data?.suggestions?.find((s) => s?.data?.image)
        const url = match ? `https://wger.de${match.data.image}` : null
        cache.set(englishName, url)
        if (!cancelled) setGifUrl(url)
      })
      .catch(() => { if (!cancelled) cache.set(englishName, null) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [englishName])

  return { gifUrl, loading, noKey: false }
}
