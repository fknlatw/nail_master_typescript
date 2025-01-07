import { Response, Request } from "express";

export const getEntries = async (req: Request, res: Response) => {
    res.status(200).json({message: "getEntries"})
}

export