import express from "express";
import "./db/conexion.js";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";

const app = express();
// puerto para escuchar http requests
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
  console.log(`Servidor activo en puerto: ${PORT}`);
});
