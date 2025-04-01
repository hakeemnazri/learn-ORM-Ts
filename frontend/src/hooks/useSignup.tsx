import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"

type SignupInputs = {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: "male" | "female"
}

 const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const signup = async(inputs : SignupInputs) => {
        try {
            setLoading(true)
            const res = await fetch(`/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs)
            })

            const data = await res.json()

            if(data.error){
                throw new Error(data.error)
            }
            setAuthUser(data)

        } catch (error:any) {
            console.log(error.message)
        }finally{
            setLoading(false)
        }
    }
    return {signup, loading}
 }

 export default useSignup;