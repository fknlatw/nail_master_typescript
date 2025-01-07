import { Request, Response } from "express";
import "dotenv/config.js";
import { User, UserWithoutPassword } from "../interfaces/interfaces";
import { generateAccessToken, generateRefreshToken } from "./userControllers";
import pool from "../db";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";

export const tokenRefresh = async (req: Request, res: Response | Record<string, any>) => {
    const refreshToken: string = req.cookies?.refreshToken;

    if(!refreshToken) return res.status(401)
    .json({message: "Вы не авторизованы"});

    pool.query(
        "SELECT users.* FROM tokens JOIN users ON users.userId = tokens.userId WHERE tokens.token = ?", 
        [refreshToken],
        (err, results: RowDataPacket[]) => {
            if(err) return res.status(500).json({message: "Ошибка на сервере"});
            if (results.length === 0) return res.status(401).json({message: "Токен недействителен"});
            const user = results[0] as User;

            const accessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);

            pool.query(
                "UPDATE tokens SET token = ? WHERE userId = ?",
                [newRefreshToken, user.userId],
                (err) => {
                    if(err) return res.status(500).json({message: "Ошибка на сервере"});

                    res.cookie("accessToken", accessToken, {
                        httpOnly: true, secure: true,
                        maxAge: 15 * 60 * 1000
                    });
                    
                    res.cookie("refreshToken", newRefreshToken, {
                        httpOnly: true, secure: true,
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    });

                    res.status(200).json({message: {accessToken, newRefreshToken}})
                }
            )
        }
    );

    // res.status(200).json({message: "hello"})
}