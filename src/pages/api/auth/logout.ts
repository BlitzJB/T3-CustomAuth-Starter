import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const sessionToken = req.cookies.token;

    const session = await prisma.session.delete({
        where: {
            token: sessionToken,
        },
    })

    res.setHeader(
        "Set-Cookie",
        `token=; path=/; HttpOnly; SameSite=Strict; Expires=${new Date(
            Date.now() - 1000 * 60 * 60 * 24 * 30
        ).toUTCString()}`
    );

    return res.status(200).json({ success: true });

}