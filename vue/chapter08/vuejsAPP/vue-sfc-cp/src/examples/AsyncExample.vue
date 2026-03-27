<template>
  <section class="page">
    <!--
      "처음부터 필요하지 않은 컴포넌트를 미리 다 불러오지 말자"는 관점입니다.

      어떤 컴포넌트는 무겁습니다.
      - 차트, 통계 패널, 큰 테이블, 설정 화면

      이런 것들을 처음부터 모두 로딩하면 초기 화면이 느려질 수 있습니다.

      그래서 defineAsyncComponent를 사용해
      "실제로 필요한 순간"에만 컴포넌트를 import 합니다.

       목적은  "초기 로딩 최적화"라는 관점에서 비동기 컴포넌트를 이해하는 것입니다.
    -->

    <h1>비동기 컴포넌트 예제</h1>

    <p class="guide">버튼을 눌렀을 때만 무거운 패널 컴포넌트를 불러옵니다.</p>

    <button class="load-btn" @click="showPanel = true" :disabled="showPanel">
      상세 패널 불러오기
    </button>

    <component v-if="showPanel" :is="HeavyPanel" />
  </section>
</template>

<script>
import { defineAsyncComponent } from "vue";

const HeavyPanel = defineAsyncComponent(
  () => import("../components/async/HeavyPanel.vue"),
);

export default {
  name: "AsyncExample",
  data() {
    return {
      showPanel: false,
      HeavyPanel,
    };
  },
};
</script>

<style scoped>
.page {
  max-width: 900px;
  margin: 0 auto;
}

.guide {
  color: #555;
  margin-bottom: 18px;
  line-height: 1.7;
}

.load-btn {
  border: none;
  background: #2f80ed;
  color: white;
  padding: 12px 18px;
  border-radius: 10px;
  cursor: pointer;
}

.load-btn:disabled {
  background: #9bbbe9;
  cursor: default;
}
</style>
