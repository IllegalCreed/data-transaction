import * as crypto from 'crypto';
import { jwtVerify, SignJWT } from 'jose';
import { v4 as uuidv4 } from 'uuid';

export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex'); // 生成随机盐
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        resolve(`${salt}:${derivedKey.toString('hex')}`); // 返回盐和哈希的组合
      }
    });
  });
}

export function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':'); // 从存储的哈希中提取盐和密钥
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        // 比较生成的哈希与存储的哈希是否匹配
        resolve(key === derivedKey.toString('hex'));
      }
    });
  });
}

export async function generateToken<T>(
  raw: T,
  secret: string,
  expirationTime: string = '24h',
): Promise<string> {
  const jwt = await new SignJWT({ raw })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt() // 设置签发时间（iat）
    .setExpirationTime(expirationTime) // 设置过期时间（exp）
    .setJti(uuidv4()) // 设置唯一标识符（jti）
    .sign(new TextEncoder().encode(secret));

  return jwt;
}

export async function verifyToken<T>(
  token: string,
  secret: string,
): Promise<T | null> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
    );
    return payload.raw as T;
  } catch {
    return null;
  }
}

export function generateRandomCode(): string {
  const randomNumber = Math.floor(Math.random() * 1000000);
  return randomNumber.toString().padStart(6, '0');
}
