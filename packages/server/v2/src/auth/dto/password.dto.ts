import { IsDefined, IsNotEmpty, MinLength } from 'class-validator';

export class PasswordDto {
  @IsDefined({
    message: 'Password must be specified'
  })
  @IsNotEmpty({
    message: 'Password cannot be left blank'
  })
  @MinLength(8, {
    message: 'Password must be at least 8 characters'
  })
  // @Matches(
  //   /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  //   { message: 'password too weak' },
  // )
  password: string;
}
