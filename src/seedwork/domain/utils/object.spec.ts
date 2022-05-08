import { deepFreeze } from "../utils/object"

describe("obect Unit Tests", () => {
  it("should be a immutable object", () => {
    const str = deepFreeze("a")
    expect(typeof str).toBe("string")
    let boolean = deepFreeze(true)
    expect(typeof boolean).toBe("boolean")
    boolean = deepFreeze(false)
    expect(typeof boolean).toBe("boolean")
    const obj = deepFreeze({ date: new Date(), prop1: { deepProp1: "value 1" } })
    expect(() => (obj.date = "other value")).toThrow()
    expect(() => (obj.prop1.deepProp1 = "value 2")).toThrow()
    expect(obj.date).toBeInstanceOf(Date)
  })
})
