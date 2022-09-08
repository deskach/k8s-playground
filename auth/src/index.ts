import express from 'express';
import { json } from 'body-parser';

const PORT = 3000;
const app = express();
app.use(json());

app.get("/", (req: any, res: any) => res.send(200, {}));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
