/* eslint-disable import/no-anonymous-default-export */
import { format } from "date-fns";
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {

    try {
        if (req.method === 'GET') {
            const file_data = await fs.readFile('data.json', 'utf-8')
            const json_data = JSON.parse(file_data)

            res.status(200).json(json_data)
        }

        if (req.method === 'PUT') {
            const newData = {
                dateSaved: format(new Date(), 'MM/dd/yyyy'),
                data: JSON.parse(req.body)
            }

            await fs.writeFile('data.json', JSON.stringify(newData), 'utf-8');
            res.status(200)
        }

        res.end()
    }
    catch (error) {
        res.status(500).json({ error: 'Error reading data' })
    }
} 