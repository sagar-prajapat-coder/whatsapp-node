import { errorHandler } from "../Middlewares/rules/errorhandler.js";
import User from "../Model/User.js";
import ResponseBuilder from "../utils/ResponseBuilder.js";

export const UserController = {
    search: async (req, res) => {
        const { search } = req.query;
        if (!search) {
            return ResponseBuilder.error("Query parameter is required", 400).build(res);
        }

        try {
            const users = await User.find({
                name: { $regex: search, $options: "i" },
            }).select("_id name");

            return ResponseBuilder.success(users, "User found", 200).build(res);
        } catch (error) {
            errorHandler(error, req, res);
        }
    }
}