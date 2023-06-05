import { IsString } from 'class-validator';

export class DtoUser {
  @IsString()
  name: string;
}
