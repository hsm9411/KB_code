<template>
  <div>
    <h2>콘솔을 확인합니다.</h2>
  </div>
</template>
<script setup>
import axios from "axios";
const requestAPI = async () => {
  const url = "/api/todos/2";
  const response = await axios.get(url);
  console.log("# 응답객체 : ", response);
  console.log(typeof response);
};
requestAPI();
</script>
