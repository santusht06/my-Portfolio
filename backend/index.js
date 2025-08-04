const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require("dotenv");
config();
const router = require("./routes/SendMail.route");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
const PORT = process.env.PORT || 3001;

app.use("/api/v1", router);

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log("SERVER STARTED ON PORT = ", PORT);
    });
  } catch (error) {
    console.log("error in starting server = ", error);
  }
};

startServer();
