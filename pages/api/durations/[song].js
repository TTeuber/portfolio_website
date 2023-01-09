import fs from "fs";

export default function handler(req, res) {
    const audio = <audio src={"/Users/tylerteuber/WebstormProjects/website_test/public/audio/" + "Call_Me.mp3"}/>;
    const duration = audio.duration;
    console.log(duration);
    // const list = fs.readdirSync(`/Users/tylerteuber/WebstormProjects/website_test/public/images/${req.query.album}`);
    //
    res.status(200).json({duration});
}