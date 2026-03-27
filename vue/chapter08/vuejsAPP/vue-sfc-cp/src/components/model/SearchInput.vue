<template>
  <div class="search-box">
    <input
      :value="keyword"
      @input="$emit('update:keyword', $event.target.value)"
      type="text"
      placeholder="검색어를 입력하세요"
    />
    <p>입력값: {{ keyword }}</p>
  </div>
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    keyword: {
      type: String,
      default: "",
    },
  },
  emits: ["update:keyword"],
};
</script>

<style scoped>
.search-box {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}
input {
  width: 100%;
  max-width: 300px;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
p {
  margin-top: 10px;
  color: #555;
}
</style>
