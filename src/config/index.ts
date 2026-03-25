import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET || 'secret123',
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET || 'refreshsecret123',
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
};
console.log("Loaded Access Secret:", process.env.JWT_ACCESS_SECRET);