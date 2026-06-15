const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const DateRequest = require("./models/DateRequest");

dotenv.config();

const connectDB = require("./connectDB");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hibemydate.netlify.app",
    ],
  })
);

app.use(express.json());

// Connect DB
connectDB();

// TEST ROUTE
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend working 🚀" });
});

// CREATE DATE REQUEST
app.post("/api/date-request", async (req, res) => {
  try {
    const {
      askerName,
      askerEmail,
      receiverName,
      receiverEmail,
      theme,
    } = req.body;

    const dateRequest = await DateRequest.create({
      askerName,
      askerEmail,
      receiverName,
      receiverEmail,
      theme,
    });

    res.json({
      message: "Date request received 🚀",
      link: `https://hibemydate.netlify.app/card/${dateRequest._id}`,
      data: dateRequest,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET DATE REQUEST BY ID
app.post("/api/date-request/:id/respond", async (req, res) => {
  try {
    const { chosenDate, foodVibe } = req.body;

    const dateRequest = await DateRequest.findByIdAndUpdate(
      req.params.id,
      { chosenDate, foodVibe, responded: true },
      { new: true }
    );

    if (!dateRequest) return res.status(404).json({ error: "Not found" });

    res.json({ message: "Response saved 💕", data: dateRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});