const { parse } = require("json2csv");
const fs = require("fs");
const { MongoClient } = require("mongodb");

async function generateCSV() {
  const client = new MongoClient(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    const users = await client
      .db(process.env.MONGO_DB)
      .collection("users")
      .find({})
      .toArray();
    try {
      const csvData = parse(users);
      console.log(csvData);

      fs.writeFile("users.csv", csvData, (err) => {
        if (err) {
          throw err;
        }
      });
      console.log("Done writing file");
    } catch (e) {
      console.log("fs write error: " + e);
    }
    console.log("Done everything.");
  } catch (e) {
    console.log("Mongo error: " + e);
  } finally {
    await client.close();
  }
}

generateCSV()
  .catch(console.error)
  .finally(() => {
    console.log("Done!");
  });
