import fs from 'fs';


export default function handler(req, res) {
    const image = fs.readFileSync(`/Users/tylerteuber/WebstormProjects/website_test/public/images/${req.query.album}/${req.query.image}`);
    res.setHeader('Content-Type', 'image/jpg');
    res.send(image);
}