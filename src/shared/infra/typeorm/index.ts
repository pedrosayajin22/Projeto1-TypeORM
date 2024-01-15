import { createConnection } from 'typeorm';

async function initializeDatabase() {
  await createConnection(); // Crie uma nova conexão
}

initializeDatabase();

