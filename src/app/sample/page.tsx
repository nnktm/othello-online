// 'use client';

// import { useEffect, useState } from 'react';
// import styles from '../page.module.css';

// const initialBoard = [
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 1, 2, 0, 0, 0],
//   [0, 0, 0, 2, 1, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
// ];

// const Sample = () => {
//   const [board, setBoard] = useState<number[][]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     void handleFetchBoard();
//   }, []);

//   useEffect(() => {
//     void handleUpdateBoard();
//   }, [board]);

//   const handleFetchBoard = async () => {
//     const response = await fetch('/api');
//     const data = await response.json();
//     setBoard(data.board.board);
//   };
//   const handleUpdateBoard = async () => {
//     setIsLoading(true);
//     const response = await fetch('/api', {
//       method: 'PUT',
//       body: JSON.stringify({ board }),
//     });
//     setIsLoading(false);
//   };
//   const handleStoneClick = (x: number, y: number) => {
//     if (isLoading) return;
//     const newBoard = structuredClone(board);
//     newBoard[y][x] = 1;
//     setBoard(newBoard);
//   };
//   const handleResetBoard = async () => {
//     const response = await fetch('/api', {
//       method: 'PUT',
//       body: JSON.stringify({ board: initialBoard }),
//     });
//     void handleFetchBoard();
//   };

//   return (
//     <div>
//       <button onClick={handleResetBoard}>reset</button>
//       <div className={styles.board}>
//         {board.map((row, y) =>
//           row.map((color, x) => (
//             <div key={`${x}-${y}`} className={styles.cell} onClick={() => handleStoneClick(x, y)}>
//               <div
//                 className={styles.stone}
//                 style={{
//                   backgroundColor:
//                     color === 1 ? '#212b33' : color === 2 ? 'white' : color === 3 ? '#d86161' : '',
//                   width: color === 3 ? '30%' : '70%',
//                   height: color === 3 ? '30%' : '70%',
//                 }}
//               />
//             </div>
//           )),
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sample;
