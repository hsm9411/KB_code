<template>
  <section class="page">
    <!--
     "자식 컴포넌트의 입력값을 부모 상태와 연결하는 방법"을 설명합니다.
      보통 입력창은 재사용하려고 자식 컴포넌트로 분리합니다.
      그런데 실제 검색어 값은 부모도 알아야 합니다.
      왜냐하면 부모가 그 검색어를 기준으로 목록 필터링이나 API 요청을 하기 때문입니다.

      그래서 사용자 정의 v-model을 사용합니다.

      여기서 핵심은:
      부모: v-model:keyword="searchKeyword"
      자식: props.keyword
      자식: emit('update:keyword', 새값)

      이 세 개가 하나의 세트라는 점입니다.     
      "입력 컴포넌트를 재사용하면서도 부모와 값 동기화하기"
      입니다.
    -->

    <h1>컴포넌트 v-model 예제</h1>

    <p class="guide">
      자식 컴포넌트의 입력값을 부모 데이터와 연결하는 예제입니다.
    </p>

    <div class="panel">
      <SearchInput v-model:keyword="searchKeyword" />

      <div class="result-box">
        <p><strong>현재 검색어:</strong> {{ searchKeyword }}</p>
        <p><strong>글자 수:</strong> {{ searchKeyword.length }}</p>
      </div>

      <ul class="course-list">
        <li v-for="course in filteredCourses" :key="course.id">
          {{ course.title }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import SearchInput from "../components/model/SearchInput.vue";

export default {
  name: "VModelExample",
  components: {
    SearchInput,
  },
  data() {
    return {
      searchKeyword: "",
      courses: [
        { id: 1, title: "Vue 컴포넌트 기초" },
        { id: 2, title: "Vue 슬롯과 재사용 패턴" },
        { id: 3, title: "Spring Boot API 입문" },
        { id: 4, title: "React 상태관리 실습" },
      ],
    };
  },
  computed: {
    filteredCourses() {
      if (!this.searchKeyword.trim()) {
        return this.courses;
      }

      return this.courses.filter((course) =>
        course.title.toLowerCase().includes(this.searchKeyword.toLowerCase()),
      );
    },
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

.panel {
  background: white;
  border: 1px solid #e8edf4;
  border-radius: 18px;
  padding: 24px;
}

.result-box {
  margin: 18px 0;
  padding: 14px;
  background: #f6f9ff;
  border-radius: 12px;
}

.result-box p {
  margin: 6px 0;
}

.course-list {
  margin: 0;
  padding-left: 20px;
  line-height: 1.9;
}
</style>
