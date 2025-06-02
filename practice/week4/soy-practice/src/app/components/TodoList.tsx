'use client'

import { toggleTodo } from '../actions'
import type { Todo } from '../actions'

type TodoListProps = {
    todos: Todo[]
}

export default function TodoList({ todos }: TodoListProps) {

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        await toggleTodo(formData)
    }

    return (
        <ul style={styles.list}>
            {todos.map((todo) => (
                <li key={todo.id} style={styles.item}>
                <div style={styles.leftSide}>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="id" value={todo.id} />
                        <button type="submit">{todo.completed ? '✅' : '❌'}</button>
                    </form>
                    <span style={todo.completed ? styles.completed : undefined}>
                        {todo.text}
                    </span>
                </div>
                </li>
            ))}
        </ul>
    )
}

const styles = {
    list: {
        listStyle: 'none',
        padding: 0,
    },
    item: {
        padding: '10px 0',
        borderBottom: '1px solid #eee',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    completed: {
        textDecoration: 'line-through',
        color: '#999',
    },
    leftSide: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
};
