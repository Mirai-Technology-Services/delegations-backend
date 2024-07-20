import { app } from "./app";

app.listen(3000);

console.log(
  `🚚 Delegations server is running at ${app.server?.hostname}:${app.server?.port}`,
);
