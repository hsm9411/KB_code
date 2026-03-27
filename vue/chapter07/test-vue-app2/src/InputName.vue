<template>…</template>
<script>
export default {
  name: "InputName",
  // emits: ['nameChanged1'], // nameChanged1 이외의 이벤트 발생시 경고창 출력
  emits: {
    namedChanged: (e) => {
      return e.name && typeof e.name === "string" && e.name.trim().length >= 3
        ? true
        : false;
    },
  },
  data() {
    return { name: "" };
  },
};
</script>
