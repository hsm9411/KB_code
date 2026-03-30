<template>
  <div>
    <h2>REF</h2>

    X: <input v-model.number="x" /> Y:
    <input type="number" v-model.number="state.y" />

    <button @click="add">더하기</button>
    <div>결과 : {{ state.result }}</div>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
export default {
  setup() {
    const x = ref(10);
    const state = reactive({ y: 20, result: 30 });

    const add = () => {
      state.result = x.value + state.y;
    };
    return { state, x, add };
  },
};
</script>
<style></style>
