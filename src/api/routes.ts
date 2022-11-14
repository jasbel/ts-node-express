import express from 'express';
const appRoutes = express();

import todoRoutes from "./todo/todo.routes";
import genericRoutes from "./generic/generic.routes";

appRoutes.use("/", genericRoutes);
appRoutes.use("/todos", todoRoutes);

export default appRoutes