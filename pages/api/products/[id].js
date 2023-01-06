import Product from "../../../mongoose/Product";
import dbConnect from "../../../utils/dbConnect";

const handle = async (req, res) => {
    dbConnect();
    const { method, query } = req
    const id = query.id
    if (method === "GET") {
        try {
            const product = await Product.findById(id)
            res.status(200).json(product)
        } catch (error) {
            console.log(error)
        }
    }
    if (method === "DELETE") {

        try {
            await Product.findByIdAndDelete(id)
            res.status(200).json({ message: "Product delete" })
        } catch (error) {
            console.log(error)
        }
    }
}
export default handle