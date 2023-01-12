import axios from "axios";
export const fetchSSR = async (url, req) => {
    try {
        return await axios.get(url, { headers: { 'Cookie': req.headers.cookie } })
    } catch (error) {
        return error
    }
}