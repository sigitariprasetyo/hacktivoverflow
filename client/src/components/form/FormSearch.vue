<template>
  <div class="search">
    <form action @submit.prevent="handleSearch">
      <b-field style="margin: auto; margin-left:10px;">
        <b-input v-model="q" placeholder="Search.tag" type="search" icon="magnify"></b-input>
      </b-field>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormSearch",
  data() {
    return {
      q: ""
    };
  },
  methods: {
    handleSearch() {
      this.$store.dispatch("getByTag", {tag: this.q});
      this.$router.push(`/search-tag/${this.q}`);
      this.q = ''
    }
  }
};
</script>
<style scoped>
.search {
  margin: auto 5%;
  width: 30vw;
}
</style>
