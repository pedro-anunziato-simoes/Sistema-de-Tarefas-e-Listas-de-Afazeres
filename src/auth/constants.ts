import { SetMetadata } from '@nestjs/common';
export const jwtConstants = {
  secret: '12h4ig124h5vbjkh132v4523v523423vhj23hjl4v23hjl5vl346h7',
};


export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);