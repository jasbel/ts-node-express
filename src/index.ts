import { app } from "./app";
import {createConnection} from "./database";

// createConnection();
// dblow.test();

app.listen(app.get("port"), () => console.log("server corriendo en puerto http://localhost:" + app.get("port")));
