import {
  useContext,
  useEffect,
  useState,
  createContext,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketProviderProps {
  children: ReactNode;
  id: string;
}

const SocketContext = createContext(null);

export const useSocket: () => void = () => {
  return useContext(SocketContext);
};

const SocketProvider: React.FC<SocketProviderProps> = ({ children, id }) => {
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    const newSocket: Socket = io("http://localhost:8000", { query: { id } });
    setSocket(newSocket);
    return (): any => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
