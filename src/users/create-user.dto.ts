import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString({
    message: 'Le nom d’utilisateur doit être une chaîne de caractères',
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty({ message: 'Le nom d’utilisateur est obligatoire' })
  username: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail({}, { message: 'Adresse email invalide' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty({ message: 'L’email est obligatoire' })
  email: string;
}
