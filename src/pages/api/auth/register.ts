import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        return res.status(401).json({ error: "User already exists" });
    }

    const salt = crypto.randomBytes(16).toString("hex");

    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

    const user = await prisma.user.create({
        data: {
            email,
            password: hash,
            salt,
            name,
        },
    });

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
}