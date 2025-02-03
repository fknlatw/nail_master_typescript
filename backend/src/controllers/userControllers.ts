import { Request, Response } from "express"
import jwt, { Secret } from 'jsonwebtoken';
import pool from "../db";
import bcrypt from 'bcryptjs';
import "dotenv/config.js";
import { User, UserWithoutId, UserWithoutPassword } from "../interfaces/interfaces";
import { RowDataPacket } from "mysql2";

export const generateRefreshToken = (user: User): string => {
    const {userPassword, ...userWithoutUserPassword} = user;

    return jwt.sign(
        { ...userWithoutUserPassword }, 
        process.env.REFRESH_TOKEN_SECRET as Secret, 
        {expiresIn: '7d'}
    );
}

export const generateAccessToken = (user: User): string => {
    const {userPassword, ...userWithoutUserPassword} = user;

    return jwt.sign(
        { ...userWithoutUserPassword }, 
        process.env.ACCESS_TOKEN_SECRET as Secret, 
        {expiresIn: '15m'}
    );
}

export const loginUser = async (req: Request, res: Response) => {
    const { userPassword, userName }: UserWithoutId = req.body;

    pool.query(
        "SELECT * FROM users WHERE userName = ?", 
        [userName], 
        async (err, results: RowDataPacket[]) => {
            if(err) return res.status(500)
            .json({message: "Ошибка на сервере"});

            if(results.length === 0) return res.status(400)
            .json({message: "Пользователь с таким именем не существует"});

            const user = results[0] as User;

            const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);

            if(!passwordMatch) return res.status(400)
            .json({message: "Неверный пароль"});

            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);

            // pool.query(
            //     "INSERT INTO tokens (token, userId) VALUES (?, ?)", 
            //     [refreshToken, user.userId], 
            //     (err) => {
            //         if(err) return res.status(500)
            //         .json({message: "Ошибка на сервере"});

                    res.cookie("refreshToken", refreshToken, {
                        httpOnly: true, 
                        secure: true, 
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    });

                    res.cookie("accessToken", accessToken, {
                        httpOnly: true,
                        secure: true,
                        maxAge: 15 * 60 * 1000
                    });
                    res.status(200).json({message: "Выполнен вход"});
                // }
            // );
        }
    );
}

export const registerUser = async (req: Request, res: Response) => {
    const { userPassword, userName }: UserWithoutId = req.body;

    const hashedUserPassword: string = await bcrypt.hash(userPassword, 5);

    pool.query(
        "SELECT * FROM users WHERE userName = ?", 
        [userName],
        (err, results: RowDataPacket[]) => {
            if(err) return res.status(500)
            .json({message: "Ошибка на сервере"});
            
            if(results.length > 0) return res.status(400)
            .json({message: "Пользователь с таким именем уже существует"});

            // pool.query(
            //     "INSERT INTO users (userName, userPassword) VALUES (?, ?)",
            //     [userName, hashedUserPassword],
            //     (err) => {
            //         if(err) return res.status(500)
            //         .json({message: "Ошибка на сервере"});
                    
                    res.status(200).json({message: "Пользователь успешно зарегистрирован"});
            //     }
            // );
        }    
    );
}

export const logoutUser = async (req: Request, res: Response | Record<string, any>) => {
    const refreshToken: string = req.cookies?.refreshToken;
    if(!refreshToken) return res.status(400).json({message: "Необходимо авторизоваться"});
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    
    const decoded = jwt.decode(refreshToken, {}) as UserWithoutPassword | null;
    
    pool.query(
        "DELETE FROM tokens WHERE userId = ?", 
        [decoded?.userId], 
        (err) => {
            if(err) return res.status(500)
            .json({message: "Ошибка на сервере"});

            res.status(200).json({message: "Выполнен выход"});
        }
    );
}