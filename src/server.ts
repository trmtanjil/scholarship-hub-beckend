import { Server } from 'http';
import app from './app';
import config from './config';
import { prisma } from './lib/prisma';

let server: Server;

process.on('uncaughtException', async (err) => {
  console.error('😈 uncaughtException detected, shutting down...', err);
  await prisma.$disconnect();
  process.exit(1);
});

async function main() {
  try {
    await prisma.$connect();
    console.log('🛢️ Database connected successfully');
    
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.error(err);
  }
}

main();

process.on('unhandledRejection', async (err) => {
  console.error('😈 unhandledRejection detected, shutting down...', err);
  if (server) {
    server.close(async () => {
      await prisma.$disconnect();
      process.exit(1);
    });
  } else {
    await prisma.$disconnect();
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  console.log('😈 SIGTERM received, shutting down gracefully...');
  if (server) {
    server.close(async () => {
      await prisma.$disconnect();
    });
  } else {
    await prisma.$disconnect();
  }
});

process.on('SIGINT', async () => {
  console.log('😈 SIGINT received, shutting down gracefully...');
  if (server) {
    server.close(async () => {
      await prisma.$disconnect();
    });
  } else {
    await prisma.$disconnect();
  }
});
