/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line prettier/prettier

// eslint-disable-next-line prettier/prettier
import { CreateUserDto } from "./create-user.dto";
import { PartialType } from '@nestjs/mapped-types';
export class UpdateUserDto extends PartialType(CreateUserDto){}


