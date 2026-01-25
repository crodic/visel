import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { io, type Socket } from 'socket.io-client'

interface SocketProviderProps {
  userId?: string | null
  children: ReactNode
}

const SocketContext = createContext<Socket | null>(null)

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL as string

export const SocketProvider: React.FC<SocketProviderProps> = ({
  userId,
  children,
}) => {
  const socketRef = useRef<Socket | null>(null)
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    if (!userId) return

    const newSocket = io(SOCKET_URL, {
      query: { userId },
    })

    socketRef.current = newSocket
    Promise.resolve().then(() => setSocket(newSocket))

    return () => {
      newSocket.disconnect()
    }
  }, [userId])

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  )
}

export const useSocket = (): Socket | null => {
  return useContext(SocketContext)
}
