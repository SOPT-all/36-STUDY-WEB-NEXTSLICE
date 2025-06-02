import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../../styles/edit.module.css";

export default function EditPost() {
    const router = useRouter(); // URL에서 slug 가져오기
    const { slug } = router.query;
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSave = () => {
        alert("Post saved!");
        router.push(`/blog/${slug}`);
    };

    return (
        <div className={styles.container}>
            <h1>[Edit Post] {slug}</h1> 
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <br />
            <button onClick={handleSave}>변경사항 저장</button>
        </div>
    );
}