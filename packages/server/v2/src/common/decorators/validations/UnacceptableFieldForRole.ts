import { registerDecorator, ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'unacceptableFieldForRole', async: false })
export class UnacceptableFieldForRoleConstraint implements ValidatorConstraintInterface {

    public validate(value: any, args: ValidationArguments) {
        const [signupType] = args.constraints;
        const role = (args.object as any).role;
        if (role && role === signupType && value) {
          return false;
        }
      
        return true;
    }

    public defaultMessage(args: ValidationArguments) {
      return 'Unacceptable Field';
    }

}

export function UnacceptableFieldForRole(type: string, validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "UnacceptableFieldForRole",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [type],
            options: validationOptions,
            validator: UnacceptableFieldForRoleConstraint
        });
   };
}
