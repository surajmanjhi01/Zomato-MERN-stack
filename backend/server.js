const app = require('./app');
const connectDB = require('./src/db/db');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
