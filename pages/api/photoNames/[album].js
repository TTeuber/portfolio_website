import fs from "fs";

export default function handler(req, res) {
    const list = fs.readdirSync(`/Users/tylerteuber/WebstormProjects/website_test/public/images/${req.query.album}`);

    res.status(200).json({names: list});
}