const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

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

    const fakeId = Date.now().toString();

    res.json({
      message: "Date request received 🚀",
      link: `http://localhost:5173/card/${fakeId}`,
      data: {
        id: fakeId,
        askerName,
        askerEmail,
        receiverName,
        receiverEmail,
        theme,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET DATE REQUEST BY ID
app.get("/api/date-request/:id", async (req, res) => {
  try {
    const { id } = req.params;

    res.json({
      _id: id,
      askerName: "Jess",
      receiverName: "Alex",
      theme: "romantic",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// RESPOND TO DATE REQUEST
app.post("/api/date-request/:id/respond", async (req, res) => {
  try {
    const { id } = req.params;
    const { chosenDate, foodVibe } = req.body;

    res.json({
      message: "Response saved 🚀",
      id,
      chosenDate,
      foodVibe,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});