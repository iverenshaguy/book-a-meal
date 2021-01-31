import { IsEmail, IsDefined, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { NormalizeEmail } from 'class-sanitizer';

import { EmailDto } from './email.dto';

export class SigninDto extends EmailDto {
  @IsDefined({
    message: 'Password must be specified'
  })
  @IsNotEmpty({
    message: 'Password cannot be left blank'
  })
  password: string;
}
