import ValueObject from "./value-object"

class StubValueObject extends ValueObject {}

describe("ValueObject Unit Test", () => {
  it("should set value", () => {
    let vo = new StubValueObject("string value")
    expect(vo.value).toBe("string value")
    vo = new StubValueObject({ prop1: "value1" })
    expect(vo.value).toStrictEqual({ prop1: "value1" })
  })
  it("should convert to string", () => {
    const date = new Date()
    const arrange = [
      // { received: null, expected: "null" },
      // { received: undefined, expected: "undefined" },
      { received: "", expected: "" },
      { received: "fake test", expected: "fake test" },
      { received: 0, expected: "0" },
      { received: 1, expected: "1" },
      { received: 5, expected: "5" },
      { received: true, expected: "true" },
      { received: false, expected: "false" },
      { received: date, expected: date.toString() },
      { received: { prop1: "value 1" }, expected: JSON.stringify({ prop1: "value 1" }) },
    ]
    arrange.forEach((item) => {
      const vobject = new StubValueObject(item.received)
      expect(`${vobject}`).toBe(item.expected)
    })
  })
  it("should be immutable", () => {
    const vobject = new StubValueObject({ prop1: { deepProp1: "value 1" } })
    expect(() => (vobject.value.prop1.deepProp1 = "value 2")).toThrow()
  })
})
