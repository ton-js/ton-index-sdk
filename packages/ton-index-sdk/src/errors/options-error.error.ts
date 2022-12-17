
export class OptionsError extends Error {

  constructor(message?: string) {
    super(message ?? 'Incorrect options provided');
  }

}
