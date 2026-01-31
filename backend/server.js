const app = require('./app');
const connectDB = require('./src/db/db');
connectDB();

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
