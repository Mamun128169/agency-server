const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5050;

// Connect to MongoDB and start server
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
