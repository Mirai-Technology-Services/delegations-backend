import { app } from "./app";
import { env } from "./env";

app.listen(env.port, (server) => {});
