<template>
  <section style="margin-top: 20px;">
    <!-- {{question}} -->
    <h3 class="title is-5">Edit Your Question</h3>
    <form @submit.prevent="addQuestion" enctype="multipart/form-data">
      <b-field label="Title">
        <b-input placeholder="Title" v-model="title"></b-input>
      </b-field>

      <b-field label="Article content">
        <wysiwyg style="min-height: 180px;" v-model="description" />
      </b-field>

      <section>
        <b-field label="Add some tags">
          <b-taginput v-model="tags" ellipsis icon="label" placeholder="Add a tag"></b-taginput>
        </b-field>
      </section>
      <br />

      <div class="buttons">
        <span @click="editQuestion(question._id)" class="button is-info">Publish</span>
        <span @click="cancel" class="button is-danger is-outlined">Cancel</span>
      </div>
    </form>
  </section>
</template>

<script>
import "vue-wysiwyg/dist/vueWysiwyg.css";
import axios from "axios";

export default {
  name: "AddQuestion",
  data() {
    return {
      title: this.$store.state.questionDetail.title,
      description: this.$store.state.questionDetail.description,
      tags: this.$store.state.questionDetail.tags,
      isFullPage: true
    };
  },
  methods: {
    editQuestion(id) {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      let payload = {
        title: this.title,
        description: this.description,
        tags: this.tags,
        id
      };
      this.$store
        .dispatch("editQuestion", payload)
        .then(() => {
          setTimeout(() => loadingComponent.close(), 1 * 2000);
          setTimeout(
            () =>
              this.$buefy.toast.open({
                message: "Edit Question Success..",
                type: "is-success"
              }),
            2000
          );
          this.title = "";
          this.description = "";
          this.tags = [];
          this.$router.push(`/question-detail/${id}`);
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
    cancel() {
      this.$router.push("/");
    }
  },
  computed: {
    question() {
      return this.$store.state.questionDetail;
    }
  },
  created() {
    this.$store.dispatch("getDetail", {
      id: this.$router.history.current.params.id
    });
  }
};
</script>
