import { IsEmail, IsDefined, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { NormalizeEmail } from 'class-sanitizer';

export class EmailDto {
  @Transform((value: string) => value.trim())
  @NormalizeEmail(true)
  @IsDefined({
    message: 'Email must be specified'
  })
  @IsNotEmpty({
    message: 'Email cannot be left blank'
  })
  @IsEmail({}, {
    message: 'Email is invalid'
  })
  email: string;
}
