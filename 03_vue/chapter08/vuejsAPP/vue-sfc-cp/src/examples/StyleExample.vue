<template>
  <section class="page">
    <!--
      
      "컴포넌트를 분리해도 CSS는 기본적으로 전역이라 충돌할 수 있다"는 문제에서 시작합니다.

      "컴포넌트를 나눴으니까 스타일도 자동으로 분리되겠지?"
       하지만 실제로는 CSS는 기본적으로 전역 범위이기 때문에,
      같은 클래스명을 여러 컴포넌트에서 사용하면 서로 영향을 줄 수 있습니다.

      그래서 이 예제는 아래 순서로 봐야 합니다.

      1. GlobalBadge
         - 전역 CSS 예제
         - 클래스명이 겹치면 문제가 생길 수 있다는 점 확인

      2. ScopedBadge
         - 현재 컴포넌트 내부에만 스타일을 제한
         - "컴포넌트 단위 스타일 분리"의 가장 기본적인 방법

      3. ModuleBadge
         - 클래스 이름 자체를 고유하게 바꾸는 방식
         - 스타일 충돌을 더 강하게 방지
 
      "왜 scoped와 module이 필요한가"를 눈으로 비교해서 이해하는 데 있습니다.
    -->

    <h1>단일 파일 컴포넌트 스타일</h1>

    <p class="guide">
      전역 CSS, Scoped CSS, CSS Module을 한 화면에서 비교하는 예제입니다.
    </p>

    <div class="grid">
      <GlobalBadge />
      <ScopedBadge />
      <ModuleBadge />
    </div>
  </section>
</template>

<script>
import GlobalBadge from "../components/style/GlobalBadge.vue";
import ScopedBadge from "../components/style/ScopedBadge.vue";
import ModuleBadge from "../components/style/ModuleBadge.vue";

export default {
  name: "StyleExample",
  components: {
    GlobalBadge,
    ScopedBadge,
    ModuleBadge,
  },
};
</script>

<style scoped>
.page {
  max-width: 1100px;
  margin: 0 auto;
}

.guide {
  color: #555;
  margin-bottom: 24px;
  line-height: 1.7;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
</style>
