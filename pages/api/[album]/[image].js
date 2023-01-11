import fs from 'fs';
import path from 'path';


export default function handler(req, res) {
    const image = fs.readFileSync(path.resolve(".", `public/images/${req.query.album}/${req.query.image}`));
    res.setHeader('Content-Type', 'image/jpg');
    res.send(image);
}