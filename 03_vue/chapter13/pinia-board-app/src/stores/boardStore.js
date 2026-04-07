import { defineStore } from "pinia";

export const useBoardStore = defineStore("board", {
  state: () => ({
    boards: [
      {
        id: 1,
        title: "첫 번째 게시글",
        writer: "관리자",
        content: "Pinia 게시판 예제입니다.",
        createdAt: "2026-04-06",
      },
      {
        id: 2,
        title: "두 번째 게시글",
        writer: "홍길동",
        content: "Bootstrap으로 예쁘게 꾸며봅시다.",
        createdAt: "2026-04-06",
      },
    ],
    selectedBoard: null,
  }),

  getters: {
    boardCount(state) {
      return state.boards.length;
    },
    sortedBoards(state) {
      return [...state.boards].reverse();
    },
  },

  actions: {
    addBoard(board) {
      this.boards.push({
        id: Date.now(),
        title: board.title,
        writer: board.writer,
        content: board.content,
        createdAt: new Date().toISOString().slice(0, 10),
      });
    },
    deleteBoard(id) {
      this.boards = this.boards.filter((board) => board.id !== id);

      if (this.selectedBoard && this.selectedBoard.id === id) {
        this.selectedBoard = null;
      }
    },
    selectBoard(board) {
      this.selectedBoard = board;
    },
    clearSelectedBoard() {
      this.selectedBoard = null;
    },
  },
});
