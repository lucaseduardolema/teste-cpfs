import 'dotenv/config';
import app from './App';
import connectToDatabase from './models/Connections';

const PORT = process.env.API_PORT ?? 3010;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));
  })
  .catch((error) => {
    console.log('Connection with database generated an error:\r\n');
    console.error(error);
    console.log('\r\nServer initialization cancelled');
    process.exit(0);
  });
