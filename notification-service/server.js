const express = require("express");
const cors = require("cors");

const notificationRoutes = require("./routes/notificationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/notifications", notificationRoutes);

const PORT = 3006;

app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
