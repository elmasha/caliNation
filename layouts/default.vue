<template>
  <v-app dark>
    <v-main>
      <Nuxt />
    </v-main>
    <footer bottom fixed>
      <v-card color="black" dark>
        <v-row>
          <v-col cols="6" md="4">
            <div class="container">
              <h4 style="font-weight: 200">Cali-Nation</h4>
              <p style="font-size: 0.6rem; color: grey">The right place to shop</p>
              <div class="d-flex"></div>
            </div>
          </v-col>
          <v-col cols="6" md="4">
            <div class="container">
              <h4 style="font-weight: 200">Follow us on</h4>
              <div class="d-flex">
                <a href="" style="margin: 2px"> <v-icon small>mdi-facebook</v-icon></a>
                <a href="" style="margin: 2px"> <v-icon small>mdi-instagram</v-icon></a>
                <a href="" style="margin: 2px"> <v-icon small>mdi-whatsapp</v-icon></a>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <div class="container text-center">
              <span style="font-size: 0.6rem; color: grey"> © Copyright Cali-Nation</span>
              <span style="font-size: 0.6rem; color: grey"> All Rights Reserved</span
              ><br />
              <span style="font-size: 0.6rem; color: grey">
                Designed by Elmasha tech solutions</span
              >
            </div>
          </v-col>
        </v-row>
      </v-card>
    </footer>
  </v-app>
</template>

<script>
import { uuid } from "vue-uuid";
import footer from "/components/footer";

export default {
  name: "DefaultLayout",
  components: {
    footer,
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Charge24 Mpesa",
    };
  },
};
</script>
<style>
* {
  font-family: "Lato";
}

.section span {
  position: relative;
  display: block;
  width: calc(6.25vw - 2px);
  height: calc(6.25vw - 2px);
  background: #181818;
  z-index: 2;
  transition: 1.5s;
}
.section span:hover {
  background: #0f0;
  transition: 0s;
}

.section .signin {
  position: absolute;
  width: 80%;
  background: #222;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  padding: 0px;
  border-radius: 4px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 9);
}

/* @media (max-width: 100%) {
  .section span {
    width: calc(10vw - 2px);
    height: calc(10vw - 2px);
  }
}
@media (max-width: 600px) {
  .section span {
    width: calc(20vw - 2px);
    height: calc(20vw - 2px);
  }
} */
</style>
