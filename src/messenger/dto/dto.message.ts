import { IsNotEmpty, IsString } from 'class-validator';

export class DtoMessage {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  recipient: string;
}
