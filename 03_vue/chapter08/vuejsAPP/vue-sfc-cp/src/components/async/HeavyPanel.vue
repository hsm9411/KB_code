<template>
  <div class="heavy-panel">
    <h2>비동기 컴포넌트 로딩 완료</h2>
    <p>이 영역은 defineAsyncComponent로 불러온 컴포넌트입니다.</p>
  </div>
</template>

<script>
export default {
  name: "HeavyPanel",
};
</script>

<style scoped>
.heavy-panel {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f8f8f8;
}
</style>
