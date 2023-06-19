const app = require("./src/config/app");
const connectDB = require("./src/config/database");

require("dotenv").config();

connectDB(process.env.MONGO_URI)
  .then(() => {
    console.log(`MonogoDB running on ${process.env.MONGO_URI}`);
    app.listen(process.env.PORT, () => {
      console.log(
        `Server live at http://${process.env.HOST}:${process.env.PORT}`
      );
    });
  })
  .catch(console.log);
