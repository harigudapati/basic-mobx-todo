import TodoInput from './Todo/TodoInput'
import TodoList from './Todo/TodoList'
import styles from './App.module.css'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { autorun, reaction, runInAction } from 'mobx'
import { useStore } from './stores'
import { useEffect } from 'react'

const App = () => {
  const { todos } = useStore()
  /* Using useState() */

  // const [appUI] = useState(() =>
  //   observable({
  //     todosVisible: true,
  //     toggleTodosVisibility() {
  //       this.todosVisible = !this.todosVisible
  //     },
  //   })
  // )

  useEffect(() => {
    /* autorun implementation */
    // const disposeAutoRun = autorun(
    //   () => {
    //     console.log(todos.items.length)
    //     throw new Error('custom error')
    //   },
    //   {
    //     delay: 1000,
    //     onError: (err) => console.log(err.message),
    //   }
    // )
    // return () => {
    //   disposeAutoRun()
    // }

    const disposeReaction = reaction(
      () => {
        return {
          length: todos.items.length,
          unfinishedTodos: todos.unfinishedTodos,
        }
      },

      /* implementation of newvalue and oldvalue */
      (newvalue, oldvalue) => {
        console.log(newvalue, oldvalue)
      },
      // ({ length, unfinishedTodos }) => {
      //   console.log(length, unfinishedTodos)
      // },
      {
        delay: 1000,
        onError: (err) => console.log(err.message),
      }
    )
    return () => {
      disposeReaction()
    }
  }, [])

  const appUI = useLocalObservable(() => ({
    todosVisible: true,
    loading: false,
    toggleTodosVisibility() {
      this.todosVisible = !this.todosVisible
    },

    /* async await in action */

    // async toggleTodosVisibility() {
    //   this.loading = true
    //   await new Promise((resolve) =>
    //     setTimeout(() => resolve(void 0), 1000)
    //   ).then(() => {
    //     runInAction(() => {
    //       this.loading = false
    //       this.todosVisible = !this.todosVisible
    //     })
    //   })
    // },
  }))

  return (
    <div className='app'>
      <TodoInput />
      <div className={styles['todo-list-wrapper']}>
        <h2 onClick={appUI.toggleTodosVisibility}>
          <span>{appUI.todosVisible ? '-' : '+'}</span>
          Todos (unfinished {todos.unfinishedTodos.length})
        </h2>
        <TodoList />
      </div>
    </div>
  )
}

export default observer(App)
