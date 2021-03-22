import app from "./app";
import * as cors from 'cors';
const PORT = process.env.PORT || 8000;
app.use(cors());
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
