<template>
  <div class="receiver-box">
    <h3>수신된 공지</h3>
    <p>{{ receivedMessage }}</p>
  </div>
</template>

<script>
export default {
  name: "NoticeReceiver",

  data() {
    return {
      receivedMessage: "아직 수신된 공지가 없습니다.",
    };
  },

  created() {
    this.emitter.on("notice", this.receiveNotice);
  },

  beforeUnmount() {
    this.emitter.off("notice", this.receiveNotice);
  },

  methods: {
    receiveNotice(msg) {
      this.receivedMessage = msg;
    },
  },
};
</script>

<style scoped>
.receiver-box {
  padding: 12px;
  background: #fff6dd;
  border-radius: 10px;
}

p {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}
</style>
