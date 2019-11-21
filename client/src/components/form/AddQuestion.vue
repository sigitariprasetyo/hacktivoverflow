<template>
  <section style="margin-top: 20px;">
    <h3 class="title is-5">Write Your Question</h3>
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
        <span @click="addQuestion" class="button is-info">Publish</span>
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
      title: "",
      description: "",
      tags: [],
      isFullPage: true
    };
  },
  methods: {
    addQuestion() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      let payload = {
        title: this.title,
        description: this.description,
        tags: this.tags
      };
      this.$store
        .dispatch("addQuestion", payload)
        .then(() => {
          setTimeout(() => loadingComponent.close(), 1 * 2000);
          setTimeout(
            () =>
              this.$buefy.toast.open({
                message: "Add Question Success..",
                type: "is-success"
              }),
            2000
          );
          this.title = "";
          this.description = "";
          this.tags = [];
          this.$router.push("/");
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
  }
};
</script>
