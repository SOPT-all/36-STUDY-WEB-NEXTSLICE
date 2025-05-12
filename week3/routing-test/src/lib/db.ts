// 간단한 아이템 타입 정의
export type Item = {
  id: number;
  name: string;
};

// fakeDB: 메모리 내 데이터베이스 역할
let items: Item[] = [
  { id: 1, name: '첫 번째 아이템' },
  { id: 2, name: '두 번째 아이템' },
];

// 전체 아이템 조회
export function getItems(): Item[] {
  return items;
}

// 아이템 추가
export function addItem(name: string): Item {
  const newItem: Item = {
    id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
    name,
  };
  items.push(newItem);
  return newItem;
}

// 아이템 삭제
export function deleteItem(id: number): boolean {
  const prevLength = items.length;
  items = items.filter((item) => item.id !== id);
  return items.length < prevLength;
}

// 아이템 단일 조회
export function getItem(id: number): Item | undefined {
  return items.find((item) => item.id === id);
} 