// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { nanoid } from 'nanoid';
import validator from 'validator';

type Data = {
    shortenedUrl: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    res.status(200).json({ shortenedUrl: nanoid(10) });
}
