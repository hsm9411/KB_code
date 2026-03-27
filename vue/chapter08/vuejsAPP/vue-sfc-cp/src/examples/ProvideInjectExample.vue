<template>
  <section class="page">
    <!--
      
      props drilling 문제를 해결하는 흐름입니다.

      상위에서 하위로 데이터를 전달할 때
      중간 컴포넌트가 그 데이터를 직접 쓰지도 않는데
      그냥 아래로 계속 전달만 하는 경우가 많습니다.

      이런 상황이 깊어질수록 코드가 번거롭고 구조가 복잡해집니다.

      그래서
      - 상위는 provide로 공용 데이터를 제공하고
      - 필요한 하위는 inject로 직접 꺼내 사용합니다.

     
      "깊은 하위 컴포넌트가 필요한 공용 데이터를 직접 사용하는 구조"
      를 이해하는 것입니다.
    -->

    <h1>provide / inject 예제</h1>

    <p class="guide">
      상위 컴포넌트에서 공용 데이터를 제공하고, 하위 컴포넌트가 직접 주입받아
      사용합니다.
    </p>

    <MenuList :items="tasks" />
  </section>
</template>

<script>
import { computed } from "vue";
import MenuList from "../components/provide/MenuList.vue";

export default {
  name: "ProvideInjectExample",
  components: {
    MenuList,
  },
  data() {
    return {
      tasks: [
        { id: 1, name: "Vue 슬롯 복습", done: true },
        { id: 2, name: "동적 컴포넌트 실습", done: true },
        { id: 3, name: "Teleport 예제 만들기", done: false },
        { id: 4, name: "비동기 컴포넌트 정리", done: false },
      ],
    };
  },
  provide() {
    return {
      icons: {
        done: "완료",
        todo: "대기",
      },
      doneCount: computed(() => {
        return this.tasks.filter((task) => task.done).length;
      }),
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
</style>
