import User from "../../../mongoose/User"
import { newPasswordSchema } from "../../../schema/newPasswordSchema"
import { profileSchema } from "../../../schema/profileSchema"
import dbConnect from "../../../utils/dbConnect"
import { validation } from "../../../utils/validate"
import bcrypt from 'bcryptjs'
const handler = async (req, res) => {

    await dbConnect()
    const { method, query } = req


    if (method === "GET") {
   
        try {
            const user = await User.findById(query.id)
            const { password, ...rest } = user._doc
            res.status(200).json(rest)
        } catch (error) {
            res.status(400).json({ message: "Error" })
        }
    }
    if (method === "PUT") {
        try {
            if (!req.body.password) {
                const { errors } = validation(profileSchema, req.body);
                if (errors) {
                    res.status(400).json({ errors })
                    return;
                }
                await User.findByIdAndUpdate(query.id, req.body, {
                    new: true
                })
                res.status(200).json({ message: "User Information Update" })
            } else {
                const { errors } = validation(newPasswordSchema, req.body);
                if (errors) {
                    res.status(400).json({ errors })
                    return;
                }
                req.body.password = await bcrypt.hash(req.body.password, 10);

                await User.findByIdAndUpdate(query.id, { password: req.body.password }, {
                    new: true
                })
                res.status(200).json({ message: "Password Changed" })
            }

        } catch (error) {
            res.status(400).json({ message: "Error" })
        }
    }

}

export default handler