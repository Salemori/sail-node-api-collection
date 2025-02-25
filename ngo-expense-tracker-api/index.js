const express = require("express");
const connectDb = require("./src/config/db.js");
const orphanageRouter = require("./src/routers/orphanageRoutes.js");
const userRouter =  require("./src/routers/userRoutes.js");
const expenseRouter = require("./src/routers/expenseRoutes.js");
const itemRouter = require("./src/routers/itemRoutes.js");

const app = express();
app.use(express.json());

const port = 8000;

connectDb();

app.use("/api/v1/orphanage", orphanageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/item", itemRouter)
app.use("/api/v1/expense", expenseRouter)

app.listen(port, () => {
    console.log(`NGO expense tracker listening at http://localhost:${port}`)
});
