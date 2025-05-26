// app/routing-test/AddItemForm.tsx
"use client";

import { useState, useTransition } from "react";
import { addItem } from "@/actions/addItem";

export default function AddItemForm({
    onAdd,
    }: {
        onAdd: (items: string[]) => void;
    }) {
        const [input, setInput] = useState("");
        const [isPending, startTransition] = useTransition();

        const handleSubmit = () => {
            startTransition(async () => {
            const updated = await addItem(input);
            onAdd(updated);
            setInput("");
        });
    };

    return (
        <div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="추가할 항목 입력"
            />
            <button onClick={handleSubmit} disabled={isPending}>
                {isPending ? "추가 중..." : "추가"}
            </button>
        </div>
    );
}