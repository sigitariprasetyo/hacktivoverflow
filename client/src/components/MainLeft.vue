<template>
  <div class="column is-one-quarter">
    <h3 class="title is-6 navigation">Navigation</h3>
    <table class="table menu is-bordered">
      <thead>
        <tr>
          <td>
            <a href="#" @click.prevent="home">
              <i class="fas fa-home"></i>Home
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <a href="#" @click.prevent="myQuestion">
              <i class="fas fa-comments"></i>My Questions
            </a>
          </td>
        </tr>
      </thead>
    </table>

    <h3 class="title is-6 trending">Trending Tag</h3>
    <table class="table is-bordered trending-table">
      <thead v-for="(item, index) in trending" :key="index">
        <ListTrending :item="item"></ListTrending>
      </thead>
    </table>
  </div>
</template>

<script>
import ListTrending from "./ListTrending";

export default {
  name: "MainLeft",
  components: {
    ListTrending
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    myQuestion() {
      this.$router.push("/my-question");
      this.$store.dispatch("myQuestion");
    }
  },
  computed: {
    trending() {
      return this.$store.state.trending;
    }
  }
};
</script>
<style scoped>
.navigation {
  margin: 85px auto;
  width: 250px;
}
.menu {
  margin: -10px auto;
  width: 250px;
}
.trending {
  margin: 85px auto;
  width: 250px;
}
.trending-table {
  margin: -10px auto;
  width: 250px;
}
.fas,
.far,
a {
  margin-right: 15px;
  color: black;
}
a:hover {
  color: rgb(241, 167, 56);
}
</style>