import User from "../../../mongoose/User"
import { registerSchema } from "../../../schema/registerSchema"
import dbConnect from "../../../utils/dbConnect"
import { validation } from "../../../utils/validate"
import bcrypt from 'bcryptjs'

const handler = async (req, res) => {
    await dbConnect()
    const { body, method } = req
    const user = await User.findOne({ email: req.body.email })

    if (method === "POST") {
        const { errors } = validation(registerSchema, body);
        if (errors) {
            res.status(400).json({ errors })
            return;
        }
        if (user) {
            res.status(409).json({ message: "User already exist" })
            return;
        }
        try {
            let { confirnPassword, ...restUser } = body
            const newUser = await new User(restUser)
            let salt = bcrypt.genSaltSync(10);
            newUser.password = await bcrypt.hash(body.password, salt);
            await newUser.save()
            res.status(200).json(newUser)
        } catch (error) {
            console.log(error);
        }
    }

}

export default handler