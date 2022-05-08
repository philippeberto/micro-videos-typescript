import { validate as validadeUUID } from 'uuid'
import UniqueEntityId from './unique-entity-id-vo'
import InvalidUuidError from '../../errors/invalid-uuid.error'

//two options to clear mocks here instead of doing it at jest config

// beforeEach(() => {
//   jest.clearAllMocks()
// })

const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate')
// beforeEach(()=>validateSpy.mockClear())

describe('UniqueEntityId unit tests', () => {
  it('should throw error when uuid is invalid', () => {
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError())
    expect(validateSpy).toHaveBeenCalled()
  })
  it('should accept a uuid passed in the constructor', () => {
    const uuid = '1a629f6b-be72-4185-aeb2-e09c6f0eb147'
    const vobject = new UniqueEntityId(uuid)
    expect(vobject.id).toBe(uuid)
    expect(validateSpy).toHaveBeenCalled()
  })
  it('should generate a uuid', () => {
    const vobject = new UniqueEntityId()
    expect(validadeUUID(vobject.value)).toBeTruthy()
    expect(validateSpy).toHaveBeenCalled()
  })
})
