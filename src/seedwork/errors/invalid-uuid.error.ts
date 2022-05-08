export default class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || 'ID must be a valid UUID v4.')
    this.name = 'Invalid UUID error.'
  }
}
