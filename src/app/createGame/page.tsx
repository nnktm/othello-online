'use client';

import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const router = useRouter();

  async function handleCreate() {
    const response = await fetch('/api/gameStart', { method: 'POST' });
    const data = await response.json();
    router.push(`/gameStart/${data.id}`);
  }

  return (
    <div>
      <h1>新しいゲームを作成</h1>
      <button onClick={handleCreate}>開始</button>
    </div>
  );
}
