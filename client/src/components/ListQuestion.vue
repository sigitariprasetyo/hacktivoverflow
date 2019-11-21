<template>
  <div class="list columns">
    <div class="column count is-1">
      <div>
        <div class="votes">{{votes}}</div>
        <p class="tag">Votes</p>
      </div>
    </div>
    <div class="column count answerCount is-1">
      <div>
        <div class="answer">{{question.answers.length}}</div>
        <p class="tag">Answer</p>
      </div>
    </div>
    <div class="column">
      <a class="title is-6 judul" @click.prevent="detail(question._id)">{{question.title}}</a>
      <truncate :length="200" type="html" :text="question.description"></truncate>
      <!-- <p class="desc" v-html="question.description"></p> -->
      <p class="time">asked {{time}} - by {{question.userId.username}}</p>
      <div style="display:inline;" v-for="(tag, index) in question.tags" :key="index">
        <p
          style="margin-right:5px;padding:3px 10px;background-color:#CFE0ED;color:#3E6E91"
          class="tag"
        >{{tag}}</p>
      </div>
      <div class="controll" v-if="status">
        <b-button
          @click.prevent="deleteQuestion(question._id)"
          type="is-danger"
          size="is-small"
          outlined
        >Delete</b-button>
        <b-button
          @click.prevent="editQuestion(question._id)"
          style="margin-left: 10px !important"
          type="is-warning"
          size="is-small"
        >Edit</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import truncate from "vue-truncate-collapsed";

export default {
  name: "ListQuestion",
  props: ["question", "status"],
  components: {
    truncate
  },
  data() {
    return {
      isFullPage: true
    };
  },
  methods: {
    detail(id) {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      let payload = { id };
      this.$store.dispatch("getAnswer", payload);
      this.$store
        .dispatch("getDetail", payload)
        .then(_ => {
          this.$router.push(`/question-detail/${id}`);
          setTimeout(() => loadingComponent.close(), 1 * 2000);
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 2000);
          setTimeout(
            () =>
              this.$buefy.toast.open({
                message: `${err.response.data}`,
                type: "is-danger"
              }),
            1 * 2000
          );
        });
    },
    deleteQuestion(id) {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      this.$store
        .dispatch("deleteQuestion", { id })
        .then(_ => {
          this.$store.dispatch("myQuestion");
          setTimeout(() => loadingComponent.close(), 1 * 2000);
          this.$buefy.toast.open({
            message: `Delete question success!`,
            type: "is-success"
          });
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 2000);
          setTimeout(
            () =>
              this.$buefy.toast.open({
                message: `${err.response.data}`,
                type: "is-danger"
              }),
            1 * 2000
          );
        });
    },
    editQuestion(id) {
      this.$router.push(`/update/${id}`);
    }
  },
  computed: {
    votes() {
      return this.question.upVotes.length - this.question.downVotes.length;
    },
    time() {
      return moment(this.question.createdAt)
        .startOf("day")
        .fromNow();
    }
  }
};
</script>
<style scoped>
.list {
  border-radius: 0px;
  padding: 2px;
  margin-top: 15px;
}
.judul {
  color: rgb(63, 150, 221);
}
.judul:hover {
  color: rgb(42, 129, 201);
}
.votes,
.answer {
  width: 35px;
  height: 35px;
  background-color: rgb(241, 198, 79);
  margin: 1vh;
  text-align: center;
  padding: 0.7vh 0;
  border-radius: 7px !important;
}
.tag {
  text-align: center;
  display: inline;
  /* margin-left: 2px; */
}
.count {
  font-size: 13px;
  margin-top: 20px;
}
.answerCount {
  margin-right: 20px;
}
.time {
  font-size: 12px;
  color: rgb(166, 168, 170);
  margin-bottom: 15px;
}
.desc {
  font-size: 14px;
  margin: 10px 0;
}
.controll {
  margin-top: 10px;
}
</style>