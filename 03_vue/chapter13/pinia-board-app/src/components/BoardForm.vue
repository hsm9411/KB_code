<template>
  <div class="card shadow-sm border-0 mb-4">
    <div class="card-header bg-primary text-white fw-bold">게시글 작성</div>

    <div class="card-body">
      <div class="mb-3">
        <label class="form-label">제목</label>
        <input
          v-model="title"
          type="text"
          class="form-control"
          placeholder="제목을 입력하세요"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">작성자</label>
        <input
          v-model="writer"
          type="text"
          class="form-control"
          placeholder="작성자명을 입력하세요"
        />
      </div>

      <div class="mb-3">
        <label class="form-label">내용</label>
        <textarea
          v-model="content"
          rows="4"
          class="form-control"
          placeholder="내용을 입력하세요"
        ></textarea>
      </div>

      <button class="btn btn-primary w-100" @click="submitBoard">
        게시글 등록
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useBoardStore } from "@/stores/boardStore";

const boardStore = useBoardStore();

const title = ref("");
const writer = ref("");
const content = ref("");

const submitBoard = () => {
  if (!title.value.trim() || !writer.value.trim() || !content.value.trim()) {
    alert("제목, 작성자, 내용을 모두 입력하세요.");
    return;
  }
  boardStore.addBoard({
    title: title.value,
    writer: writer.value,
    content: content.value,
  });

  // 입력창 초기화
  title.value = "";
  writer.value = "";
  content.value = "";
};
</script>

<style></style>
