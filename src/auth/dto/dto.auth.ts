import { IsEmail, IsString } from 'class-validator';

export class DtoAuth {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
