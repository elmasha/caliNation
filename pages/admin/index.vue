<template>
  <div>
    <div>
      <template>
        <div class="d-flex container">
          <div>
            <v-list-item class="grow">
              <v-list-item-avatar>
                <v-img :src="photo"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ user }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
          <v-spacer></v-spacer>
          <div></div>
          <div class="" style="margin: 8px">
            <nuxt-link id="nuxt-link" to="/"
              ><v-icon medium>mdi-home</v-icon> <span id="nav_span"></span
            ></nuxt-link>
          </div>
          <div class="" style="margin: 8px">
            <nuxt-link id="nuxt-link" to="/the-petite-studio"
              ><v-icon medium>mdi-store</v-icon> <span id="nav_span"></span
            ></nuxt-link>
          </div>

          <div class="" style="margin: 8px">
            <nuxt-link id="nuxt-link" to="/the-organized-edits"
              ><v-icon medium>mdi-puzzle-edit-outline</v-icon
              ><span id="nav_span"></span>
            </nuxt-link>
          </div>
          <div class="" style="margin: 8px">
            <nuxt-link id="nuxt-link" to="/the-hostess"
              ><v-icon medium>mdi-account-injury</v-icon
              ><span id="nav_span"></span>
            </nuxt-link>
          </div>
        </div>

        <v-card elevation="0">
          <v-tabs color="pink" :show-arrows="true">
            <v-tab
              @click="
                (order_state = false),
                  (upload_state = false),
                  (member_state = true),
                  (booking_state = false),
                  (discount_state = false)
              "
              value="one"
              >Registered members</v-tab
            >
            <v-tab
              value="two"
              @click="
                (order_state = true),
                  (upload_state = false),
                  (member_state = false),
                  (booking_state = false),
                  (discount_state = false)
              "
            >
              Live Orders</v-tab
            >
            <v-tab
              value="three"
              @click="
                (order_state = false),
                  (upload_state = true),
                  (member_state = false),
                  (booking_state = false),
                  (discount_state = false)
              "
            >
              Upload Stock</v-tab
            >
            <v-tab
              value="three"
              @click="
                (order_state = false),
                  (upload_state = false),
                  (member_state = false),
                  (booking_state = false),
                  (discount_state = true)
              "
            >
              My Stock</v-tab
            >
            <v-tab
              value="three"
              @click="
                (order_state = false),
                  (upload_state = false),
                  (member_state = false),
                  (discount_state = false),
                  (booking_state = true)
              "
            >
              Bookings</v-tab
            >
          </v-tabs>
        </v-card>
        <div>
          <v-row>
            <v-col v-show="member_state" md="12" cols="12" lg="12" sm="12">
              <members />
            </v-col>
            <v-col v-show="order_state" md="12" cols="12" lg="12" sm="12">
              <myOrders />
            </v-col>
            <v-col v-show="upload_state" md="12" cols="12" lg="12" sm="12">
              <uploadStock />
            </v-col>
            <v-col v-show="discount_state" md="12" cols="12" lg="12" sm="12">
              <discount />
            </v-col>
            <v-col v-show="booking_state" md="12" cols="12" lg="12" sm="12">
              <bookings />
            </v-col>
          </v-row>
        </div>
      </template>
    </div>
    <v-snackbar
      color="green accent-8"
      :timeout="2000"
      v-model="snackbar"
      bottom
      outlined
    >
      {{ snackbarText }}
    </v-snackbar>
    <v-snackbar
      color="red accent-8"
      :timeout="2000"
      v-model="snackbar2"
      centered
      outlined
    >
      {{ snackbarText2 }}
    </v-snackbar>
  </div>
</template>
<script>
import { uuid } from "vue-uuid";
import myOrders from "/components/myOrders";
import uploadStock from "/components/uploadStock";
import members from "/components/members";
import discount from "/components/discount";
import bookings from "/components/bookings";

export default {
  middleware: "auth",
  components: {
    myOrders,
    uploadStock,
    members,
    discount,
    bookings,
  },
  data() {
    return {
      empty_user: require("@/assets/user.png"),
      member_state: true,
      booking_state: false,
      discount_state: false,
      order_state: false,
      upload_state: false,
      tab: null,
      searchBrand: "",
      searchCat: "",
      scrollInvoked: 0,
      cloth_name: "",
      cloth_category: "",
      cloth_type: "",
      cloth_size: "",
      cloth_description: "",
      cloth_gender: "",
      cloth_price: "",
      cloth_status: "",
      products: [],
      all_products: [],
      brands: [],
      categories: [],
      types: [],
      units: "",
      nameRules: [
        (v) => !!v || "Field is required",
        (v) => (v && v.length <= 18) || "Field must be less than 10 characters",
      ],
      nameRules2: [
        (v) => !!v || "Field is required",
        (v) => (v && v.length <= 18) || "Field must be less than 10 characters",
      ],

      cate: "",
      cat_ID: "",
      new_cat_id: "",
      inputCat: "",
      user: "",
      photo: "",
      snackbar: false,
      snackbarText: "",
      snackbar2: false,
      snackbarText2: "",
      posterUrl: "",
      images: [],
      units: [],
      id: "",
      idd: "",
      state: null,
    };
  },
  mounted() {},
  created() {
    if (this.$fire.auth.currentUser == null) {
      this.user = "Admin";
      this.photo = this.empty_user;
    } else {
      this.user = this.$fire.auth.currentUser.displayName;
      this.photo = this.$fire.auth.currentUser.photoURL;
      console.log(this.$fire.auth.currentUser);
    }
  },
  methods: {
    onScroll() {
      this.scrollInvoked++;
    },
  },
};
</script>
<style>
#nuxt-link {
  text-decoration: none;
  margin-top: 12px;
}
#nav_span {
  font-size: 13px;
  margin-top: 1.4rem;
}
</style>
