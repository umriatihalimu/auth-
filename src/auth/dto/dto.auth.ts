import { IsEmail, IsString } from 'class-validator';

export class DtoAuth {
  @IsString()
  @IsEmail()
  username: string;

  @IsString()
  password: string;
}
