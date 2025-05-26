import { getTodos } from './actions'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo'

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center' as const,
    marginBottom: '20px',
  },
};

export default async function Home() {
  console.log('📦 fetch 실행됨');

  // 서버 컴포넌트에서 데이터 가져오기
  const todos = await getTodos();

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>
        Todo List
      </h1>
      
      <AddTodo />
      <TodoList todos={todos}/>
    </main>
  )
}