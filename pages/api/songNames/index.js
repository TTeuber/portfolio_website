import fs from "fs";

export default function handler(req, res) {
    const list = fs.readdirSync(`/Users/tylerteuber/WebstormProjects/website_test/public/audio`);

    res.status(200).json({names: list});
}