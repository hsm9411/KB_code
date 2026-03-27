<template>
  <div class="child">
    <h2>Child1</h2>
  </div>
</template>
<script>
export default {
  name: "Child1",
};
</script>
<style scoped>
.child {
  background-color: yellow; /* Child2
는 blue, Child3
는 orange */
  border: solid 1px black;
  margin: 1.5em;
  padding: 1em;
}
</style>
