<template>
  <section class="page">
    <!--
      "같은 위치에 서로 다른 컴포넌트를 상황에 따라 바꿔서 보여주는 방법"을 설명합니다.

      실제 화면에서는 탭 UI가 자주 나옵니다.
      - 공지사항
      - Q&A
      - 프로필

      이런 경우 페이지 전체를 이동하지 않고 화면 일부만 바꾸고 싶을 때가 많습니다.

      그럴 때 사용하는 것이 동적 컴포넌트입니다.

      핵심 문법은:
      <component :is="현재컴포넌트명"></component>

      그리고 keep-alive는 탭을 바꿨다가 다시 돌아왔을 때
      상태를 유지하기 위한 장치입니다.

      예를 들어 Q&A 탭에 입력한 질문 내용이
      다른 탭에 갔다 와도 남아 있게 만들 수 있습니다.

      즉 이 예제의 목적은  1. 동적 컴포넌트로 탭 UI 만들기 2. keep-alive로 상태 유지 경험
      
    -->

    <h1>동적 컴포넌트 예제</h1>

    <p class="guide">탭을 누를 때마다 다른 컴포넌트를 렌더링합니다.</p>

    <div class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: currentTab === tab.id }"
        @click="changeTab(tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="content">
      <keep-alive include="QnaTab,ProfileTab">
        <component :is="currentTab"></component>
      </keep-alive>
    </div>
  </section>
</template>

<script>
import NoticeTab from "../components/dynamic/NoticeTab.vue";
import QnaTab from "../components/dynamic/QnaTab.vue";
import ProfileTab from "../components/dynamic/ProfileTab.vue";

export default {
  name: "DynamicExample",
  components: {
    NoticeTab,
    QnaTab,
    ProfileTab,
  },
  data() {
    return {
      currentTab: "NoticeTab",
      tabs: [
        { id: "NoticeTab", label: "공지사항" },
        { id: "QnaTab", label: "Q&A" },
        { id: "ProfileTab", label: "프로필" },
      ],
    };
  },
  methods: {
    changeTab(tab) {
      this.currentTab = tab;
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 1000px;
  margin: 0 auto;
}

.guide {
  color: #555;
  margin-bottom: 18px;
  line-height: 1.7;
}

.tab-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tab-btn {
  border: none;
  background: #e9eef8;
  color: #2d4a7f;
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
}

.tab-btn.active {
  background: #2f80ed;
  color: white;
}

.content {
  margin-top: 10px;
}
</style>
