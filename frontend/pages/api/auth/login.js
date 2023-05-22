import {sign} from "jsonwebtoken"
import {serialize} from "cookie"

const secret = process.env.SECRET

export default async function (req, re){
    const {username, password} = req.body

    if(username === "admin" && password === "admin@123"){
        const token = sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
                username: username,
            },
            secret
        )
        const serialised = serialize("OursiteJWT", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            samSite: "strict",
            maxAge: 60 * 60 * 24 * 30,
            path: "/"
        })

        res.setHeader("Set-Cookie", serialised)

        res.status(200).json({message: "Success"});
    }
    else{
        res.json({message: "Invalid credentials"});
    }
}