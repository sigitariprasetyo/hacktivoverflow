<template>
  <b-navbar
    class="nav is-light"
    style="padding-left: 10vw !important; padding-right: 20vw !important"
  >
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../assets/l.jpg" alt />
        <h6 class="title is-5">Hacktiv8-Overflow</h6>
      </b-navbar-item>
      <!-- <FormSearch /> -->
    </template>
    <template slot="end">
      <b-navbar-item tag="div">
        <FormSearch />
        <div v-if="!isLogin" class="buttons">
          <b-dropdown hoverable position="is-bottom-left" aria-role="menu">
            <b class="navbar-item button is-light c nav-link" slot="trigger" role="button">
              <span>Login</span>
              <b-icon icon="menu-down"></b-icon>
            </b>
            <b-dropdown-item custom aria-role="menuitem">
              <FormLogin></FormLogin>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div v-else class="buttons">
          <b-button @click.prevent="logout" size="is-small" type="is-danger" outlined>Logout</b-button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import FormLogin from "./form/FormLogin";
import FormSearch from "./form/FormSearch";

export default {
  name: "Navbar",
  components: {
    FormLogin,
    FormSearch
  },
  data() {
    return {
      isFullPage: true
    };
  },
  methods: {
    logout() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.$store.dispatch("auth");
      this.$router.push('/')
      setTimeout(() => loadingComponent.close(), 1 * 1000);
      setTimeout(() => {
        this.$buefy.toast.open({
          message: `Login out success`,
          type: "is-success"
        });
      }, 1200);
    },
    cronJob() {
      this.$store.dispatch("getQuote").then(data => {
        this.$buefy.toast.open({
          message: `${data.content}`,
          type: "is-warning",
          position: 'is-bottom'
        })
      })
      .catch(err => {
        console.log(err);
      })
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  watch: {
    isLogin() {}
  },
  created() {
    this.$store.dispatch("auth");
    this.$store.dispatch("getQuestion");
    this.$store.dispatch("trending");
    let result = this.$crontab.addJob({
      name: "counter",
      interval: {
        seconds: "/10"
      },
      job: this.cronJob
    });
  }
};
</script>
<style scoped>
.button {
  padding: 0 5px;
}
.buttons {
  margin: auto !important;
}
.c {
  background-color: rgb(241, 198, 79) !important;
}
</style>
