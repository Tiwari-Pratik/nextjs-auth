import { hashPassword } from "../../../utils/auth-utils";
import { connectToDataBase } from "../../../utils/db-utils";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid input-password should also be atleast 7 characters long",
      });
      return;
    }
    const client = await connectToDataBase();

    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({ message: "User exists already!" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
    });

    // console.log(result);
    res.status(201).json({ message: "Created user!" });
    client.close();
  }
};

export default handler;
