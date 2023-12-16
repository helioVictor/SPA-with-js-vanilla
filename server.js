import express from 'express';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5080;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use('/static', express.static(resolve(__dirname, 'frontend', 'static')));

app.get('/*', (_, res) => {
  res.sendFile(resolve('frontend', 'index.html'));
});

app.listen(PORT, () => console.log('running...'));
