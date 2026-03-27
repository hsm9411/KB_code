<template>
  <section class="page">
    <!--
      "컴포넌트는 여기서 관리하지만, 실제 화면 출력은 다른 DOM 위치에 하겠다"
      라는 Teleport의 의도를 설명합니다.

      모달은 보통 화면 전체를 덮어야 합니다.
      그런데 중간 컴포넌트 안쪽에서 그냥 렌더링하면
      z-index, overflow, 레이아웃 문제로 깨질 수 있습니다.

      그래서 Teleport를 사용해서
      실제 DOM 출력은 #modal 쪽으로 보냅니다.

      목적은  "논리적 관리 위치와 실제 렌더링 위치를 분리하는 이유"
      를 이해하는 것입니다.

      주의:
      index.html에 반드시 <div id="modal"></div> 이 있어야 합니다.
    -->

    <h1>Teleport 예제</h1>

    <p class="guide">
      버튼을 누르면 모달이 열리고, 실제 렌더링 위치는 #modal 입니다.
    </p>

    <div class="panel">
      <h2>강의 등록</h2>
      <p>등록 버튼을 누르면 처리 안내 모달을 표시합니다.</p>
      <button class="open-btn" @click="openModal">등록하기</button>
    </div>

    <teleport to="#modal">
      <BaseModal v-if="isModalOpen" @close="closeModal" />
    </teleport>
  </section>
</template>

<script>
import BaseModal from "../components/teleport/BaseModal.vue";

export default {
  name: "TeleportExample",
  components: {
    BaseModal,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
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
  border: 1px solid #e8edf3;
  border-radius: 18px;
  padding: 24px;
}

.open-btn {
  border: none;
  background: #1f2937;
  color: white;
  padding: 12px 18px;
  border-radius: 10px;
  cursor: pointer;
}
</style>
