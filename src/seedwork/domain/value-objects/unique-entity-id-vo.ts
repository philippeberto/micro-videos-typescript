import InvalidUuidError from '../../errors/invalid-uuid.error'
import { v4 as uuidv4 } from 'uuid'
import { validate as uuidValidate } from 'uuid'
import ValueObject from '../value-objects/value-object'

export default class UniqueEntityId extends ValueObject<string> {
  constructor(readonly id?: string) {
    super(id || uuidv4())
    this.validate()
  }

  private validate() {
    const idValid = uuidValidate(this.value)
    if (!idValid) throw new InvalidUuidError()
  }
}
