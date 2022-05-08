import { validate as validateUuid } from "uuid"
import Entity from "../entity/entity"
import UniqueEntityId from "../value-objects/unique-entity-id-vo"

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

describe("Entity Unit Tests", () => {
  it("shoud set props and id", () => {
    const arrange = { prop1: "value 1", prop2: 10 }
    const entity = new StubEntity(arrange)
    expect(entity.props).toStrictEqual(arrange)
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
    expect(validateUuid(entity.id)).toBeTruthy()
  })
  it("should accept a valid uuid", () => {
    const arrange = { prop1: "value 1", prop2: 10 }
    const uniqueEntityId = new UniqueEntityId()
    const entity = new StubEntity(arrange, uniqueEntityId)
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
    expect(entity.id).toBe(uniqueEntityId.value)
  })
  it("shoud convert an entity to a Javascript Object", () => {
    const arrange = { prop1: "value 1", prop2: 10 }
    const uniqueEntityId = new UniqueEntityId()
    const entity = new StubEntity(arrange, uniqueEntityId)
    expect(entity.toJSON()).toStrictEqual({
      id: entity.id,
      ...arrange,
    })
  })
})
