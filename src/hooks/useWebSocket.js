import { useEffect } from 'react'
import { socket } from '../services/websocket'

export const useWebSocket = (event, callback) => {
  useEffect(() => {
    socket.on(event, callback)
    return () => socket.off(event, callback)
  }, [event, callback])
}

// Note: Callers should wrap the callback with useCallback to prevent unnecessary re-runs
