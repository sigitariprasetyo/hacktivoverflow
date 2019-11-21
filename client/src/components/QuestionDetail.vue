<template>
  <div>
    <span class="title is-5">Question Detail</span>
    <article class="media box">
      <figure class="media-left">
        <a @click="upVote(question._id)">
          <i class="fas fa-caret-up fa-3x"></i>
        </a>
        <p style="text-align:center">{{votes}}</p>
        <a @click="downVote(question._id)">
          <i class="fas fa-caret-down fa-3x"></i>
        </a>
      </figure>
      <div class="media-content">
        <div class="content">
          <a class="title is-6 judul">{{question.title}}</a>
          <br />
          <p class="desc" v-html="question.description"></p>
          <small>
            <p class="time">asked {{time}} - by {{question.userId.username}}</p>
          </small>
          <div style="display:inline;" v-for="(tag, index) in question.tags" :key="index">
            <p
              style="margin-right:5px;margin-top:10px;padding:3px 10px;background-color:#CFE0ED;color:#3E6E91"
              class="tag"
            >{{tag}}</p>
          </div>
        </div>

        <span class="title is-6">Answers</span>
        <div v-for="(answer, index) in answers" :key="index">
          <Answer :answer="answer"></Answer>
        </div>
        <article class="media">
          <div class="media-content">
            <form class="field">
              <b-feld class="control">
                <wysiwyg style="min-height: 180px;" v-model="answer" />
              </b-feld>
            </form>
            <div class="field">
              <p class="control">
                <button @click.prevent="addAnswer(question._id)" class="button">Post answer</button>
              </p>
            </div>
          </div>
        </article>
      </div>
    </article>
  </div>
</template>

<script>
import moment from "moment";
import "vue-wysiwyg/dist/vueWysiwyg.css";
import Answer from "./Answer";

export default {
  name: "QuestionDetail",
  components: {
    Answer
  },
  data() {
    return {
      answer: ""
    };
  },
  methods: {
    addAnswer(id) {
      let payload = { id, answer: this.answer };
      this.$store
        .dispatch("addAnswer", payload)
        .then(_ => {
          this.answer = "";
          this.$store.dispatch("getAnswer", { id: this.$route.params.id });
        })
        .catch(err => {
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: "is-danger"
          });
        });
    },
    upVote(id) {
      this.$store
        .dispatch("upVote", { id })
        .then(_ => {
          this.$store.dispatch("getDetail", { id: this.$route.params.id });
        })
        .catch(err => {
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: "is-danger"
          });
        });
    },
    downVote(id) {
      this.$store
        .dispatch("downVote", { id })
        .then(_ => {
          this.$store.dispatch("getDetail", { id: this.$route.params.id });
        })
        .catch(err => {
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: "is-danger"
          });
        });
    }
  },
  computed: {
    question() {
      return this.$store.state.questionDetail;
    },
    votes() {
      return this.question.upVotes.length - this.question.downVotes.length;
    },
    time() {
      return moment(this.question.createdAt)
        .startOf("day")
        .fromNow();
    },
    answers() {
      return this.$store.state.answers;
    }
  },
  watch: {
    question() {
      return this.$store.state.questionDetail;
    }
  },
  created() {
    this.$store.dispatch("getDetail", { id: this.$route.params.id });
    this.$store.dispatch("getAnswer", { id: this.$route.params.id });
    this.question = this.$store.state.questionDetail;
  }
};
</script>
<style scoped>
.list {
  margin-top: 20px;
}
.box {
  margin-top: 20px;
}
</style>