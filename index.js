import { dbConnection } from "./DB/dbConnection.js";
import { app } from "./app.js";
// path: "./.env",
// dotenv.config();

const PORT = process.env.PORT || 8000;

dbConnection()
  .then(function () {
    console.log("database connected successfully");
    app.listen(PORT, function () {
      console.log(`serving at ${PORT}`);
    });
  })
  .catch(function (error) {
    console.log("failed to connect to the database ", error);
    process.exit(1);
  });
