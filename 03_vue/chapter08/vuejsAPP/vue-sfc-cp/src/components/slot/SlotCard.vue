<template>
  <div class="card">
    <header class="card-header">
      <slot name="header">기본 헤더</slot>
    </header>

    <main class="card-body">
      <slot>기본 내용</slot>
      <slot>기본 내용</slot>
    </main>

    <footer class="card-footer">
      <slot name="footer">기본 푸터</slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "SlotCard",
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 16px;
  margin-bottom: 16px;
  color: thistle;
}
.card-header {
  font-weight: bold;
  margin-bottom: 8px;
  color: green;
}
.card-footer {
  margin-top: 8px;
  font-size: 12px;
  color: gray;
}
</style>
