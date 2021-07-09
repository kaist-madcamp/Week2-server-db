import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  try {
    return bcrypt.hash(password, 10);
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException();
  }
};

export const checkPassword = async (
  password: string,
  uglyPassword: string,
): Promise<boolean> => {
  try {
    return bcrypt.compare(password, uglyPassword);
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException();
  }
};
