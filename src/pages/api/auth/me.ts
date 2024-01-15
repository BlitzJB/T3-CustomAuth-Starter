import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type User = {
    id: string;
    email: string;
    name: string;
    password?: string;
    salt?: string;
    createdAt: Date;
    updatedAt: Date;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const sessionToken = req.cookies.token;

    const session = await prisma.session.findUnique({
        where: {
            token: sessionToken,
        },
        include: {
            user: true,
        },
    })

    
    if (!session) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = session?.user as User;
    delete user.password;
    delete user.salt;

    return res.status(200).json(user);
}