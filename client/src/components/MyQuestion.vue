<template>
  <div>
    <div style="display: inline">
      <span class="title is-5">My Questions</span>
      <b-button
        class="button is-info"
        @click="addQuestion"
        role="button"
        style="display: inline-block;position: absolute; right:20.5vw;font-size: 13px"
      >Ask Question</b-button>
    </div>
    <p style="font-size:15px;">{{questions.length}} Questions</p>
    <div v-for="(question, i) in questions" :key="i">
      <ListQuestion class="list" :question="question" :status="status"></ListQuestion>
    </div>
  </div>
</template>

<script>
import ListQuestion from "./ListQuestion";

export default {
  name: 'MyQuestion',
    components: {
    ListQuestion
  },
  data() {
    return {
      status: true
    }
  },
  methods: {
    addQuestion() {
      this.$router.push("/add-question");
    }
  },
  computed: {
    questions() {
      return this.$store.state.myQuestions;
    }
  },
  watch: {
    questions() {
      return this.$store.state.myQuestions;
    }
  },
  created() {
    this.$store.dispatch('myQuestion')
  }
}
</script>
<style scoped>
.column {
  padding: 2vw 12vw 2vw 2vw;
  /* border-left: 1px solid rgb(168, 168, 127); */
  margin-right: 10%;
}
.list {
  margin-bottom: 13px !important;
}
</style>