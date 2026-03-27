<template>
  <div class="sender-box">
    <h3>공지 발송</h3>

    <div class="row">
      <input
        type="text"
        @keyup.enter="onEnter"
        v-model="message"
        placeholder="공지 내용을 입력하세요"
      />

      <button @click="sendNotice">발송</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoticeSender",

  data() {
    return {
      message: "",
    };
  },

  methods: {
    onEnter() {
      const trimmed = this.message.trim();

      if (trimmed === "") {
        alert("공지 내용을 입력하세요.");
        return;
      }

      this.emitter.emit("notice", trimmed);

      this.message = "";
    },
    sendNotice() {
      const trimmed = this.message.trim();

      if (trimmed === "") {
        alert("공지 내용을 입력하세요.");
        return;
      }

      this.emitter.emit("notice", trimmed);

      this.message = "";
    },
  },
};
</script>

<style scoped>
.sender-box {
  padding: 12px;
  background: #f5f7fb;
  border-radius: 10px;
}

.row {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 10px;
}

button {
  border: none;
  background: #2d6cdf;
  color: white;
  padding: 10px 16px;
  border-radius: 8px;
}
</style>
