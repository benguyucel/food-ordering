import Product from "../../../mongoose/Product"
import dbConnect from "../../../utils/dbConnect";
import { getToken } from "next-auth/jwt"

const handler = async (req, res) => {
    const secret = process.env.SECRET_JWT
    const token = await getToken({ req, secret })
    await dbConnect()
    const { method } = req
    if (method === "GET") {
        try {
            const products = await Product.find();
            res.status(200).json(products)
        } catch (error) {
            res.status(400).json(error)
        }
    }
    if (method === "POST") {
        try {
            const newProduct = await Product.create(req.body);
            res.status(200).json(newProduct);
        } catch (err) {
            console.log(err);
        }
    }
}
export default handler