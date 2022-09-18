import { observer } from 'mobx-react-lite'
import { useStore } from '../stores'
import { Todo } from '../stores/TodoStore'
import styles from './TodoList.module.css'

const TodoList = () => {
  const { todos } = useStore()
  const handleToggleTodo = (item: Todo) => () => {
    todos.toggle(item)
  }

  const handleRemoveTodo = (item: Todo) => () => {
    todos.remove(item)
  }

  return (
    <ul className={styles['todo-list']}>
      {todos.items.map((item) => (
        <li key={item.id}>
          <label
            htmlFor={String(item.id)}
            className={item.isDone ? styles.done : ''}
          >
            {item.title}
          </label>

          <button
            onClick={handleRemoveTodo(item)}
            className={[styles.remove, item.isDone && styles.done].join(' ')}
          >
            remove
          </button>

          <button onClick={handleToggleTodo(item)}>
            <input
              type='checkbox'
              id={String(item.id)}
              readOnly
              tabIndex={-1}
            />
          </button>
        </li>
      ))}
    </ul>
  )
}

export default observer(TodoList)
