import { registerDecorator, ValidatorConstraint, ValidatorConstraintInterface, ValidationOptions, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'isSameAsFieldValue', async: false })
export class IsSameAsFieldValueConstraint implements ValidatorConstraintInterface {

    public validate(value: any, args: ValidationArguments) {
      const [similarField] = args.constraints;
      const similarValue = (args.object as any)[similarField];

      if (value !== similarValue) {
        return false;
      }
    
      return true;
    }

}

export function IsSameAsFieldValue(similarProperty: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "IsSameAsFieldValue",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [similarProperty],
      options: validationOptions,
      validator: IsSameAsFieldValueConstraint
    });
  };
}
