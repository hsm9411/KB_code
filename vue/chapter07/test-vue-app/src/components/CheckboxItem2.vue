<template>
  <li><input type="checkbox" :checked="checked" />{{ name }}</li>
</template>
<script>
export default {
  name: "CheckboxItem2",
  props: ["name", "checked"],
};
</script>
