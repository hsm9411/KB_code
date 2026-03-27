<template>
  <div class="app-shell">
    <!--
      
       App.vue는 실제 기능을 구현하는 파일이라기보다,
      여러 예제 화면 중에서 "지금 어떤 예제를 실행할지" 선택하는 시작점 역할을 합니다.
      -->
    <!-- <SlotExample2 />
    <StyleExample2 /> -->

    <div>APP</div>

    <!-- 1. 스타일 -->
    <!-- <StyleExample /> -->

    <!-- 2. 슬롯 -->
    <!-- <SlotExample /> -->

    <!-- 3. 동적 컴포넌트 -->
    <!-- <DynamicExample /> -->
    <!-- <DynamicExample2 /> -->

    <!-- 4. 컴포넌트 v-model -->
    <!-- <VModelExample /> -->

    <!-- 5. provide / inject -->
    <ProvideInjectExample />

    <!-- 6. Teleport -->
    <!-- <TeleportExample /> -->

    <!-- 7. 비동기 컴포넌트 -->
    <!-- <AsyncExample /> -->
  </div>
</template>

<script>
import SlotExample2 from "./examples/SlotExample2.vue";
import StyleExample2 from "./examples/StyleExample2.vue";
import StyleExample from "./examples/StyleExample.vue";
import SlotExample from "./examples/SlotExample.vue";
import DynamicExample from "./examples/DynamicExample.vue";
import DynamicExample2 from "./examples/DynamicExample2.vue";
// import VModelExample from './examples/VModelExample.vue'
import ProvideInjectExample from "./examples/ProvideInjectExample.vue";
// import TeleportExample from './examples/TeleportExample.vue'
// import AsyncExample from './examples/AsyncExample.vue'

export default {
  name: "App",
  components: {
    SlotExample2,
    StyleExample2,
    StyleExample,
    SlotExample,
    DynamicExample,
    DynamicExample2,
    // VModelExample,
    ProvideInjectExample,
    // TeleportExample,
    // AsyncExample,
  },
};
</script>

<style>
.app-shell {
  padding: 30px;
}
</style>
