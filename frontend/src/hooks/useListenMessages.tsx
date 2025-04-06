import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";


const useListenMessages = async() => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(()=> {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage])
        })

        return () => {          
            socket?.off("newMessage")
        }
    },[socket, messages, setMessages])
}

export default useListenMessages