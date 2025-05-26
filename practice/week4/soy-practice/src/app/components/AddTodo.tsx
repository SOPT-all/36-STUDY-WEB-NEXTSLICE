'use client'

import { FormEvent, useState } from 'react';
import { addTodo } from '../actions'

export default function AddTodo() {
    const [text, setText] = useState('') 

    // 서버 액션을 사용하여 폼 제출
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const result = await addTodo(formData);

        if (result) {
            alert(`${result.text} 추가됨`)
            setText('') 
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    name="text"
                    value={text}
                    placeholder="할 일을 입력하세요"
                    onChange={(e) => setText(e.target.value)}
                    style={styles.input}
                />
                
                <button
                    type="submit"
                    style={{...styles.button,}}
                >
                    할 일 추가
                </button>
            </form>
        </div>
    )
}

const styles = {
    form: {
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '10px',
    },
    input: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '8px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};