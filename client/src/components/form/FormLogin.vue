<template>
  <div class="form">
    <form action>
      <div class="modal-card" style="width:300px;">
        <section class="modal-card-body">
          <b-field label="Username / Email">
            <b-input v-model="identity" type="text" placeholder="Your username / email" required></b-input>
          </b-field>
          <b-field label="Password">
            <b-input
              v-model="password"
              type="password"
              password-reveal
              placeholder="Your password"
              required
            ></b-input>
          </b-field>
        </section>
        <button @click.prevent="login" class="button c is-link">Login</button>
        <br />
        <a @click="cardModal" class="is-link" style="text-align:center">Register?</a>
      </div>
    </form>
  </div>
</template>

<script>
import FormRegister from "./FormRegister";

export default {
  name: "FormLogin",
  component: {
    FormRegister
  },
  data() {
    return {
      identity: "",
      password: "",
      isFullPage: true
    };
  },
  methods: {
    login() {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      });
      let payload = {
        identity: this.identity,
        password: this.password
      };
      this.$store
        .dispatch("login", payload)
        .then(data => {
          setTimeout(() => loadingComponent.close(), 1 * 1000);
          setTimeout(() => {
            this.$buefy.toast.open({
              message: `Login success`,
              type: "is-success"
            });
          }, 1200);
        })
        .catch(err => {
          setTimeout(() => loadingComponent.close(), 1 * 1000);
          this.$buefy.toast.open({
            message: `${err.response.data}`,
            type: "is-danger"
          });
          this.identity = "";
          this.password = "";
        });
    },
    cardModal() {
      this.$buefy.modal.open({
        parent: this,
        component: FormRegister,
        hasModalCard: true,
        customClass: "custom-class custom-class-2"
      });
    }
  }
};
</script>
<style scoped>
.button {
  background-color: #d71149;
  width: 87%;
  align-self: center;
  border-radius: 6px;
  color: white;
}
.form {
  z-index: 9999;
}
.c {
  background-color: rgb(241, 198, 79) !important;
  color: black !important;
}
</style>