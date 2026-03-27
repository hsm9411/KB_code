<template>
  <teleport to="#modal">
    <div v-if="visible" class="modal-overlay" @click="closeModal">
      <div class="modal-box" @click.stop>
        <h2>{{ title }}</h2>
        <div class="modal-content">
          <slot> 기본 모달 내용입니다. </slot>
        </div>
        <button @click="closeModal">닫기</button>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: "BaseModal",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "모달창",
    },
  },
  emits: ["close"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-box {
  width: 400px;
  background: white;
  padding: 20px;
  border-radius: 10px;
}
.modal-content {
  margin: 15px 0;
}
button {
  padding: 8px 14px;
  border: none;
  background: #333;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
</style>
