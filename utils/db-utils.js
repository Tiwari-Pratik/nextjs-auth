import { MongoClient } from "mongodb";

export const connectToDataBase = async () => {
  const client = await MongoClient.connectToDataBase(
    "mongodb+srv://pratik:picachhoo1@cluster0.pbdmdok.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );

  return client;
};
