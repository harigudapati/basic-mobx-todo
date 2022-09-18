import { action, makeAutoObservable, makeObservable, observable } from "mobx";

export interface Todo {
    id: number;
    title: string;
    isDone: boolean;
}

const TodoStore = () => makeAutoObservable({
    items: [] as Todo[],

    add(title: string) {
        if (title.length < 3) {
            return
        }

        this.items.push({
            id: Date.now(),
            title: title,
            isDone: false
        })
    },

    toggle(todo: Todo) {
        todo.isDone = !todo.isDone
    },

    remove(todo: Todo) {
        this.items = this.items.filter(item => item.id !== todo.id)
    },

    get unfinishedTodos() {
        return this.items.filter((item: Todo) => !item.isDone)
    }
})



/* CLASS BASED IMPLEMENTATION */

// class TodoStore {
//     items: Todo[] = [];

//     constructor() {
//         makeObservable(this, {
//             items: observable,
//             add: action,
//             toggle: action,
//             remove: action
//         })
//     }

//     add(title: string) {
//         if (title.length < 3) {
//             return
//         }

//         this.items.push({
//             id: Date.now(),
//             title: title,
//             isDone: false
//         })
//     }


//     toggle(todo: Todo) {
//         todo.isDone = !todo.isDone
//     }

//     remove(todo: Todo) {
//         this.items = this.items.filter(t => t.id !== todo.id)
//     }
// }

export default TodoStore