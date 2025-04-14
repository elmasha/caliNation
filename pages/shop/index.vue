<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      mini-variant="120"
      :clipped="clipped"
      fixed
      expand-on-hover
    >
      <v-list>
        <v-list-item style="padding: 8px" v-show="auth_State">
          <v-list-item-avatar>
            <v-img :src="showImage(user_image)"
              ><template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="pink"></v-progress-circular>
                </v-row> </template
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ user_name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="white" elevation="0" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon color="black" @click.stop="drawer = !drawer" />
      <v-spacer />
      <v-img :src="header" contain height="40" max-width="150"> </v-img>
      <v-spacer />
      <v-toolbar-title id="nav_title">{{ title }}</v-toolbar-title>

      <v-btn
        icon
        v-show="!auth_State"
        :color="checkColor(auth_State)"
        @click="dialog_v = true"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn icon v-show="auth_State" :color="checkColor(auth_State)">
        <v-icon>mdi-account-badge</v-icon>
      </v-btn>

      <nuxt-link class="nuxt-link" :to="`/cartlist/${My_Order_id}`">
        <v-btn icon color="black">
          <v-icon>mdi-cart-variant</v-icon>
          <span id="span_count">{{ cartCount }}</span>
        </v-btn>
      </nuxt-link>

      <v-btn color="black" v-show="auth_State" @click="dialog_logout = true" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-row id="header_row" justify="start" align="start">
      <v-col cols="12" sm="12" md="12" lg="12">
        <div class="text-center">
          <p id="p_header">
            A style studio & Boutique ,Bringing you fashionable pieces to suit any Style
            and Occasion.
          </p>
        </div>
      </v-col>
      <v-col v-show="false" cols="12" sm="12" md="12" lg="12">
        <v-card elevation="0">
          <div class="container text-center">
            <div>
              <v-carousel
                cycle
                height="70"
                hide-delimiter-background
                :show-arrows="false"
              >
                <v-carousel-item v-for="(slide, i) in slides" :key="i">
                  <v-sheet height="100%">
                    <div class="text-h6">
                      <span>{{ slide.name }}</span>
                    </div>
                  </v-sheet>
                </v-carousel-item>
              </v-carousel>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="start" align="start">
      <v-col cols="12" sm="12" md="12">
        <v-tabs
          centered
          center-active
          align-content-start
          background-color="white"
          color="pink--text"
        >
          <v-tabs-slider color="pink"></v-tabs-slider>

          <v-tab
            @click="fetchSearch28('New Arrival'), (type_search_layout = false)"
            color="pink"
            class="black--text"
            dark
          >
            <v-icon>mdi-refresh</v-icon>
            New Arrival
          </v-tab>
          <v-menu offset-y open-on-hover>
            <template v-slot:activator="{ on, attrs }">
              <v-tab
                class="black--text"
                @click="fetchSearch('Clothing')"
                color="pink"
                dark
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-hanger</v-icon>
                CLOTHING
              </v-tab>
            </template>
            <v-list>
              <v-list-item v-for="(item, ii) in items22" :key="ii">
                <v-list-item-title @click="fetchGenderState(item.title)">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-tab
            class="black--text"
            active-class="pink-text"
            v-for="i in category"
            :key="i"
            @click="fetchSearch(i.title), (type_search_layout = false)"
          >
            <div>
              <v-icon>{{ i.icon }}</v-icon>
              {{ i.title }}
            </div>
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <div>
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <div>
            <v-row justify="center" align="center">
              <v-col cols="12" sm="12" md="12" lg="12">
                <div v-show="type_search_layout">
                  <div class="container pink--text">
                    <h4>{{ search_t }}</h4>
                  </div>
                  <div class="pa-4">
                    <v-item-group multiple row>
                      <v-item v-for="(ty, idt) in types" :key="idt">
                        <v-chip
                          style="margin: 2px"
                          filter
                          active-class="black--text"
                          @click="fetchAll(ty.type)"
                        >
                          {{ ty.type }}
                        </v-chip>
                      </v-item>
                    </v-item-group>
                  </div>
                  <br />
                </div>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12">
                <div class="container">
                  <div class="row">
                    <div class="row" align="start" id="all_items">
                      <div
                        v-for="(all_product, idx) in all_products"
                        :key="idx"
                        class="col-lg-md-3"
                        style="padding: 15px"
                      >
                        <v-card
                          elevation="0.1"
                          class=""
                          color="#fff"
                          max-width="310"
                          width="310"
                        >
                          <v-expand-transition>
                            <nuxt-img
                              :src="all_product.cloth_image"
                              fit="cover"
                              width="310"
                              height="310"
                              :quality="20"
                              placeholder
                            >
                            </nuxt-img>
                          </v-expand-transition>

                          <v-card-text class="pt-2" style="position: relative">
                            <v-btn
                              absolute
                              color="black"
                              class="white--text"
                              fab
                              small
                              right
                              top
                              @click="
                                (row = null),
                                  FetchItem(all_product.id),
                                  (count = 1),
                                  (select_size = ''),
                                  (cloth_image = all_product.cloth_image),
                                  (cloth_name = all_product.cloth_name),
                                  (cloth_type = all_product.cloth_type),
                                  (cloth_price = all_product.cloth_price),
                                  (cloth_size = all_product.cloth_size),
                                  (cloth_discount = all_product.cloth_discount),
                                  (S = all_product.S),
                                  (M = all_product.M),
                                  (L = all_product.L),
                                  (All_size = all_product.All_size),
                                  (viewItemDialog = true),
                                  queryCategory(
                                    all_product.cloth_name +
                                      all_product.cloth_type +
                                      all_product.cloth_category
                                  )
                              "
                            >
                              <v-icon>mdi-basket-plus</v-icon>
                            </v-btn>
                            <div class="font-weight-light black--text text-h6 mb-1">
                              <div class="" style="padding: 10px">
                                <h4>{{ all_product.cloth_name }}</h4>

                                <h4>{{ all_product.cloth_type }}</h4>
                              </div>
                            </div>
                            <div
                              class="font-weight-light black--text text-h6 mb-0 text-center"
                            ></div>

                            <div class="text-center d-flex">
                              <h3 class="text-h3 font-weight-light black--text mb-1">
                                <div id="pricing">
                                  <span v-show="all_product.cloth_discount"
                                    ><h2 id="price">
                                      <v-icon>mdi-cash-multiple</v-icon>
                                      <strong
                                        >{{
                                          discount(all_product.cloth_price)
                                        }}Ksh</strong
                                      >
                                    </h2>
                                    <h4>
                                      <strong id="price">
                                        <strike>
                                          {{ all_product.cloth_price }}Ksh</strike
                                        ></strong
                                      >
                                    </h4>
                                  </span>
                                  <span v-show="!all_product.cloth_discount"
                                    ><h2 id="price">
                                      <v-icon>mdi-cash-multiple</v-icon>
                                      <strong>{{ all_product.cloth_price }}Ksh</strong>
                                    </h2>
                                  </span>
                                </div>
                                <v-row>
                                  <v-spacer></v-spacer>
                                  <v-col cols="6" md="6" lg="6"> </v-col>
                                  <v-col cols="6" md="6" lg="6"> </v-col>
                                  <v-spacer></v-spacer>
                                </v-row>
                                <div id="pricing">
                                  <div class="d-flex">
                                    <div></div>
                                    <div v-show="!all_product.cloth_discount"></div>
                                  </div>
                                </div>
                              </h3>
                              <v-spacer></v-spacer>
                              <div>
                                <div>
                                  <h4>Size</h4>

                                  <v-row>
                                    <v-col
                                      v-show="checkSizeState(all_product.cloth_category)"
                                    >
                                      <div class="d-flex">
                                        <span>
                                          <v-icon color="black">mdi-hanger</v-icon>
                                        </span>
                                        <div v-show="all_product.S">
                                          <h4><strong>S</strong></h4>
                                        </div>
                                        -
                                        <div v-show="all_product.M">
                                          <h4><strong>M</strong></h4>
                                        </div>
                                        -
                                        <div v-show="all_product.L">
                                          <h4><strong>L</strong></h4>
                                        </div>
                                      </div></v-col
                                    >
                                    <v-col
                                      v-show="!checkSizeState(all_product.cloth_category)"
                                      >{{ all_product.cloth_size }}</v-col
                                    >
                                  </v-row>
                                </div>
                              </div>
                            </div>
                          </v-card-text>
                        </v-card>
                      </div>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
        <v-fab-transition>
          <v-btn color="#25d366" class="pink--text" fab dark medium fixed bottom right>
            <a id="mainwhapp" href="https://wa.me/message/HCBCYVGTNWCUC1">
              <v-icon color="white" large>mdi-whatsapp</v-icon>
            </a>
          </v-btn>
        </v-fab-transition>
        <v-fab-transition>
          <v-btn
            v-show="TrackOrder(Order_state)"
            color="black"
            class="white--text"
            fab
            dark
            medium
            fixed
            bottom
            left
            :to="`/track-order/${track_id}`"
          >
            <v-icon large>{{ deliver }}</v-icon>
            <nuxt-link :to="`/track-order/${track_id}`"></nuxt-link>
          </v-btn>
        </v-fab-transition>
      </v-row>
      <div>
        <v-row>
          <v-col cols="12" lg="12" md="12" sm="12"> </v-col>
          <v-col> </v-col>
        </v-row>
      </div>

      <v-dialog v-model="dialog_v" max-width="800" min-width="400">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-card>
              <div class="">
                <div class="container">
                  <div class="d-flex">
                    <div class="text-center container"></div>
                    <v-spacer></v-spacer>
                    <v-btn icon color="red" @click="dialog_v = false"
                      ><v-icon>mdi-close</v-icon></v-btn
                    >
                  </div>
                  <div>
                    <loginVue />
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-dialog>
      <v-dialog v-model="dialog_logout" max-width="300">
        <v-card max-width="300">
          <div class="">
            <div class="container">
              <div class="d-flex" style="align-items: center">
                <v-spacer></v-spacer>
                <div class="text-center">
                  <v-img :src="logout_logo" cover width="60" height="60"></v-img>
                </div>
                <v-spacer></v-spacer>
              </div>
              <v-row class="text-center">
                <V-col cols="12" md="12" lg="12" sm="12">
                  <div class="text-center container">
                    <h3 id="logout_text">Are you sure you want to Log Out.</h3>
                  </div>
                </V-col>

                <v-col cols="6" md="6" lg="6" sm="6"
                  ><v-btn
                    density="compact"
                    color="black"
                    text
                    id="cart_btn"
                    @click="dialog_logout = false"
                    >No
                  </v-btn></v-col
                >
                <v-col cols="6" md="6" lg="6" sm="6">
                  <v-btn density="compact" color="red" text id="cart_btn" @click="logout"
                    >Yes
                  </v-btn></v-col
                >
                <v-col cols="12" md="12" lg="12" sm="12" align="center" justify="center">
                </v-col>
              </v-row>
            </div>
          </div>
        </v-card>
      </v-dialog>
      <v-dialog v-model="viewItemDialog" max-width="800" min-width="400">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-card>
              <v-progress-linear
                v-show="progress_upload"
                indeterminate
                color="secondary"
              ></v-progress-linear>
              <div class="">
                <div class="container">
                  <div class="d-flex">
                    <div class="text-center container"></div>
                    <v-spacer></v-spacer>
                    <v-btn
                      icon
                      color="red"
                      @click="(viewItemDialog = false), (queryStatus = null)"
                      ><v-icon>mdi-close</v-icon></v-btn
                    >
                  </div>
                  <v-row class="">
                    <V-col cols="12" md="6" lg="6" sm="12">
                      <v-img
                        height="250"
                        max-height="250"
                        class="align-end"
                        cover
                        :contain="true"
                        width="100%"
                        :src="cloth_image"
                      >
                        <template v-slot:placeholder>
                          <v-row class="fill-height ma-0" align="center" justify="center">
                          </v-row>
                        </template>
                      </v-img>
                    </V-col>
                    <V-col cols="12" md="6" lg="6" sm="12">
                      <div class="d-flex" style="padding: 10px">
                        <div class="container">
                          <h3>{{ cloth_name }}</h3>

                          <h4>{{ cloth_type }}</h4>
                        </div>
                        <v-spacer></v-spacer>
                        <div class="container">
                          <div>
                            <div class="d-flex">
                              <span>
                                <v-icon color="black">mdi-hanger</v-icon>
                              </span>
                              <div v-show="S">
                                <h4><strong>S</strong></h4>
                              </div>
                              -
                              <div v-show="M">
                                <h4><strong>M</strong></h4>
                              </div>
                              -
                              <div v-show="L">
                                <h4><strong>L</strong></h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr style="color: #808080" />
                      <div class="container">
                        <h3>Select a size</h3>
                        <v-radio-group v-model="row" row>
                          <v-radio
                            v-show="S"
                            @click="select_size = 'S'"
                            label=" S"
                            value="S"
                          ></v-radio>
                          <v-radio
                            v-show="M"
                            label=" M"
                            @click="select_size = 'M'"
                            value="M"
                          ></v-radio>
                          <v-radio
                            v-show="L"
                            label=" L"
                            @click="select_size = 'L'"
                            value="L"
                          ></v-radio>
                          <v-radio
                            v-show="All_size"
                            label="All size"
                            @click="select_size = 'All size'"
                            value="All size"
                          ></v-radio>
                        </v-radio-group>
                      </div>

                      <div class="container">
                        <h3>Select Quantity</h3>
                        <div class="d-flex">
                          <span
                            ><v-btn id="minus" color="black" icon @click="decrease"
                              ><v-icon>mdi-minus</v-icon></v-btn
                            ></span
                          >
                          <h2>
                            <p>{{ count }}</p>
                          </h2>
                          <v-btn id="plus" color="black" icon @click="increase"
                            ><v-icon>mdi-plus</v-icon></v-btn
                          >
                        </div>
                        <div class="d-flex">
                          <h4>
                            For {{ count }} you will pay
                            <h3>
                              <strong>{{ total_amount }} Ksh </strong>
                            </h3>
                          </h4>
                        </div>
                      </div>
                      <v-btn
                        density="compact"
                        color="black"
                        id="cart_btn"
                        @click="checkCurrentState(total_amount)"
                        >Add <v-icon>mdi-plus</v-icon></v-btn
                      >
                    </V-col>
                    <!-- FetchUser(), checkOrder() -->
                    <V-col v-show="!showauth">
                      <v-row align="center" justify="center">
                        <v-col v-show="false" cols="12" md="6" lg="6" sm="12"
                          ><v-btn text color="primary" @click="signUpFacebook">
                            <v-icon>mdi-facebook</v-icon>&nbsp;Log in with facebook
                          </v-btn></v-col
                        >
                        <v-col cols="12" md="6" lg="6" sm="12"
                          ><v-btn text color="red" @click="signUpGoogle">
                            <v-icon>mdi-google</v-icon>&nbsp;Log in with google
                          </v-btn></v-col
                        >
                      </v-row>
                    </V-col>
                  </v-row>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-dialog>
      <v-snackbar
        color="pink"
        :timeout="18000"
        v-model="snackbar_login"
        top
        right
        light
        style="margin-top: 42px"
        @click="dialog_v = true"
      >
        {{ snackbar_login_text }} (Click <v-icon small>mdi-account</v-icon> to login )
      </v-snackbar>
      <v-snackbar color="white--text" :timeout="4000" v-model="snackbar" center>
        {{ snackbarText }}
      </v-snackbar>
      <v-snackbar color="red" :timeout="4000" v-model="snackbar2" outlined bottom center>
        {{ snackbarText2 }}
      </v-snackbar>
      <default :showauth="showauth" />
    </div>
  </div>
</template>
<script>
import { uuid } from "vue-uuid";
import loginVue from "../../components/login.vue";

export default {
  components: {
    loginVue,
  },

  data() {
    return {
      global_category: "",
      row: null,
      select_size: "",
      S: false,
      M: false,
      L: false,
      All_size: false,
      sizes: ["S", "M", "L", "ALL"],
      search_t: null,
      type_search_layout: false,
      progress_upload: false,
      track_id: null,
      Order_state: null,
      item_idd: null,
      queryStatus: null,
      queryCart_id: null,
      My_Order_id: null,
      dialog_v: false,
      snackbar_login: false,
      snackbar_login_text: "",
      dis_per: 0,
      dialog_logout: false,
      total: null,
      genders: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
      auth_State: false,
      clipped: false,
      drawer: false,
      fixed: false,
      nameRules: [
        (v) => !!v || "Field is required",
        (v) => (v && v.length <= 18) || "Field must be less than 10 characters",
      ],
      items22: [{ title: "Women style" }, { title: "Men style" }],
      items: [
        {
          icon: "mdi-home",
          title: "Home",
          to: "/",
        },

        {
          icon: "mdi-puzzle-edit-outline",
          title: "The Organized Edits",
          to: "/the-organized-edits",
        },
        {
          icon: "mdi-account-injury",
          title: "The hostess",
          to: "/the-hostess",
        },
        {
          icon: "",
          title: "-",
          to: "/admin",
        },
      ],
      category: [
        {
          icon: "mdi-ring",
          title: "Accessories",
        },
        {
          icon: "mdi-home-assistant",
          title: "Home & Living",
        },
        {
          icon: "mdi-sale",
          title: "Sale",
        },
        {
          icon: "mdi-cart-heart",
          title: "Pre-order",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "",
      cartCount: 0,
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
      slides: [
        {
          name: "Discount this Weekend @40%",
          src: require("@/assets/categories/cat_men1.jpg"),
        },
        {
          name: "Featured",
          src: require("@/assets/men.jpeg"),
        },
        {
          name: "Flash Sale",
          src: require("@/assets/women.jpg"),
        },
        {
          name: "35% Discount",
          src: require("@/assets/kid.jpg"),
        },
      ],
      header: require("@/assets/main/pt_studio.jpg"),
      men: require("@/assets/categories/cat_men1.jpg"),
      women: require("@/assets/women.jpg"),
      kid: require("@/assets/kid.jpg"),
      logout_logo: require("@/assets/logout.png"),
      cloth_cat: "",
      all_products: [],
      new_products: [],
      types: [],
      scrollInvoked: 0,
      cloth_name: "",
      cloth_category: "",
      cloth_image: "",
      cloth_size: "",
      cloth_price: 0,
      cloth_status: "",
      cloth_type: "",
      count: 1,
      total_amount: 0,
      t_amount: 0,
      c_amount: 0,
      userAuth: false,
      cloth_id: "",
      queryState: 0,
      user_uid: null,
      verified: false,
      user_image: null,
      Total: 0,
      Order_id: null,
      cart_state: false,
      check_size: 0,
      existing_price: 0,
      empty_user: require("@/assets/user.png"),
      search_cat: null,
      search_gender: null,
      search_type: null,
      deliver: "mdi-moped",
    };
  },
  computed: {
    total_amount2() {
      const total_amount = this.count * this.cloth_price;
      console.log("TOtal", total_amount);
      return this.count * this.cloth_price;
    },
  },
  methods: {
    checkSizeState(val) {
      if (val == "Clothing") {
        return true;
      } else {
        return false;
      }
    },
    checkTypeState(val) {},
    showImage(val) {
      if (val == null) {
        return this.empty_user;
      } else {
        return val;
      }
    },
    TrackOrder(val) {
      if (val == null) {
        return false;
      } else if (val == 0) {
        this.deliver = "mdi-timeline-clock-outline";
        return true;
      } else if (val == 1) {
        this.deliver = "mdi-check-decagram ";
        return true;
      } else if (val == 2) {
        this.deliver = "mdi-truck-fast-outline";
        return true;
      } else if (val == 3) {
        this.deliver = "mdi-package-variant-closed-check";
        return true;
      } else if (val == 12) {
        return false;
      }
    },
    checkColor(val) {
      if (val == true) {
        return "green";
      } else {
        return "black";
      }
    },

    async MinusTotalAmount(val, val2) {
      // Create a reference to the SF doc.

      let tot = Number(this.t_amount) - Number(val);
      let tot1 = Number(tot) + Number(val2);

      console.log("Exist Price : ", tot, "New Price : ", val2, "Total : ", this.t_amount);
      if (this.Order_id != null) {
        const db = this.$fire.firestore;
        var sfDocRef = db.collection("Order_request").doc(this.Order_id);

        return db
          .runTransaction((transaction) => {
            // This code may get re-run multiple times if there are conflicts.
            return transaction.get(sfDocRef).then((sfDoc) => {
              console.log("Transaction : ", tot1);
              transaction.update(sfDocRef, { Total: Number(tot1) });
            });
          })
          .then(() => {
            console.log("Minus Transaction successfully committed!");
            this.uploadItems3(this.Order_id);
          })
          .catch((error) => {
            console.log("Transaction failed: ", error);
          });
      }
    },

    discount(val) {
      let discount_rate = this.dis_per / 100;
      let new_price = val * discount_rate;

      return new_price;
    },

    checkCartState(val, val2) {
      if (val != null) {
        console.log(val);
        this.FetchCartCount(val);
      } else if (val2 == false) {
        this.cartCount = 0;
      } else {
        this.cartCount = 0;
      }
    },
    logout() {
      this.dialog_logout = false;
      this.$fire.auth.signOut();

      window.location.reload(true);
    },
    FetchCartCount(val) {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .doc(val)
        .collection("item_list")
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            if (!doc.exists) {
              throw "Document does not exist!";
            }
            this.cartCount = queryResult.size;

            console.log("car counts", queryResult.size);
          });
        });
    },

    addItem() {
      if (this.queryState == 0) {
        console.log("New item cart" + this.queryState);
      } else if (this.queryState == 1) {
        console.log("Update item cart" + this.queryState);
      }
    },
    queryCategory(val) {
      if (this.Order_id != null) {
        const db = this.$fire.firestore;
        console.log("Query", val);
        db.collection("Order_request")
          .doc(this.Order_id)
          .collection("item_list")
          .where("item_id", "==", val)
          .get()
          .then((queryResult) => {
            queryResult.forEach((doc) => {
              this.check_size = queryResult.size;
              const data = {
                id: doc.id,
                item_id: doc.data().item_id,
                item_price: doc.data().item_price,
              };

              console.log("Item Details", doc.data(), "; Size", this.check_size);

              if (doc.data() != null) {
                this.queryStatus = data.item_id;
                this.existing_price = data.item_price;
                this.item_idd = data.id;
                console.log("Price", this.existing_price);
              }
              //else {
              //   console.log("This category null");
              // }
              // if (data.item_id != val) {
              //   this.queryStatus = data.item_id;
              //   console.log(
              //     "This category exists 2 ; Status",
              //     this.queryStatus
              //   );
              //   this.checkCurrentState();
              // }
            });
          });
      }
    },
    checkCurrentState(val) {
      this.progress_upload = true;
      var sta = 0;
      console.log("This state  size", this.check_size);
      sta = this.check_size;
      if (this.queryStatus == null) {
        console.log("This state  sta__5555");
        this.checkOrder();
        this.queryStatus = null;
      } else {
        console.log("This state  sta_5 ", sta);
        this.MinusTotalAmount(this.existing_price, val);
        this.queryStatus = null;
      }

      // if (this.queryStatus == false) {
      //   console.log("This state ", this.queryStatus);
      // } else if (this.queryStatus == true) {
      //   console.log("This state ", this.queryStatus);
      // }
    },
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
          this.userAuth = true;
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
          this.AddUser(user.user.uid);
          that.snackbar = true;
          that.snackbarText = "Sign up success";
          this.showauth = true;
          this.showLogin = true;
          this.auth_State = true;
          this.user_name = this.$fire.auth.currentUser.displayName;
          this.email = this.$fire.auth.currentUser.email;
          this.user_uid = this.$fire.auth.currentUser.uid;
          this.user_image = this.$fire.auth.currentUser.photoURL;
          this.verified = this.$fire.auth.currentUser.emailVerified;
          this.console.log(this.$fire.auth.currentUser.uid);
        });
    },
    loginAnonymously() {
      const mAuth = this.$fire.auth;
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
      that.showLogin = true;
      const mAuth = this.$fire.auth;
      mAuth
        .signInWithEmailAndPassword(this.auth.email, this.auth.password)
        .catch(function (error) {
          that.snackbarText = error.message;
          that.snackbar = true;
          that.showLogin = false;
        })
        .then((user) => {
          that.showLogin = false;
          //we are signed in
          this.dialog4 = false;
        });
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
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            this.snackbar2 = true;
            this.snackbarText2 = error;
          });
      }
    },

    checkOrder() {
      if (this.$fire.auth.currentUser != null) {
        if (this.Order_id != null) {
          this.UpdateToRequest(this.Order_id);
          console.log("Update order");
        } else if (this.Order_id == null) {
          this.AddToRequest();
          console.log("New order");
        }
      } else {
        this.progress_upload = false;
        this.snackbar2 = true;
        this.snackbarText2 = "You're not Logged in please signup";
      }
    },
    UpdateToRequest(val) {
      if (this.$fire.auth.currentUser == null) {
      } else {
        const db = this.$fire.firestore;
        console.log(val);

        this.uploadItems2(val);
        this.UpdateTotalAmount(this.total_amount, val);

        // db.collection("Order_request")
        //   .doc(val)
        //   .update({
        //     timestamp: new Date(),
        //     cart: true,
        //   })
        //   .then((docRef) => {
        //     // this.dropState = true;
        //     this.uploadItems2(this.Order_id);
        //     this.UpdateTotalAmount(this.total_amount, val);
        //   })
        //   .catch((error) => {
        //     console.error("Error adding document: ", error);
        //     this.snackbar2 = true;
        //     this.snackbarText2 = error;
        //   });
      }
    },
    AddToRequest() {
      if (this.$fire.auth.currentUser == null) {
      } else {
        if (this.select_size == "") {
          this.snackbar2 = true;
          this.snackbarText2 = "Select a size";
          this.progress_upload = false;
        } else {
          const db = this.$fire.firestore;
          let id = uuid.v1();

          let ID3 = this.$fire.auth.currentUser.uid + id;
          console.log("Order ID", ID3);

          console.error("My Order ID: ", ID3);
          db.collection("Order_request")
            .doc(ID3)
            .set({
              timestamp: new Date(),
              Order_id: ID3,
              Total: Number(this.total_amount),
              cart: true,
              paid: false,
              user_Id: this.$fire.auth.currentUser.uid,
            })
            .then((docRef) => {
              // this.dropState = true;
              db.collection("Members")
                .doc(this.$fire.auth.currentUser.uid)
                .update({
                  Order_id: ID3,
                  cart: true,
                })
                .then((docRef) => {
                  // this.dropState = true;
                  this.uploadItems(ID3);
                  this.FetchCartCount();
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                  this.snackbar2 = true;
                  this.snackbarText2 = error;
                });
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
              this.snackbar2 = true;
              this.snackbarText2 = error;
            });
        }
      }
    },
    uploadItems3(val) {
      const db = this.$fire.firestore;
      let ID = this.cloth_name + this.cloth_type + this.cloth_category;
      db.collection("Order_request")
        .doc(val)
        .collection("item_list")
        .doc(ID)
        .set({
          item_category: this.cloth_category,
          item_type: this.cloth_type,
          item_image: this.cloth_image,
          item_quantity: this.count,
          item_brand: this.cloth_name,
          item_id: ID,
          item_price: this.total_amount,
        })
        .then((docRef) => {
          // this.dropState = true;
          this.snackbar = true;
          this.snackbarText = "Add to Cart";
          this.viewItemDialog = false;
          this.count = 1;
          this.FetchCartCount();
          this.FetchOrder();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.dropState = true;
          this.snackbarText2 = error;
        });
    },
    uploadItems(val) {
      const db = this.$fire.firestore;
      let ID = this.cloth_name + this.cloth_type + this.cloth_category;
      db.collection("Order_request")
        .doc(val)
        .collection("item_list")
        .doc(ID)
        .set({
          item_category: this.cloth_category,
          item_type: this.cloth_type,
          item_image: this.cloth_image,
          item_quantity: this.count,
          item_brand: this.cloth_name,
          item_size: this.select_size,
          item_id: ID,
          item_price: Number(this.total_amount),
        })
        .then((docRef) => {
          // this.dropState = true;
          this.snackbar = true;
          this.snackbarText = "Add to Cart";
          this.viewItemDialog = false;
          this.progress_upload = false;

          this.count = 1;
          this.FetchCartCount();
          this.FetchOrder();
          this.FetchUser();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.dropState = true;
          this.progress_upload = false;

          this.snackbarText2 = error;
        });
    },
    uploadItems2(val) {
      const db = this.$fire.firestore;
      let ID = this.cloth_name + this.cloth_type + this.cloth_category;
      db.collection("Order_request")
        .doc(val)
        .collection("item_list")
        .doc(ID)
        .set({
          item_category: this.cloth_category,
          item_type: this.cloth_type,
          item_image: this.cloth_image,
          item_quantity: this.count,
          item_brand: this.cloth_name,
          item_size: this.select_size,
          item_id: ID,
          item_price: this.total_amount,
        })
        .then((docRef) => {
          // this.dropState = true;
          this.snackbar = true;
          this.snackbarText = "Add to Cart";
          this.viewItemDialog = false;
          this.progress_upload = false;

          this.count = 1;
          this.FetchCartCount();
          this.FetchOrder();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.dropState = true;
          this.snackbarText2 = error;
          this.progress_upload = false;
        });
    },
    UpdateTotalAmount(val, val2) {
      // Create a reference to the SF doc.
      const db = this.$fire.firestore;
      var sfDocRef = db.collection("Order_request").doc(val2);

      return db
        .runTransaction((transaction) => {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(sfDocRef).then((sfDoc) => {
            let tot = Number(val) + Number(this.t_amount);
            transaction.update(sfDocRef, { Total: Number(tot) });
          });
        })
        .then(() => {
          console.log("New Transaction successfully committed!");
          this.FetchCartCount(val2);
        })
        .catch((error) => {
          console.log("Transaction failed: ", error);
        });
    },
    checkUserID() {
      if (this.$fire.auth.currentUser != null) {
        if (this.$fire.auth.currentUser.uid != null) {
          this.showauth = true;
          this.showLogin = true;
          this.auth_State = true;
          this.FetchUser();
          this.FetchOrder();
          this.FetchOrder2();
        } else {
          console.log("User no logged in");
          this.showLogin = false;
          this.showauth = false;
          this.auth_State = false;
          this.snackbar_login = true;
          this.snackbar_login_text = "You are not logged in";
        }
      } else {
        console.log("User no logged in");
        this.showLogin = false;
        this.showauth = false;
        this.auth_State = false;
        this.snackbar_login = true;
        this.snackbar_login_text = "You are not logged in";
      }
    },
    fomarter(val) {
      var value = val.toLocaleString(
        undefined, // leave undefined to use the visitor's browser
        // locale or a string like 'en-US' to override it.
        { minimumFractionDigits: 2 }
      );
      return val;
    },
    multiple(val) {
      this.total_amount = val * this.cloth_price;
      console.log("TOtal", this.total_amount);
    },
    decrease() {
      if (this.count == 1) {
      } else {
        this.count--;
        this.multiple(this.count);
      }
    },
    increase() {
      this.count++;
      this.multiple(this.count);
    },
    onScroll() {
      this.scrollInvoked++;
    },
    FetchItem(val) {
      const db = this.$fire.firestore;
      db.collection("My_Stock")
        .where("cloth_id", "==", val)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            if (!doc.exists) {
              throw "Document does not exist!";
            }
            console.log("car details", doc.data());
            this.viewItemDialog = true;
            this.cloth_id = doc.data().cloth_id;
            (this.cloth_name = doc.data().cloth_brand),
              (this.cloth_category = doc.data().cloth_category),
              (this.cloth_image = doc.data().cloth_image),
              (this.cloth_size = doc.data().cloth_size),
              (this.cloth_price = doc.data().cloth_price),
              (this.total_amount = doc.data().cloth_price),
              (this.cloth_size = doc.data().cloth_size),
              (this.cloth_status = doc.data().cloth_status),
              (this.cloth_type = doc.data().cloth_type);
          });
        });
    },
    FetchPricing() {
      const db = this.$fire.firestore;
      db.collection("Admin")
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            // this.dis_per = doc.data().discount;
            this.dis_per = doc.data().discount;
            console.log("Admin details", this.dis_per);
          });
        });
    },
    FetchNewArrivals() {
      const db = this.$fire.firestore;
      this.new_products.splice(this.new_products);
      db.collection("My_Stock")
        .where("cloth_status", "==", "New arrival")
        .get()
        .then((queryResult6) => {
          queryResult6.forEach((doc) => {
            const data = {
              id: doc.id,
              cloth_name: doc.data().cloth_brand,
              cloth_category: doc.data().cloth_category,
              cloth_image: doc.data().cloth_image,
              cloth_price: doc.data().cloth_price,
              cloth_size: doc.data().cloth_size,
              cloth_type: doc.data().cloth_type,
            };

            this.all_products.push(data);
            console.log(this.all_products);
          });
        });
    },
    FetchUser() {
      const db = this.$fire.firestore;
      db.collection("Members")
        .where("user_uid", "==", this.$fire.auth.currentUser.uid)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            console.log("user details", doc.data());
            this.Order_id = doc.data().Order_id;
            this.user_name = doc.data().user_name;
            this.user_image = doc.data().image;
            this.c_amount = doc.data().Total;
            this.checkCartState(doc.data().Order_id, doc.data().cart);
          });
        });
    },
    FetchOrder() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .where("user_Id", "==", this.$fire.auth.currentUser.uid)
        .where("cart", "==", true)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            console.log("Order details", doc.data());
            this.t_amount = doc.data().Total;
            this.cart_state = doc.data().cart;
            this.My_Order_id = doc.data().Order_id;
            this.cart_state = doc.data().cart;
            console.log("Cart state", this.cart_state);
          });
        });
    },
    FetchOrder2() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .where("user_Id", "==", this.$fire.auth.currentUser.uid)
        .where("cart", "==", false)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            this.track_id = doc.data().Order_id;
            this.Order_state = doc.data().order_status;
            console.log("Track id", this.track_id);
          });
        });
    },
    async FetchProducts2() {
      if ((this.item_name_s == null) | (this.item_type_s == null)) {
        const db = this.$fire.firestore;
        this.all_products.splice(this.all_products);
        db.collection("My_Stock")
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                cloth_name: doc.data().cloth_brand,
                cloth_category: doc.data().cloth_category,
                cloth_image: doc.data().cloth_image,
                cloth_size: doc.data().cloth_size,
                cloth_price: doc.data().cloth_price,
                cloth_type: doc.data().cloth_type,
                cloth_discount: doc.data().discount,
                All_size: doc.data().All_size,
                S: doc.data().S,
                M: doc.data().M,
                L: doc.data().L,
              };

              this.queryCart_id = data.cloth_name + data.cloth_type + data.cloth_category;
              this.all_products.push(data);
              console.log("Query ID", this.queryCart_id, this.all_products);
            });
          });
      } else {
        const db = this.$fire.firestore;
        this.products.splice(this.products);
        db.collection("My_Stock")
          .where("cloth_category", "==", this.cloth_cat)
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                cloth_name: doc.data().cloth_brand,
                cloth_category: doc.data().cloth_category,
                cloth_image: doc.data().cloth_image,
                cloth_size: doc.data().cloth_size,
                cloth_price: doc.data().cloth_price,
                cloth_type: doc.data().cloth_type,
                cloth_discount: doc.data().discount,
              };
              this.queryCart_id = data.cloth_name + data.cloth_type + data.cloth_category;
              this.products.push(data);
              console.log("Query ID", this.queryCart_id, this.all_products);
            });
          });
      }
    },

    fetchSearch28(val) {
      if (val != null) {
        const db = this.$fire.firestore;
        this.all_products.splice(this.all_products);
        db.collection("My_Stock")
          .where("cloth_status", "==", val)
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                cloth_name: doc.data().cloth_brand,
                cloth_category: doc.data().cloth_category,
                cloth_image: doc.data().cloth_image,
                cloth_size: doc.data().cloth_size,
                cloth_price: doc.data().cloth_price,
                cloth_size: doc.data().cloth_size,
                cloth_type: doc.data().cloth_type,
              };
              this.all_products.push(data);
              console.log(this.all_products);
            });
          });
      }
    },
    fetchSearch(val) {
      console.log("Category", val);
      if (val == null) {
        const db = this.$fire.firestore;
        this.all_products.splice(this.all_products);
        db.collection("My_Stock")
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                cloth_name: doc.data().cloth_brand,
                cloth_category: doc.data().cloth_category,
                cloth_image: doc.data().cloth_image,
                cloth_size: doc.data().cloth_size,
                cloth_price: doc.data().cloth_price,
                cloth_size: doc.data().cloth_size,
                cloth_type: doc.data().cloth_type,
                All_size: doc.data().All_size,
                S: doc.data().S,
                M: doc.data().M,
                L: doc.data().L,
              };

              this.all_products.push(data);
              console.log(this.all_products);
            });
          });
      } else if (val != null) {
        const db = this.$fire.firestore;
        this.all_products.splice(this.all_products);
        db.collection("My_Stock")
          .where("cloth_category", "==", val)
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                cloth_name: doc.data().cloth_brand,
                cloth_category: doc.data().cloth_category,
                cloth_image: doc.data().cloth_image,
                cloth_size: doc.data().cloth_size,
                cloth_price: doc.data().cloth_price,
                cloth_size: doc.data().cloth_size,
                cloth_type: doc.data().cloth_type,
              };
              this.all_products.push(data);
              console.log(this.all_products);
            });
          });
      }
    },
    fetchGenderState(val) {
      if (val != null) {
        this.search_t = val;
        if (val == "Men style") {
          this.fetchGender("Male");
          this.FetchSearchTypes("Male");
          this.search_gender = "Male";
          this.type_search_layout = true;
        } else if (val == "Women style") {
          this.fetchGender("Female");
          this.type_search_layout = true;
          this.FetchSearchTypes("Female");
          this.search_gender = "Female";
        }
      } else {
        this.search_t = null;
      }
    },
    fetchAll(val) {
      if (val != null) {
        console.log("Type is ", val);
        this.all_products.splice(this.all_products);
        const db = this.$fire.firestore;
        db.collection("My_Stock")
          .where("cloth_type", "==", val)
          .get()
          .then((queryResult7) => {
            queryResult7.forEach((doc) => {
              console.log(queryResult7.size);
              const data7 = {
                id: doc.id,
                cloth_name: doc.data().cloth_brand,
                cloth_category: doc.data().cloth_category,
                cloth_image: doc.data().cloth_image,
                cloth_size: doc.data().cloth_size,
                cloth_price: doc.data().cloth_price,
                cloth_size: doc.data().cloth_size,
                cloth_type: doc.data().cloth_type,
                All_size: doc.data().All_size,
                S: doc.data().S,
                M: doc.data().M,
                L: doc.data().L,
              };
              this.all_products.push(data7);
              console.log("Type", this.all_products);
            });
          });
      } else {
        console.log("Type is null");
      }
    },
    fetchGender(val) {
      if (val != null) {
        const db = this.$fire.firestore;
        this.all_products.splice(this.all_products);
        db.collection("My_Stock")
          .where("cloth_gender", "==", val)
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                cloth_name: doc.data().cloth_brand,
                cloth_category: doc.data().cloth_category,
                cloth_image: doc.data().cloth_image,
                cloth_size: doc.data().cloth_size,
                cloth_price: doc.data().cloth_price,
                cloth_size: doc.data().cloth_size,
                cloth_type: doc.data().cloth_type,
                All_size: doc.data().All_size,
                S: doc.data().S,
                M: doc.data().M,
                L: doc.data().L,
              };

              this.all_products.push(data);
              console.log(this.all_products);
            });
          });
      }
    },
    SearchFetchType(val) {
      if (val != null) {
        const db = this.$fire.firestore;
        this.all_products.splice(this.all_products);
        db.collection("My_Stock")
          .where("cloth_gender", "==", val)
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                cloth_name: doc.data().cloth_brand,
                cloth_category: doc.data().cloth_category,
                cloth_image: doc.data().cloth_image,
                cloth_size: doc.data().cloth_size,
                cloth_price: doc.data().cloth_price,
                cloth_size: doc.data().cloth_size,
                cloth_type: doc.data().cloth_type,
                All_size: doc.data().All_size,
                S: doc.data().S,
                M: doc.data().M,
                L: doc.data().L,
              };

              this.all_products.push(data);
              console.log(this.all_products);
            });
          });
      }
    },
    fetchSearchType(val) {
      if (val != null) {
        const db = this.$fire.firestore;
        this.all_products.splice(this.all_products);
        db.collection("My_Stock")
          .where("cloth_type", "==", val)
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                cloth_name: doc.data().cloth_brand,
                cloth_category: doc.data().cloth_category,
                cloth_image: doc.data().cloth_image,
                cloth_size: doc.data().cloth_size,
                cloth_price: doc.data().cloth_price,
                cloth_size: doc.data().cloth_size,
                cloth_type: doc.data().cloth_type,
                All_size: doc.data().All_size,
                S: doc.data().S,
                M: doc.data().M,
                L: doc.data().L,
              };

              this.all_products.push(data);
              console.log(this.all_products);
            });
          });
      }
    },
    FetchSearchTypes(val) {
      const db = this.$fire.firestore;
      this.types.splice(this.types);
      db.collection(val)
        .get()
        .then((queryResult6) => {
          queryResult6.forEach((doc) => {
            const data = {
              id: doc.id,
              type: doc.data().type,
            };

            this.types.push(data);
            console.log(this.types);
          });
        });
    },
    FetchTypes() {
      const db = this.$fire.firestore;
      this.types.splice(this.types);
      db.collection("Type")
        .get()
        .then((queryResult6) => {
          queryResult6.forEach((doc) => {
            const data = {
              id: doc.id,
              type: doc.data().type,
            };

            this.types.push(data);
            console.log(this.types);
          });
        });
    },
  },
  async created() {},
  watch: {
    // total() {
    //   let tot = this.total_amount + this.t_amount;
    //   console.log("Total", tot);
    // },

    multiple(val) {
      this.total_amount = val * this.cloth_price;
      console.log("TOtal", this.total_amount);
    },
  },
  mounted() {
    this.FetchPricing();
    this.FetchProducts2();
    this.FetchTypes();
    this.checkUserID();
  },
};
</script>
<style>
#mainwhapp {
  text-decoration-line: none;
  color: whitesmoke;
}
#size {
  color: #000;
  padding: 12px;
}
.nuxt-link {
  text-decoration: none;
}
.v-card--reveal {
  transition: 0.9s ease;
  align-items: center;
  bottom: 0;
  justify-content: start;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
.v-card--reveal :hover {
  align-items: center;
  bottom: 0;
  justify-content: start;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
#logout_text {
  font-size: 19px;
}
#p_header {
  font-weight: 500;
  font-size: 14px;
}
.s_image {
  transition: 0.5s ease;
  border: 14px;
}
.s_image:hover {
  transform: scale(1.1);
  opacity: 1.8;
}
#header_row {
  background-color: #ffffff;
  border-radius: 12px;
}
.card_image {
  border-radius: 10px;
}
.v-carousel {
  border-radius: 8px;
}
#body_h5 {
  color: black;
  font-weight: 600;
}
#price {
  font-size: 19px;
  margin-left: 15px;
}
#price3 {
  font-size: 15px;
}
#text_header {
  margin-top: 30px;
}
#spacer {
  color: black;
}
#card_title {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.274);
  padding: 5px 12px 5px 12px;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
}
#cart_label {
  font-weight: 600;
  margin-top: 18px;
  font-size: 18px;
}
#cart_icon {
  color: #fff;
}
#Names_shop {
  background-color: black;
  padding: 10px;
  font-size: 18px;
  border-radius: 12px;
  color: #fff;
  transition: 1ms;
}

#chip_shop {
  color: #fff;
  background-color: #faa3ab;
}
#select_type_h4 {
  font-weight: 600;
  color: black;
  margin: 16px;
}
#select_shop_h3 {
  font-weight: 600;
  color: black;
  margin: 6px;
}
#cat_chip {
  align-content: center;
  font-size: 16px;
  color: black;
  padding: 0.8rem;
  background-color: #faa3ab;
}
#nav_title {
  font-family: "Jost";
  font-weight: 700;
  padding: 5px 12px 5px 12px;
  font-size: 19px;
  align-content: ce;
}
#cart_btn {
  margin: 6px;
  color: white;
}
#clothImage {
  border-radius: 12px;
}
#plus {
  margin-left: 12px;
}
#minus {
  margin-left: 2px;
}
#all_items {
  --scrollbarBG: #ffffff;
  --thumbBG: #faa3ab;
  scrollbar-width: thin;
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
  overflow-y: auto;
  width: 100%;
  align-items: center;
  bottom: 0;
  max-height: 800px;
  justify-content: center;
}
#all_items::-webkit-scrollbar {
  width: 11px;
}

#all_items::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
}
#all_items::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG);
  border-radius: 10px;
  border: 3px solid var(--scrollbarBG);
}
</style>
