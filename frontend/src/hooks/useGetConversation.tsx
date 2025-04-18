import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversations, setConversations] = useState<ConversationType[]>([])

    useEffect(() => {

        const getConversations = async() => {
            try {
    
                setLoading(true)
                const res = await fetch(`/api/messages/conversations`)
    
                const data = await res.json()
    
                if(data.error){
                    throw new Error(data.error)
                }

                setConversations(data)
    
            } catch (error:any) {
                console.log(error.message)
                toast.error(error.message)
            }finally{
                setLoading(false)
            }
        }

        getConversations()

    }, [])
    
    return {conversations, loading}
    
 }

 export default useGetConversations;