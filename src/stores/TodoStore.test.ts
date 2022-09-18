import TodoStore from "./TodoStore";

let todos = TodoStore()

describe("TodoList", () => {
    beforeEach(() => {
        todos = TodoStore()
    })

    it("adds todos", () => {
        todos.add("My todo")
        expect(todos.items.length).toBe(1)
        expect(todos.items.find(item => item.title === "My todo")).toBeDefined()
    })

    it("removes a todo", () => {
        todos.add("Test")  //because we are clearing store after every test
        todos.remove(todos.items[0])
        expect(todos.items.length).toBe(0)
    })

    it("toggles a todo", () => {
        todos.add("Test")
        todos.toggle(todos.items[0])
        expect(todos.items[0].isDone).toBe(true)
        expect(todos.unfinishedTodos.length).toBe(0)
    })

    it("has unfinished todos", () => {
        todos.add("Test")
        expect(todos.unfinishedTodos.length).toBe(1)
    })

    it("cannot add an empty todos", () => {
        todos.add("")
        expect(todos.items.length).toBe(0)
    })

    it("cannot add a todos with less than 3 characters", () => {
        todos.add("12")
        expect(todos.items.length).toBe(0)
    })

    it("can add todo with 3 characters", () => {
        todos.add("123")
        expect(todos.items.length).toBe(1)
    })
})