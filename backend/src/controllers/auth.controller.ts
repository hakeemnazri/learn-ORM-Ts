import { Request, Response } from "express"
import prisma from "../db/prisma.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"

export const signup = async (req: Request, res: Response): Promise<void>  => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body; 

        if (!fullName || !username || !password || !confirmPassword || !gender) {
            res.status(400).json({ message: "All fields are required" })
            return
        }

        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords do not match" })
            return
        }

        const user = await prisma.user.findUnique({where: {username} })

        if (user) {
            res.status(400).json({ message: "User already exists" })
            return
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = await prisma.user.create({
            data:{
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === "male" ? boyProfilePic : girlProfilePic
            }
        })

        if(newUser){

            generateToken(newUser.id, res)

            res.status(200).json({
                id: newUser.id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic
            })

        }else{
            res.status(500).json({ message: "Invalid user data" })
        }

    } catch (error: any) {
        console.log("Error at signup controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const {username, password} = req.body;
        const user = await prisma.user.findUnique({ where: { username }})
        
        if(!user){
            res.status(404).json({ message: "Invalid Credentials" })
            return
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password)

        if(!isPasswordCorrect){
            res.status(400).json({ error: "Invalid credentials "})
            return
        }

        generateToken(user.id, res)

        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error : any) {
        console.log("Error at login controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const logout = async (req: Request, res: Response): Promise<void> => {

    try {
        res.cookie("jwt", "", { maxAge: 0});
        res.status(200).json({ message: "Logout successful" })
    } catch (error: any) {
        console.log("Error at logout controller", error.message)
        res.status(500).json({ message: "Internal server error" })

    }
}

export const getMe = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await prisma.user.findUnique({where : {id: req.user.id}})

        if(!user){
            res.status(404).json({ error: "User not found" })
            return
        }

        res.json({
            id: user.id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic 
        });
        
    } catch (error: any) {
        console.log("Error at getMe controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}