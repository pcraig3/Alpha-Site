import { parse } from "json2csv";
import { writeFile } from "fs";

export function generateCSV(client) {
  try {
    const users = client
      .collection("users")
      .find({})
      .toArray((err, data) => {
        if (err) throw err;

        console.log(data);
        //
        // const fields = ["cuid"];
        // const opts = { fields };

        try {
          const csvData = parse(data);
          console.log(csvData);

          writeFile("users.csv", csvData, (err) => {
            if (err) throw err;
            console.log(err);
          });
        } catch (e) {
          console.log(e);
        }
      });
  } catch (e) {
    console.log(e);
  }
}
