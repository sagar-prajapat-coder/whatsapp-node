import dotenv from "dotenv";
dotenv.config();
import connectDB from "./src/config/db.js";
import { server } from "./src/app.js";

connectDB(process.env.MONGO_URL)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
 