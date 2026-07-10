import { env } from "./config/env.js";
import { connectMongo } from "./db/mongoose.js";
import { app } from "./app.js";

await connectMongo();

app.listen(env.PORT, () => {
  console.log(`Zenivra backend listening on http://localhost:${env.PORT}`);
});
