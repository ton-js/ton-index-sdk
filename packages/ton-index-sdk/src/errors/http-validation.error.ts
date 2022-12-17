
import type { ValidationErrorResponse } from '../model/validation-error.js';


export class HttpValidationError extends Error {

  constructor(errors?: ValidationErrorResponse[]) {

    if (errors) {
      super(
        // Building a single message from multiple errors
        errors.map(error =>
          `${error.type} at ${error.loc.join('.')} - ${error.msg}`
        ).join('\n')
      );

    } else {
      super('API request validation error');

    }

  }

}
