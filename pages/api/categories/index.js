import Category from "../../../mongoose/Category"
import dbConnect from "../../../utils/dbConnect";

const handler = async (req, res) => {
    await dbConnect()
    const { method } = req
    if (method === "GET") {
        try {
            const categories = await Category.find({});
            res.status(200).json(categories)
        } catch (error) {
            res.status(400).json(error)
        }
    }
    if (method === "POST") {
        try {
            const category = await Category.create(req.body)
            res.status(200).json(category);
        } catch (error) {
            console.log(error)
        }
    }

}
export default handler