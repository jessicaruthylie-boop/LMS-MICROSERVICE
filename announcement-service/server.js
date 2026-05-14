const express = require("express");
const cors = require("cors");

const announcementRoutes = require("./routes/announcementRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/announcements", announcementRoutes);

const PORT = 3005;

app.listen(PORT, () => {
  console.log(`Announcement Service running on port ${PORT}`);
});
