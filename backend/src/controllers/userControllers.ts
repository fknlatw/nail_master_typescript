import { Request, Response } from "express"
import jwt, { Secret } from 'jsonwebtoken';
import pool from "../db";
import bcrypt from 'bcryptjs';
import "dotenv/config.js";
import { User, UserWithoutId } from "../interfaces/Interfaces";
import { RowDataPacket } from "mysql2";


const generateRefreshToken = (user: User): string => {
    const {userPassword, ...userWithoutUserPassword} = user;

    return jwt.sign(
        { ...userWithoutUserPassword }, 
        process.env.REFRESH_TOKEN_SECRET as Secret, 
        {expiresIn: '7d'}
    );
}

const generateAccessToken = (user: User): string => {
    const {userPassword, ...userWithoutUserPassword} = user;

    return jwt.sign(
        { ...userWithoutUserPassword }, 
        process.env.ACCESS_TOKEN_SECRET as Secret, 
        {expiresIn: '15m'}
    );
}

export const loginUser = async (req: Request, res: Response) => {
    const { userPassword, userName }: UserWithoutId = req.body;
    res.status(200).json({message: "login"})
}

export const registerUser = async (req: Request, res: Response) => {
    // const { userPassword, userName }: UserWithoutId = req.body;

    // const hashedUserPassword: string = await bcrypt.hash(userPassword, 5);

    // pool.query(
    //     "SELECT * FROM users WHERE userName = ?", 
    //     [userName],
    //     (err, results: RowDataPacket[]) => {
    //         if(err) return res.status(500)
    //         .json({message: "Ошибка на сервере"});
            
    //         if(results.length > 0) return res.status(400)
    //         .json({message: "Пользователь с таким именем уже существует"});

    //         // pool.query(
    //         //     "INSERT INTO users (userName, userPassword) VALUES (?, ?)",
    //         //     [userName, hashedUserPassword],
    //         //     (err) => {
    //         //         if(err) return res.status(500)
    //         //         .json({message: "Ошибка на сервере"});
                    
    //                 res.status(200).json({message: "Пользователь успешно зарегистрирован"});
    //         //     }
    //         // )
            
    //     }    
    // )
        
        
        
        
    
    
}