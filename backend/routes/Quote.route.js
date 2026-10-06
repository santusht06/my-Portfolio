const express = require("express");
const router = express.Router();

router.get("/quote", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    if (!response.ok) {
      return res.status(response.status).json({ success: false, error: "ZenQuotes responded with status " + response.status });
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return res.status(200).json({
        success: true,
        quote: data[0].q,
        author: data[0].a,
      });
    }
    return res.status(500).json({ success: false, error: "Invalid response format from ZenQuotes" });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
