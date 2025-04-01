import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

type AuthUserType = {
    id: String;
    fullName: string;
    email: string;
    profilePic: string;
    gender: string
}

const AuthContext = createContext<{
    authUser: AuthUserType | null,
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null >>,
    isLoading: boolean
}>({
    authUser : null,
    setAuthUser: () => {},
    isLoading: true
})

export const useAuthContext = () => {
    return useContext(AuthContext)
}

export const AuthContextProvider = ( {children} : {children: React.ReactNode}) => {
    const [authUser, setAuthUser] = useState <AuthUserType | null> (null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{

        const fetchUser = async() => {
            try {
                const res = await fetch(`/api/auth/me`)
                const data = await res.json()

                if(data.error){
                    throw new Error(data.error)
                }
                setAuthUser(data)

            } catch (error: any) {
                console.log(error.message)
            }finally{
                setIsLoading(false)
            }
        }
        fetchUser()
    }, [])

    return(
        <AuthContext.Provider
        value={{
            authUser,
            isLoading,
            setAuthUser,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}