<template>
  <div class="box">
    <h2>예제 2. 학생 등록 앱</h2>
    <p class="desc">
      자식이 입력값을 가지고 있다가 emit으로 부모에게 전달하고, 부모가 목록을
      관리하는 구조
    </p>

    <StudentInput @add-student="addStudentHandler" />

    <h3>등록된 학생 목록</h3>
    <ul>
      <li v-for="(student, index) in students" :key="index">
        {{ student }}
      </li>
    </ul>
  </div>
</template>

<script>
import StudentInput from "./StudentInput.vue";

export default {
  name: "Example2StudentRegister",
  components: {
    StudentInput,
  },
  data() {
    return {
      students: ["홍길동", "김영희"],
    };
  },
  methods: {
    addStudentHandler(name) {
      this.students.push(name);
    },
  },
};
</script>

<style scoped>
.box {
  padding: 12px;
}

.desc {
  color: #666;
  margin-bottom: 16px;
}
</style>
