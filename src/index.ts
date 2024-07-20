import pc from "picocolors";
import { app } from "./app";
const appVersion = require("../package.json").version;

const startTime = performance.now();
process.stdout.write("\x1Bc\n"); // clear console

app.listen(3000, (server) => {
  const duration = performance.now() - startTime;
  console.log(
    `🚚 ${pc.green(`${pc.bold("Delegations server")} v${appVersion}`)} ${pc.gray("started in")} ${pc.bold(duration.toFixed(2))} ms\n`,
  );
  console.log(
    `${pc.green(" ➜ ")} ${pc.bold("Server")}:   ${pc.cyan(String(server.url))}`,
  );
  console.log(
    `${pc.green(" ➜ ")} ${pc.bold("Database")}: ${pc.cyan("database")}`,
    "\n",
  );
});
