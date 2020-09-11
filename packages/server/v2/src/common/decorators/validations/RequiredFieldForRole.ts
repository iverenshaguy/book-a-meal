import { registerDecorator, ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, ValidationArguments } from 'class-validator';
import { capitalize } from '../../utils';

@ValidatorConstraint({ name: 'requiredFieldForRole', async: false })
export class RequiredFieldForRoleConstraint implements ValidatorConstraintInterface {

    public validate(value: any, args: ValidationArguments) {
      const [signupType, customValidationOptions, propertyName] = args.constraints;
      const { minLength, maxLength, matches } = customValidationOptions;
      const role = (args.object as any).role;
      const valueLength = value ? value.length : 0;

      if (role && role === signupType) {
        if (!propertyName) {
          return false;
        }

        if (!value) {
          return false;
        }

        if (minLength && maxLength && (valueLength < minLength || valueLength > maxLength)) {
          return false;
        }

        if (minLength && valueLength < minLength ) {
          return false;
        }

        if (maxLength && valueLength > maxLength ) {
          return false;
        }

        if (matches && !matches.value.test(value) ) {
          return false;
        }
      }
    
      return true;
    }

    public defaultMessage(args: ValidationArguments) {
      const [signupType, customValidationOptions, propertyName] = args.constraints;
      const { minLength, maxLength, matches, fieldName } = customValidationOptions;
      const role = (args.object as any).role;
      const field = fieldName || capitalize(propertyName);
      const value = args.object[propertyName];
      const valueLength = value ? value.length : 0;

      if (role && role === signupType) {
        if (!propertyName) {
          return `${field} must be specified`;
        }

        if (!value) {
          return `${field} cannot be left blank`;
        }

        if (minLength && maxLength && (valueLength < minLength || valueLength > maxLength)) {
          return `${field} must be between ${minLength} and ${maxLength} characters`;
        }

        if (minLength && valueLength < minLength ) {
          return `${field} must not be less than ${minLength} characters`;
        }

        if (maxLength && valueLength > maxLength ) {
          return `${field} must not be more than ${maxLength} characters`;
        }

        if (matches && !matches.value.test(value) ) {
          return matches.message;
        }
      }
    
      return '';
    }

}

export function RequiredFieldForRole(type: string, options, validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "RequiredFieldForRole",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [type, options, propertyName],
            options: validationOptions,
            validator: RequiredFieldForRoleConstraint
        });
   };
}
