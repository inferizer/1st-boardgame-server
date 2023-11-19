require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

const rateLimitMiddelware = require("./middlewares/rate-limit");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const authRoute = require("./routes/auth-route");
const productRoute = require("./routes/product-route");
const adminRoute = require("./routes/admin-route");
const apiRoute = require("./routes/api-route");
const profileRoute = require("./routes/profile-route");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(rateLimitMiddelware);
app.use(express.json());

app.use("/api", apiRoute);
app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/admin", adminRoute);
app.use("/product", productRoute);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server run on PORT:${PORT}`));
