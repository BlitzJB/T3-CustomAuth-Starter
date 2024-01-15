import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, "sha512").toString("hex");   
    
    if (user.password !== hash) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = crypto.randomUUID();

    const session = await prisma.session.create({
        data: {
            token,
            userId: user.id,
        },
    });

    res.setHeader(
        "Set-Cookie",
        `token=${session.token}; path=/; HttpOnly; SameSite=Strict; Expires=${new Date(
            Date.now() + 1000 * 60 * 60 * 24 * 30
        ).toUTCString()}`
    );
    
    return res.status(200).json({ success: true });
};