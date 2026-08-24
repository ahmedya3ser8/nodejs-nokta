import 'dotenv/config';

import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT;

connectDB();

app.listen(process.env.PORT || 3000, () => {
  console.log(`server running on http://localhost:${process.env.PORT}`);
})

