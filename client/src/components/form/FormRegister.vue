<template>
  <div>
    <form action>
      <div class="modal-card" style="width: 500px">
        <header class="modal-card-head">
          <p class="modal-card-title">Register</p>
        </header>
        <section class="modal-card-body">
          <b-field label="Username">
            <b-input type="text" v-model="username" placeholder="Username" required></b-input>
          </b-field>

          <b-field label="Email">
            <b-input type="email" v-model="email" placeholder="Your email" required></b-input>
          </b-field>

          <b-field label="Password">
            <b-input
              type="password"
              v-model="password"
              password-reveal
              placeholder="Your password"
              required
            ></b-input>
          </b-field>
        </section>
        <footer class="modal-card-foot">
          <button class="button" type="button" @click="$parent.close()">Close</button>
          <button @click.prevent="register" class="button c">Submit</button>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormRegister",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      isFullPage: true
    };
  },
  methods: {
    register() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      let payload = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch("register", payload)
        .then(data => {
          setTimeout(() => loadingComponent.close(), 1 * 1000);
          setTimeout(() => {
            this.$buefy.toast.open({
              message: `Register success`,
              type: "is-success"
            });
          }, 1200);
          $parent.close()
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 1000);
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: "is-danger"
          });
          this.username = "";
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
<style scoped>
.c {
  background-color: rgb(241, 198, 79) !important;
  color: black !important;
}
</style>