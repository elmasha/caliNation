<template >
  <div>
    <div class="container">
      <v-row align="center" justify="center">
        <v-col cols="12" md="12" lg="12" sm="12"
          ><v-btn text color="red" @click="signUpGoogle">
            <v-icon>mdi-google</v-icon>&nbsp;Log in with google
          </v-btn></v-col
        >
      </v-row>
    </div>
    <v-snackbar color="white--text" :timeout="4000" v-model="snackbar" center>
      {{ snackbarText }}
    </v-snackbar>
    <v-snackbar
      color="red"
      :timeout="4000"
      v-model="snackbar2"
      outlined
      bottom
      center
    >
      {{ snackbarText2 }}
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showauth: true,
      showRegister2: false,
      snackbar: false,
      snackbarText: "No error message",
      snackbar2: false,
      showLogin: false,
      snackbarText2: "",
      viewItemDialog: false,
      user_name: "",
      phone_number: "",
      county: "",
      landMark: "",
      email: "",
      auth: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    signUpGoogle() {
      let that = this;
      const provider = new this.$fireModule.auth.GoogleAuthProvider();
      this.$fire.auth
        .signInWithPopup(provider)
        .catch((error) => {
          console.log(error);
          that.snackbar2 = true;
          that.snackbarText2 = error;
        })
        .then((user) => {
          that.snackbar = true;
          that.snackbarText = "Sign up success";
          this.showauth = true;
          this.showLogin = true;
          this.auth_State = true;

          this.$router.push("/admin");
        });
    },
  },
  created() {},
};
</script>
<style>
</style>
