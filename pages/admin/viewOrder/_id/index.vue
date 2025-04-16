<template>
  <div class="container">
    <div class="container">
      <div class="d-flex">
        <nuxt-link class="nuxt-link" to="/admin">
          <v-chip large color="white" style="color: black">
            <v-icon large color="black">mdi-arrow-left-circle</v-icon>
          </v-chip>
        </nuxt-link>
        <v-spacer></v-spacer>
        <v-btn icon color="black" @click="Refresh"
          ><v-icon large>mdi-refresh</v-icon></v-btn
        >
      </div>
    </div>
    <div class="container text-center"><h3>Order info</h3></div>
    <v-row>
      <v-col cols="12" md="12" lg="12" sm="12">
        <v-card class="mx-auto" light min-width="300" elevation="0">
          <v-card-title>
            <!-- <span class="text-h6 font-weight-light">Twitter</span> -->
          </v-card-title>

          <v-card-text class="text-h5 font-weight-bold">
            <!-- "Turns out semicolon-less style is easier and safer in TS because
            most gotcha edge cases are type invalid as well." -->
          </v-card-text>

          <v-card-actions>
            <div>
              <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3"> </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ user_name }}</v-list-item-title>
                  <v-list-item-subtitle>{{ phoneNumber }}</v-list-item-subtitle>
                  <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-row align="center" justify="end">
                  <v-icon class="mr-1"> mdi-cart-check </v-icon>
                  <span class="subheading mr-2">{{ cart_count }}</span>
                </v-row>
              </v-list-item>
              <div class="container">
                <div class="row">
                  <v-btn
                    :disabled="!o_confirmed"
                    small
                    text
                    color="green"
                    @click="UpdateOrder()"
                  >
                    <v-icon>mdi-check-decagram</v-icon> Confirm This Order</v-btn
                  >
                  <v-btn
                    :disabled="!o_dispatched"
                    small
                    text
                    color="primary"
                    @click="UpdateOrder2()"
                  >
                    <v-icon>mdi-truck-fast-outline</v-icon>
                    Dispatch This Order</v-btn
                  >
                  <v-btn
                    :disabled="!o_delivered"
                    small
                    text
                    color="orange"
                    @click="UpdateOrder3()"
                  >
                    <v-icon>mdi-package-variant-closed-check</v-icon>
                    Confirm Delivered</v-btn
                  >
                  <v-btn
                    :disabled="!o_rejected"
                    small
                    text
                    color="red"
                    @click="UpdateOrder2()"
                    ><v-icon>mdi-close-circle</v-icon> Reject This Order</v-btn
                  >
                </div>
              </div>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="12" lg="12" sm="12">
        <div id="items_view">
          <v-card elevation="0">
            <div class="row">
              <div class="logo py-0 row justify-center">
                <div
                  v-scroll.self="onScroll"
                  class="with-header row container overflow-y-auto"
                  align="center"
                  justify="center"
                  height="500"
                >
                  <div
                    v-for="cart_list in cart_lists"
                    :key="cart_list.id"
                    :id="cart_list.id"
                    :cart_list="cart_list.cart_list"
                    class="col-md-3"
                    align="center"
                    justify="center"
                  >
                    <v-card
                      align="center"
                      justify="center"
                      elevation="0"
                      id=""
                      height="200"
                      class="car_card mx-auto my-12"
                      max-width="300"
                    >
                      <div id="clothImage">
                        <v-card width="120" height="125" hover elevation="0"
                          ><v-img
                            height="127"
                            max-height="127"
                            class="align-end"
                            cover
                            width="125"
                            :src="cart_list.item_image"
                          >
                            <template v-slot:placeholder>
                              <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                              >
                                <v-progress-circular
                                  indeterminate
                                  color="secondary"
                                ></v-progress-circular>
                              </v-row>
                            </template> </v-img
                        ></v-card>
                      </div>

                      <v-card-actions>
                        <div class="px-0 container">
                          <div id="pricing">
                            <h4>Qty {{ cart_list.item_quantity }}</h4>
                            <span
                              ><h2 id="price">
                                ksh/<span>.</span
                                ><strong>{{ cart_list.item_price }}</strong>
                              </h2>
                            </span>
                          </div>
                          <div>
                            <h4>{{ cart_list.item_name }}</h4>
                          </div>
                          <div>
                            <h4>Size-{{ cart_list.item_size }}</h4>
                          </div>
                          <div class="col-md-12">
                            <div>
                              <v-row align="center" justify="center">
                                <v-col cols="auto">
                                  <div class="d-flex">
                                    <v-fab-transition> </v-fab-transition>
                                  </div>
                                </v-col>
                              </v-row>
                            </div>
                          </div>
                        </div>
                      </v-card-actions>
                    </v-card>
                  </div>
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12" md="12" lg="12" sm="12"></v-col>
    </v-row>
    <v-snackbar color="white--text" :timeout="4000" v-model="snackbar" center>
      {{ snackbarText }}
    </v-snackbar>
    <v-snackbar color="red" :timeout="4000" v-model="snackbar2" outlined bottom center>
      {{ snackbarText2 }}
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      o_pending: false,
      o_confirmed: false,
      o_dispatched: false,
      o_delivered: false,
      o_rejected: false,
      snackbar: false,
      snackbarText: "",
      snackbar2: false,
      snackbarText2: "",
      cart_count: 0,
      user_name: "",
      email: "",
      phoneNumber: "",
      cart_lists: [],
      scrollInvoked: 0,
      order_status: null,
    };
  },

  methods: {
    TrackOrder(val) {
      if (val == 0) {
        this.o_pending = true;
        this.o_confirmed = true;
        this.o_dispatched = false;
        this.o_delivered = false;
        this.o_rejected = false;
      } else if (val == 1) {
        this.o_pending = false;
        this.o_confirmed = false;
        this.o_dispatched = true;
        this.o_delivered = false;
        this.o_rejected = false;
      } else if (val == 2) {
        this.o_pending = false;
        this.o_confirmed = false;
        this.o_dispatched = false;
        this.o_delivered = true;
        this.o_rejected = false;
      } else if (val == 3) {
        this.o_pending = false;
        this.o_confirmed = false;
        this.o_dispatched = false;
        this.o_delivered = true;
        this.o_rejected = false;
      } else if (val == 12) {
        this.o_pending = false;
        this.o_confirmed = false;
        this.o_dispatched = false;
        this.o_delivered = false;
        this.o_rejected = true;
      }
    },
    CheckState(val) {
      if (val == 0) {
        return false;
      } else if (val == 1) {
        return false;
      } else if (val == 2) {
        return false;
      } else if (val == 3) {
        return false;
      } else if (val == 12) {
        return false;
      } else {
        return true;
      }
    },
    async UpdateOrder() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .doc(this.$route.params.id)
        .update({
          order_status: 1,
        })
        .then((docRef) => {
          // this.dropState = true;
          this.snackbar = true;
          this.snackbarText = "Order updated Successfully";
          this.Refresh();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.snackbarText2 = error;
        });
    },
    async UpdateOrder2() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .doc(this.$route.params.id)
        .update({
          order_status: 2,
        })
        .then((docRef) => {
          // this.dropState = true;
          this.snackbar = true;
          this.snackbarText = "Order updated Successfully";
          this.Refresh();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.snackbarText2 = error;
        });
    },
    async UpdateOrder3() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .doc(this.$route.params.id)
        .update({
          order_status: 3,
        })
        .then((docRef) => {
          // this.dropState = true;
          this.snackbar = true;
          this.snackbarText = "Order updated Successfully";
          this.Refresh();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.snackbarText2 = error;
        });
    },
    async UpdateOrder4() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .doc(this.$route.params.id)
        .update({
          order_status: 12,
        })
        .then((docRef) => {
          // this.dropState = true;
          this.snackbar = true;
          this.snackbarText = "Order updated Successfully";
          this.Refresh();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.snackbarText2 = error;
        });
    },
    onScroll() {
      this.scrollInvoked++;
    },
    FetchProducts2() {
      this.cart_lists.splice(this.cart_lists);
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .doc(this.$route.params.id)
        .collection("item_list")
        .get()
        .then((queryResult6) => {
          queryResult6.forEach((doc) => {
            const data = {
              id: doc.id,
              item_category: doc.data().item_category,
              item_type: doc.data().item_type,
              item_image: doc.data().item_image,
              item_quantity: doc.data().item_quantity,
              item_name: doc.data().item_brand,
              item_price: doc.data().item_price,
              item_size: doc.data().item_size,
            };

            this.cart_lists.push(data);
            console.log(this.cart_lists);
          });
        });
    },

    FetchUser() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .where("Order_id", "==", this.$route.params.id)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            console.log("user details", doc.data());
            (this.user_name = doc.data().user_name), (this.email = doc.data().email);
            this.phoneNumber = doc.data().phone;
            this.order_status = doc.data().order_status;
            this.TrackOrder(doc.data().order_status);
          });
        });
    },
    FetchCartCount() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .doc(this.$route.params.id)
        .collection("item_list")
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            if (!doc.exists) {
              throw "Document does not exist!";
            }
            console.log("car details", queryResult.size);
            this.cart_count = queryResult.size;
          });
        });
    },
    Refresh() {
      this.FetchUser();
      this.FetchCartCount();
      this.FetchProducts2();
    },
  },

  created() {
    this.FetchUser();
    this.FetchCartCount();
    this.FetchProducts2();
  },
};
</script>
<style>
.nuxt-link {
  text-decoration-line: none;
}
#items_view {
  --scrollbarBG: #ffffff;
  --thumbBG: #f8f3f3;
}
#items_view::-webkit-scrollbar {
  width: 11px;
}
#items_view {
  scrollbar-width: thin;
  scrollbar-color: var(--thumbBG) var(--scrollbarBG);
}
#items_view::-webkit-scrollbar-track {
  background: var(--scrollbarBG);
}
#items_view::-webkit-scrollbar-thumb {
  background-color: var(--thumbBG);
  border-radius: 6px;
  border: 3px solid var(--scrollbarBG);
}

#items_view {
  background: rgb(255, 255, 255);
  overflow-y: auto;
  margin: 0 auto;
  padding: 1.5rem;
  font: 100%/1.4 Jost;
}
</style>
