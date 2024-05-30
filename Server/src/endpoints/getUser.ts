import { Request, Response } from "express";

import { user } from "../models/modules.js";

export async function getUser(req: Request, res: Response) {
    let User = await user.findById(req.params.userId).exec();

    if (!User) {
        res.status(404).send("User NOT FOUND");
        return;
    }

    res.json(User);
}
