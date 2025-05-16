import arcjet, {tokenBucket,shield,detectBot} from "@arcjet/node";

import dotenv from "dotenv";
dotenv.config();

//init arcjet
export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics:["ip.src"],
    rules: [
        //shield for protect the app from common attack e.g SQL injetction, XSS, CSRF attacks
        shield({mode:"LIVE"}),
        //detection for bot
        detectBot({
            mode:"LIVE",
            // block all bots execept search engines
            allow:[
                "CATEGORY:SEARCH_ENGINE"
            ]
        }),
        // rate limiting
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10,
        })
    ]
})