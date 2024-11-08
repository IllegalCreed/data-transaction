import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsStrongPasswordConstraint } from 'src/common/validators/is-strong-password.validator';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStrongPasswordConstraint,
    });
  };
}
