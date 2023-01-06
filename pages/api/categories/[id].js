import Category from "../../../mongoose/Category"
import dbConnect from "../../../utils/dbConnect"

const handler = async (req, res) => {
    await dbConnect()
    const { method, query } = req
    const id = query.id
    if (method === "GET") {
        try {
            const category = await Category.findById(id);
            res.status(200).json(category);
        } catch (err) {
            console.log(err);
        }
    }
    if (method === "DELETE") {
        try {
            const category = await Category.findByIdAndRemove(id);
            res.status(200).json({ message: category })
        } catch (error) {
            res.status(200).json({ message: error })
        }
    }
}

export default handler;