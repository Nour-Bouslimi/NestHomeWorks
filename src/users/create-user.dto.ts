import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail({}, { message: 'Adresse email invalide' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty({ message: 'email est obligatoire' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Le mot de passe est obligatoire' })
  password: string;
  @IsString()
  @IsIn(['admin', 'client'], {
    message: 'Le rôle doit être soit "admin" soit "client"',
  })
  @IsNotEmpty({ message: 'Le rôle est obligatoire' })
  role: 'admin' | 'client';
}
