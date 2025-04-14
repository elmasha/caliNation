<template >
  <div>
    <v-progress-linear
      v-show="progress_bar"
      indeterminate
      color="pink"
    ></v-progress-linear>
    <v-progress-linear
      v-show="progress_bar2"
      indeterminate
      color="pink"
    ></v-progress-linear>
    <v-card elevation="0" max-width="800">
      <v-tabs color="pink" centered :show-arrows="true">
        <v-tab @click="(new_account1 = false), (new_account = true)" value="one"
          ><span>Log In</span></v-tab
        >
        <v-tab
          value="two"
          @click="(new_account1 = true), (new_account = false)"
        >
          <span>New Account</span></v-tab
        >
      </v-tabs>

      <v-row>
        <v-col v-show="new_account">
          <div class="container">
            <form>
              <v-text-field
                inputmode="name"
                v-model="auth.email"
                placeholder="Enter email"
                type="email"
              >
              </v-text-field>
              <v-text-field
                inputmode="password"
                type="password"
                v-model="auth.password"
                placeholder="Enter Password"
              >
              </v-text-field>

              <v-btn color="black--text" @click="login">Sign In</v-btn>
            </form>
          </div></v-col
        >
        <v-col v-show="new_account1">
          <div class="container">
            <form>
              <v-text-field
                inputmode="name"
                type="text"
                v-model="user_name"
                placeholder="Enter username"
              >
              </v-text-field>
              <v-text-field
                inputmode="email"
                v-model="auth.email"
                type="email"
                placeholder="Email"
              >
              </v-text-field>
              <v-text-field
                inputmode="password"
                type="password"
                v-model="auth.password"
                placeholder="Password"
              >
              </v-text-field>

              <v-btn color="black--text" @click="signUp">Sign Up</v-btn>
            </form>
          </div></v-col
        >
        <v-col v-show="new_account" cols="12" md="12" lg="12" sm="12">
          <v-row align="center" justify="center">
            <v-col cols="12" md="4" lg="4" sm="4"
              ><v-btn text color="primary" @click="signUpFacebook">
                <v-icon>mdi-facebook</v-icon>&nbsp;Log in with facebook
              </v-btn></v-col
            >
            <v-col cols="12" md="4" lg="4" sm="4"
              ><v-btn text color="red" @click="signUpGoogle">
                <v-icon>mdi-google</v-icon>&nbsp;Log in with google
              </v-btn></v-col
            >
          </v-row>
        </v-col>
        <v-col v-show="new_account1" cols="12" md="12" lg="12" sm="12">
          <v-row align="center" justify="center">
            <v-col cols="12" md="4" lg="4" sm="4"
              ><v-btn text color="primary" @click="signUpFacebook1">
                <v-icon>mdi-facebook</v-icon>&nbsp;Log in with facebook
              </v-btn></v-col
            >
            <v-col cols="12" md="4" lg="4" sm="4"
              ><v-btn text color="red" @click="signUpGoogle1">
                <v-icon>mdi-google</v-icon>&nbsp;Log in with google
              </v-btn></v-col
            >
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      progress_bar: false,
      progress_bar2: false,
      snackbar: false,
      snackbarText: "No error message",
      snackbar2: false,
      showLogin: false,
      snackbarText2: "",
      new_account: true,
      new_account1: false,
      user_name: "",
      email: "",
      user_uid: null,
      verified: false,
      user_image: "",
      password: "",
      auth: {
        email: "",
        password: "",
      },
      image: null,
    };
  },
  methods: {
    signUpFacebook() {
      const provider = new this.$fireModule.auth.FacebookAuthProvider();
      this.$fire.auth
        .signInWithPopup(provider)
        .catch((error) => {
          console.log(error);
        })
        .then((user) => {
          this.snackbar = true;
          this.snackbarText = "Sign up  success";
          window.location.reload(true);
        });
    },
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

          this.user_name = this.$fire.auth.currentUser.displayName;
          this.email = this.$fire.auth.currentUser.email;
          this.user_uid = this.$fire.auth.currentUser.uid;
          this.user_image = this.$fire.auth.currentUser.photoURL;
          this.verified = this.$fire.auth.currentUser.emailVerified;
          window.location.reload(true);
          this.console.log(this.$fire.auth.currentUser.uid);
        });
    },
    signUpFacebook1() {
      const provider = new this.$fireModule.auth.FacebookAuthProvider();
      this.$fire.auth
        .signInWithPopup(provider)
        .catch((error) => {
          console.log(error);
        })
        .then((user) => {
          this.snackbar = true;
          this.snackbarText = "Sign up  success";
          this.AddUser(user.user.uid);
        });
    },
    signUpGoogle1() {
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
          this.AddUser(user.user.uid);
          that.snackbar = true;
          that.snackbarText = "Sign up success";

          this.user_name = this.$fire.auth.currentUser.displayName;
          this.email = this.$fire.auth.currentUser.email;
          this.user_uid = this.$fire.auth.currentUser.uid;
          this.user_image = this.$fire.auth.currentUser.photoURL;
          this.verified = this.$fire.auth.currentUser.emailVerified;
          this.console.log(this.$fire.auth.currentUser.uid);
        });
    },
    loginAnonymously() {
      signInAnonymously();
      mAuth
        .signInAnonymously()
        .catch(function (error) {
          that.snackbarText = error.message;
          that.snackbar = true;
          that.showLogin = false;
        })
        .then((user) => {
          that.showLogin = false;
          this.userAuth = true;
          //we are signed in
        });
    },
    login() {
      let that = this;
      that.progress_bar = true;
      const mAuth = this.$fire.auth;
      mAuth
        .signInWithEmailAndPassword(this.auth.email, this.auth.password)
        .catch(function (error) {
          that.snackbarText = error.message;
          that.snackbar = true;
          that.progress_bar = false;
          window.location.reload(true);
        })
        .then((user) => {
          that.progress_bar = false;
          //we are signed in
          this.AddUser(user.user.uid);
        });
    },
    signUp() {
      if ((this.user_name == "") | (this.auth.email == "")) {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide  details";
      } else if (this.auth.password == "") {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide  password";
      } else {
        const mAuth = this.$fire.auth;
        this.progress_bar2 = true;
        // if (this.password === this.registrationPassword) {
        mAuth
          .createUserWithEmailAndPassword(this.auth.email, this.auth.password)
          .catch((error) => {
            console.log(error);
            this.snackbar2 = true;
            this.snackbarText2 = error;
            this.progress_bar2 = false;
          })
          .then((user) => {
            this.storeUserDetails();
          });
      }
    },
    storeUserDetails() {
      if ((this.user_name == "") | (this.auth.email == "")) {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide required fields";
      } else if (this.auth.password == "") {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide password";
      } else {
        const db = this.$fire.firestore;
        db.collection("Members")
          .doc(this.$fire.auth.currentUser.uid)
          .set({
            user_name: this.user_name,
            email: this.auth.email,
            image: this.image,
            member: true,
            user_uid: this.$fire.auth.currentUser.uid,
          })
          .then((docRef) => {
            console.log("Registration  success: ");
            this.snackbar = true;
            this.progress_bar2 = false;
            this.snackbarText = "Registration  success";
            window.location.reload(true);
          })
          .catch((error) => {
            this.snackbar2 = true;
            this.snackbarText2 = error;
            this.progress_bar2 = false;
            console.error("Error adding listing: ", error);
          });
      }
    },
    forgotPassword() {
      let that = this;
      that.showLogin = true;
      this.$fire.auth
        .sendPasswordResetEmail(this.auth.email)
        .then(function () {
          that.snackbarText = "reset link sent to " + that.auth.email;
          that.snackbar = true;
          that.showLogin = false;
        })
        .catch(function (error) {
          that.snackbarText = error.message;
          that.snackbar = true;
          that.showLogin = false;
        });
    },
    AddUser(val) {
      if (val == null) {
      } else {
        const db = this.$fire.firestore;

        db.collection("Members")
          .doc(val)
          .set({
            user_uid: val,
            user_name: this.$fire.auth.currentUser.displayName,
            email: this.$fire.auth.currentUser.email,
            image: this.$fire.auth.currentUser.photoURL,
            member: this.$fire.auth.currentUser.emailVerified,
          })
          .then((docRef) => {
            // this.dropState = true;
            this.snackbar = true;
            this.snackbarText = "Document member written";
            window.location.reload(true);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            this.snackbar2 = true;
            this.snackbarText2 = error;
          });
      }
    },

    AddUser2(val) {
      if (val == null) {
      } else {
        const db = this.$fire.firestore;

        db.collection("Members")
          .doc(val)
          .set({
            user_uid: val,
            user_name: this.user_name,
            email: this.auth.email,
            image: null,
            member: true,
          })
          .then((docRef) => {
            // this.dropState = true;
            this.snackbar = true;
            this.snackbarText = "Document member written";
            window.location.reload(true);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            this.snackbar2 = true;
            this.snackbarText2 = error;
          });
      }
    },
  },
};
</script>
<style >
</style>
