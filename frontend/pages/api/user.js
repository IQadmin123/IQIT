export default async function (req, res){
    const {cookeis} = req

    const jwt = cookeis.OursiteJWT

    if(!jwt){
        return res.json({message: "Invalid token"})
    }
    return res.json({data: "Top secret data"})
}