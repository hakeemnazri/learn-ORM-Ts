import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import useConversation from "../zustand/useConversation"

const useGetMessages = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation} = useConversation()

    useEffect(() => {

        const getMessages = async() => {
            try {
                if(!selectedConversation) return
                setLoading(true)
                setMessages([])
                const res = await fetch(`/api/messages/${selectedConversation.id}`)
    
                const data = await res.json()
    
                if(data.error){
                    throw new Error(data.error)
                }

                setMessages(data)
    
            } catch (error:any) {
                console.log(error.message)
                toast.error(error.message)
            }finally{
                setLoading(false)
            }
        }

        getMessages()

    }, [selectedConversation, setMessages])
    
    return {messages, loading}
    
 }

 export default useGetMessages;