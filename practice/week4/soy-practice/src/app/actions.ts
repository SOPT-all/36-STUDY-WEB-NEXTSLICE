'use server'

import { revalidatePath } from 'next/cache'

export type Todo = {
  id: string
  text: string
  completed: boolean
}

// 목 데이터 
let todos: Todo[] = [
  { id: '1', text: '너무 자고싶어', completed: false },
  { id: '2', text: '합세 화이팅~..', completed: false },
]

// 할일 목록 
export async function getTodos() {
  return todos
}

// 새 할 일 추가
export async function addTodo(formData: FormData) {
  const text = formData.get('text') as string
  const date = Date.now().toString();
  
  const newTodo: Todo = {
    id: date,
    text: text.trim(),
    completed: false,
  }

  todos.push(newTodo)
  
  // 캐시 무효화 - '/' 경로의 데이터를 갱신
  revalidatePath('/')

  return { text }
}

// 할 일 완료 상태 토글하기
export async function toggleTodo(formData: FormData) {
  const id = formData.get('id') as string
  
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed }: todo
  )

  // console.log('📝 현재 todos:', todos) // toggle 테스트 

  // 캐시 무효화
  revalidatePath('/')
}