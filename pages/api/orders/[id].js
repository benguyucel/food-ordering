import Order from "../../../mongoose/Order";
import dbConnect from "../../../utils/dbConnect";
const handle = async (req, res) => {

    dbConnect();
    const { method, query } = req
    const id = query.id
    if (method === "GET") {
        try {
            const order = await Order.findById(id)
            res.status(200).json(order)


        } catch (error) {
            console.log(error)
        }
    }
    if (method === "DELETE") {
        try {
            await Order.findByIdAndDelete(id)
            res.status(200).json({ message: "Order delete" })
        } catch (error) {
            console.log(error)
        }
    }
    if (method === "PUT") {

        try {
            const order = await Order.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(200).json(order);

        } catch (err) {
            console.log(err);
        }
    }
}
export default handle