import { MongoClient } from "mongodb";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let client;
let clientPromise;

client = new MongoClient(process.env.MONGODB_URI, options);
clientPromise = client.connect();

export default clientPromise;
