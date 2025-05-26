// app/routing-test/page.tsx
"use client";
import AddItemForm from "./AddItemForm";
import { useState } from "react";
import { fakeDB } from "@/lib/db";

export default function RoutingTestPage() {
    const [items, setItems] = useState(fakeDB);

    return (
        <div style={{ padding: 24 }}>
            <h1>✅Todo-List</h1>

            <ul>
                {items.map((item, i) => (
                <li key={i}>📌 {item}</li>
                ))}
            </ul>

            <hr style={{ margin: "20px 0" }} />

            <AddItemForm onAdd={setItems} />
        </div>
    );
}
