import { MinLength, IsEmail, IsDefined, IsNotEmpty, IsIn } from 'class-validator';
import { Transform } from 'class-transformer';
import { NormalizeEmail } from 'class-sanitizer';

import { UnacceptableFieldForRole } from '../../common/decorators/validations/UnacceptableFieldForRole';
import { RequiredFieldForRole } from '../../common/decorators/validations/RequiredFieldForRole';
import { IsSameAsFieldValue } from '../../common/decorators/validations/IsSameAsFieldValue';
import { EmailDto } from './email.dto';

export class SignupDto extends EmailDto {
  @Transform((value: string) => value.trim())
  @UnacceptableFieldForRole('caterer')
  @RequiredFieldForRole('customer', {
    maxLength: 40,
    matches: {
      value: /^[a-z'-]+$/i,
      message: 'Firstname can only contain letters and the characters (\'-)'
    }
  })
  firstname: string;

  @Transform((value: string) => value.trim())
  @UnacceptableFieldForRole('caterer')
  @RequiredFieldForRole('customer', {
    maxLength: 40,
    matches: {
      value: /^[a-z'-]+$/i,
      message: 'Lastname can only contain letters and the characters (\'-)'
    }
  })
  lastname: string;

  @Transform((value: string) => value.trim())
  @UnacceptableFieldForRole('customer')
  @RequiredFieldForRole('caterer', {
    fieldName: 'Business name',
    maxLength: 60,
    matches: {
      value: /^[a-z0-9 (),.'-]+$/i,
      message: 'Business name can only contain letters, spaces, and the characters (,.\'-)'
    }
  })
  businessName: string;

  @Transform((value: string) => value.trim())
  @RequiredFieldForRole('caterer', {
    fieldName: 'Business address',
    minLength: 5,
    maxLength: 255,
    matches: {
      value: /^[a-z0-9 (),.'-]+$/i,
      message: 'Business Address can only contain letters, spaces, and the characters (,.\'-)'
    }
  })
  address: string;

  @Transform((value: string) => value.trim())
  @RequiredFieldForRole('caterer', {
    fieldName: 'Business phone number',
    matches: {
      value: /^\+?(0)[7-9]([0-9]{9})$/,
      message: 'Business phone number must be in the format 080xxxxxxxx'
    }
  })
  phoneNo: string;

  @Transform((value: string) => value.trim())
  @IsDefined({
    message: 'User role must be specified'
  })
  @IsNotEmpty({
    message: 'Role cannot be left blank'
  })
  @IsIn(['caterer', 'customer'], {
    message: 'Role must be specified as either caterer or customer'
  })
  role: string;

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

  @IsSameAsFieldValue('password', {
    message: 'Passwords don\'t match'
  })
  // @Matches(
  //   /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  //   { message: 'password too weak' },
  // )
  passwordConfirm: string;
}
