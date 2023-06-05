import { IsNotEmpty, IsString } from 'class-validator';

export class DtoMessages {
  @IsString()
  @IsNotEmpty()
  name: string;
}
