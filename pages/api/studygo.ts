import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (typeof req.query.url !== "string") {
        res.status(400).send("Invalid or no url provided");
        return;
    }

    const url = new URL(req.query.url);

    if(url.host !== 'studygo.com') {
        res.status(400).send("Url must start with studygo.com");
        return;
    }

    const segments = url.pathname.split('/');

    const response = await fetch(`https://api.wrts.nl/api/v3/public/lists/` + segments[4]);

    const json = await response.json();

    if(!Array.isArray(json?.words_with_performance)) {
        res.status(400).send("Invalid study set or studygo has a new api");
        console.log(json)
        return;
    }

    const data = json.words_with_performance.map((word: any) => {
        return word.words.join('\t');
    }).join('\n');
    
    res.status(200).send(data);
}



