const { parse } = require("json2csv");
const fs = require("fs");
const { MongoClient } = require("mongodb");

async function generateCSV() {
  const client = new MongoClient("mongodb://root:example@localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    await client
      .db("alphasite")
      .collection("users")
      .find({})
      .toArray((err, data) => {
        if (err) throw err;

        // console.log(data);

        try {
          const csvData = parse(data);
          // console.log(csvData);

          fs.writeFile("users.csv", csvData, (err) => {
            if (err) {
              throw err;
            }
          });
          // console.log("Done writing file");
        } catch (e) {
          console.log("fs write error: " + e);
        }
      });
    // console.log("Done everything.");
  } catch (e) {
    console.log("Mongo error: " + e);
  } finally {
    //await client.close();
  }
}

generateCSV()
  .catch(console.error)
  .finally(() => {
    console.log("Done!");
  });
