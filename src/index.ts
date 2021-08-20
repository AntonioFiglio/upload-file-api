import 'dotenv/config';
import APP from './app';
const { PORT } = process.env || 9000;

APP.listen(PORT, () =>
    console.log(`Server listening at http://localhost:${PORT}`)
);
