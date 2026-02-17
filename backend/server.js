require("dotenv").config();   // Load environment variables first

const app = require("./app");
const connectDB = require("./src/db/db");

connectDB();

const PORT = process.env.PORT || 4000;
const BASE_URL = `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`Server is running at ${BASE_URL}`);
});
