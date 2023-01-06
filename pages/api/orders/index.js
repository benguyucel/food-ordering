import Order from "../../../mongoose/Order"
import dbConnect from "../../../utils/dbConnect";

const handle = async (req, res) => {
    await dbConnect()
        
    const { method } = req
    if (method === "GET") {
        try {
            const orders = await Order.find();
            res.status(200).json(orders)
        } catch (error) {
            res.status(400).json(error)
        }
    }
    if (method === "POST") {
        try {
            const newOrder = await Order.create(req.body);
            res.status(201).json(newOrder);
        } catch (err) {
            console.log(err);
        }
    }
}
export default handle