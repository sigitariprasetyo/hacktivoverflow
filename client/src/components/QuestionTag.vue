<template>
  <div>
    <div style="display: inline">
      <span class="title is-5">Result</span>
    </div>
    <p style="font-size:15px;">{{questions.length}} Questions</p>
    <div v-for="(question, i) in questions" :key="i">
      <ListQuestion class="list" :question="question"></ListQuestion>
    </div>
  </div>
</template>

<script>
import ListQuestion from "./ListQuestion";

export default {
  name: "QuestionTag",
  components: {
    ListQuestion
  },
  computed: {
    questions() {
      return this.$store.state.questionTag;
    }
  },
  watch: {
    questions() {
      return this.$store.state.questionTag;
    }
  },
  created() {
    this.$store.dispatch("getByTag");
  }
};
</script>
<style scoped>
.column {
  padding: 2vw 12vw 2vw 2vw;
  margin-right: 10%;
}
.list {
  margin-bottom: 13px !important;
}
</style>