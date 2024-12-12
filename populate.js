import "dotenv/config";
import { connectDB } from "./db/connect.js";
import { Product } from "./models/product.js";
import { readFile } from "fs/promises";

const jsonProducts = JSON.parse(
  await readFile(new URL("./products.json", import.meta.url))
);

const populate = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
      .then(() => console.log("Connected to the database"))
      .catch((error) => console.error(error));

    await Product.deleteMany();

    await Product.insertMany(jsonProducts);

    console.log("Data imported successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

populate();
