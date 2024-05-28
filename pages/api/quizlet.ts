import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";
const cloudscraper = require('cloudscraper').defaults({
    agentOptions: {
      ciphers: 'ECDHE-ECDSA-AES128-GCM-SHA256'
    },
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (typeof req.query.url !== "string" || new URL(req.query.url).host !== 'quizlet.com') {
        res.status(400).send("Invalid or no url provided");
        return;
    }

    const html = await cloudscraper.get(req.query.url);

    console.log(html);

    const dom = parse(html);

    const data = Array.from(dom.querySelectorAll('.TermText')).map((element, index) => {
        if (index % 2 === 0) {
          return element.innerText + '\t';
        } 
          return element.innerText + '\n';
        
    }).join('');

    res.status(200).send(data)
}



