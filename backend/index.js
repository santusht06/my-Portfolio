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
    origin: ["http://localhost:5173", "https://santusht.me"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 3001;

app.use("/api/v1", router);

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
  });
});

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
