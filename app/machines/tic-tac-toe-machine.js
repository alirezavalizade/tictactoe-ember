import { createMachine, assign, raise } from 'xstate';

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const initialState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winningLine: [],
};

export const ticTacToeMachine = createMachine(
  {
    id: 'ticTacToe',
    initial: 'playing',
    context: {
      ...initialState,
      round: 1,
      xWins: 0,
      oWins: 0,
    },
    states: {
      playing: {
        on: {
          MOVE: {
            actions: ['setBoard', raise({ type: 'CHECK' })],
            guard: 'isSquareEmpty',
          },
          CHECK: [
            {
              target: 'finished',
              actions: ['setWinner', 'setWinningLine'],
              guard: 'isWinningMove',
            },
            { target: 'draw', guard: 'isDraw' },
            { target: 'playing', actions: 'switchPlayer' },
          ],
        },
      },
      draw: {
        on: {
          RESTART: {
            target: 'playing',
            actions: ['reset', 'increaseRound'],
          },
        },
      },
      finished: {
        on: {
          RESTART: {
            target: 'playing',
            actions: ['reset', 'increaseRound'],
          },
        },
      },
    },
  },
  {
    actions: {
      setBoard: assign(({ context, event }) => {
        const newBoard = [...context.board];
        newBoard[event.index] = context.currentPlayer;

        return {
          board: newBoard,
        };
      }),
      switchPlayer: assign({
        currentPlayer({ context }) {
          return context.currentPlayer === 'X' ? 'O' : 'X';
        },
      }),
      reset: assign(({ context }) => ({
        ...context,
        ...initialState,
      })),
      increaseRound: assign({
        round({ context: { round } }) {
          return round + 1;
        },
      }),
      setWinner: assign(
        ({ context: { currentPlayer, xWins, oWins, board } }) => {
          const winningLine = winningLines.find((line) =>
            line.every((i) => board[i] === currentPlayer),
          );

          return {
            winningLine,
            xWins: currentPlayer === 'X' ? xWins + 1 : xWins,
            oWins: currentPlayer === 'O' ? oWins + 1 : oWins,
          };
        },
      ),
    },
    guards: {
      isSquareEmpty({ context: { board }, event: { index } }) {
        return board[index] === null;
      },
      isWinningMove: ({ context: { board, currentPlayer } }) => {
        return winningLines.some((line) =>
          line.every((i) => board[i] === currentPlayer),
        );
      },
      isDraw: ({ context }) => {
        const { board } = context;
        return board.every((square) => square !== null);
      },
    },
  },
);
