import { Response, Request } from "express";
import jwt, { JsonWebTokenError, Secret } from "jsonwebtoken";
import "dotenv/config.js";
import { UserWithoutPassword } from "../interfaces/interfaces";
import pool from "../db";
import { RowDataPacket } from "mysql2";

export const getEntries = async (req: Request, res: Response | Record<string, any>) => {
    const accessToken = req.cookies.accessToken;

    if(!accessToken) return res.status(401).json({message: "Вы не авторизованы"});

    jwt.verify(accessToken, 
    process.env.ACCESS_TOKEN_SECRET as Secret, 
    {}, (err, decoded) => {
        if (err) return res.status(401).json({message: "Недействительный токен"});
        const user = decoded as UserWithoutPassword;
        pool.query("SELECT * FROM entries WHERE userId = ?", [user.userId], (err, results: RowDataPacket[]) => {
            if(err) return res.status(400)
            .json({message: "Ошибка при получении записей"});

            if(results.length === 0) return res.status(404)
            .json({message: "Записи не найдены"});

            res.status(200).json(results);
        });
    })
    // res.status(200).json({message: accessToken})
}

export const addEntrie = async (req: Request, res: Response | Record<string, any>) => {
    const accessToken = req.cookies.accessToken;
    const { entrieDatetime, entrieType, entrieClientName, entriePhone} = req.body;

    if(!accessToken) return res.status(401).json({message: "Вы не авторизованы"});

    jwt.verify(accessToken, 
    process.env.ACCESS_TOKEN_SECRET as Secret, 
    {}, (err, decoded) => {
        if(err) return res.status(401).json({message: "Недействительный токен"});

        const user = decoded as UserWithoutPassword;

        pool.query("INSERT INTO entries (entrieDatetime, entrieType, entrieClientName, entriePhone, userId) VALUES (?, ?, ?, ?, ?)", [entrieDatetime, entrieType, entrieClientName, entriePhone, user.userId], (err) => {
            if(err) return res.status(400).json({message: "Ошибка при добавлении записи"});

            res.status(200).json({message: "Запись добавлена"})
        });
    });
}

export const editEntrie = async (req: Request, res: Response | Record<string, any>) => {
    const { entrieDatetime, entrieType, entrieClientName, entriePhone} = req.body;
    const entrieId = req.params.id;
    const accessToken = req.cookies.accessToken;
    if(!accessToken) return res.status(401).json({message: "Вы не авторизованы"});

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret, {}, (err, decoded) => {
        const user = decoded as UserWithoutPassword;
        
        if(err) return res.status(401).json({message: "Недействительный токен"});
        pool.query(
            "UPDATE entries SET entrieDatetime = ? , entrieType = ?, entrieClientName = ?, entriePhone = ? WHERE entrieId = ? AND userId = ?",
            [entrieDatetime, entrieType, entrieClientName, entriePhone, entrieId, user.userId],
            (err) => {
                if(err) return res.status(400).json({message: "Ошибка при редактировании записи"});

                res.status(200).json({message: "Запись отредактирована"})
            }
        )
    });
}

export const deleteEntrie = async (req: Request, res: Response | Record<string, any>) => {
    const entrieId = req.params.id;
    const accessToken = req.cookies.accessToken;

    if(!accessToken) return res.status(401).json({message: "Вы не авторизованы"});
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as Secret, {}, (err, decoded) => {
        if(err) return res.status(401).json({message: "Недействительный токен"});
        
        const user = decoded as UserWithoutPassword;
        pool.query(
            "SELECT * FROM entries WHERE entrieId = ? AND userId = ?", 
            [entrieId, user.userId], 
            (err, result: RowDataPacket[]) => {
                if(err) return res.status(400)
                .json({message: "Ошибка при получении записи"});

                if(result.length === 0) return res.status(400)
                .json({message: "Запись не найдена"});

                pool.query("DELETE FROM entries WHERE entrieId = ? AND userId = ?", [entrieId,  user.userId], (err) => {
                    if(err) return res.status(400).json({message: "Ошибка при удалении записи"});
    
                    res.status(200).json({message: "Запись удалена"});
                });
            }
        );
        
    });
}