'use client';
// type ApiResponse = { id: string };
// const router = useRouter();

const GameCreate = () => {
  const handleCreateGame = async () => {
    // const response =
    await fetch('/api', { method: 'POST' });
    // const data = (await response.json()) as ApiResponse;
    // router.push(`${data.id}/startGame`);
  };
  return (
    <div>
      <h1>新しいゲームを作成</h1>
      <button onClick={handleCreateGame}>開始</button>
    </div>
  );
};

export default GameCreate;
