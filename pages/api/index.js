import fs from 'fs';


export default function handler(req, res) {
    const image = fs.readFileSync("../../../../../public/images/Animals/Animals_1.jpg");
    res.setHeader('Content-Type', 'image/jpg')
    res.send(image);
}