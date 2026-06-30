// src/hooks/useFetch.js
import { useState, useEffect, useCallback } from 'react'

/**
 * Generic fetch hook — wraps any async API call with loading/error/data state
 * @param {Function} fetchFn - async function that returns data
 * @param {any[]} deps - dependency array (re-fetches when deps change)
 */
export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const execute = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchFn()
      setData(result)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, deps) // eslint-disable-line

  useEffect(() => { execute() }, [execute])

  return { data, loading, error, refetch: execute }
}
