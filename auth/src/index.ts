import express from 'express';
import {json} from 'body-parser';
import {currentUser} from './requests/currentUser';

const PORT = 3000;
const app = express();
app.use(json());

currentUser(app);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
