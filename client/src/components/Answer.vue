<template>
  <div>
    <article class="media">
      <figure class="media-left">
        <a @click="upVoteAnswer(answer._id)">
          <i class="fas fa-caret-up fa-3x"></i>
        </a>
        <p style="text-align:center">{{votes}}</p>
        <a @click="downVoteAnswer(answer._id)">
          <i class="fas fa-caret-down fa-3x"></i>
        </a>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{answer.userId.username}}</strong>
            <br />
          </p>
          <p v-html="answer.answer"></p>
          <br />
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: "answer",
  props: ["answer"],
  methods: {
    upVoteAnswer(id) {
      this.$store
        .dispatch("upVoteAnswer", { id })
        .then(_ => {
          this.$store.dispatch("getAnswer", { id: this.$route.params.id });
        })
        .catch(err => {
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: "is-danger"
          });
        });
    },
    downVoteAnswer(id) {
      this.$store
        .dispatch("downVoteAnswer", { id })
        .then(_ => {
          this.$store.dispatch("getAnswer", { id: this.$route.params.id });
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
    votes() {
      return this.answer.upVotes.length - this.answer.downVotes.length;
    }
  }
};
</script>