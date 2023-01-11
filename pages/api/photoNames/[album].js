import fs from "fs";
import path from 'path';

export default function handler(req, res) {
    const list = fs.readdirSync(path.resolve(".", `public/images/${req.query.album}`));

    res.status(200).json({names: list});
}