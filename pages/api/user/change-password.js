import { getSession } from "next-auth/client";
import { connectToDataBase } from "../../../utils/db-utils";
import { hashPassword, verifyPassword } from "../../../utils/auth-utils";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not Authenticated!" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDataBase();
  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    client.cllose();
    return;
  }

  const currentPassword = user.password;
  const isValidPassword = await verifyPassword(oldPassword, currentPassword);

  if (!isValidPassword) {
    res.status(403).json({ message: "Invalid Password" });
    client.close();
    return;
  }

  const newHashedPassword = await hashPassword(newPassword);
  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: newHashedPassword } }
  );

  client.close();
  res.status(200).json({ message: "Password Updated" });
};
export default handler;
