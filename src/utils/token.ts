import { DataStoredInToken } from '@/ApplicationServices/interfaces/auth.interface';
import config from 'config';
import jwt from 'jsonwebtoken';

export const tokenToId = (token: string) => {
  const secretKey: string = config.get('secretKey');
  const verificationResponse = jwt.verify(token, secretKey) as DataStoredInToken;
  const userId = verificationResponse.id;

  return userId;
};
