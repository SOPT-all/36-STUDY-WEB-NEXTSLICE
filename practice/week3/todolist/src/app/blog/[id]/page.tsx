export default function DetailPage({ params }: { params: { id: string } }) {
    
    return (
        <main className="p-10">
            {params.id === '1' && (
                <h1 className="text-2xl font-semibold">
                    오늘은 app router에 대해서 설명할게요
                </h1>
            )}
            {params.id === '2' && (
                <h1 className="text-2xl font-semibold">난 실습 뭐하냐</h1>
            )}
        </main>
    );
}
