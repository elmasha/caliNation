<template>
  <div class="container">
    <div class="container">
      <div class="d-flex">
        <v-btn color="black" large icon to="/the-petite-studio">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </div>
    </div>
    <div class="container">
      <h2><strong>My Order Summary</strong></h2>
    </div>

    <div>
      <v-row>
        <v-col cols="12" md="5" lg="5" sm="12">
          <div class="container">
            <p>Below are details of your order</p>
            <div>
              <h3>
                Total PayOut: <strong>{{ total }}</strong>
              </h3>
              <h3>
                No of Item: <strong>{{ cart_Count }}</strong>
              </h3>
            </div>
            <br />
          </div>
          <div class="container">
            <h3>Payment Method</h3>
            <v-select
              v-model="pay_method"
              :items="payments"
              append-outer-icon="mdi-money"
              menu-props="auto"
              hide-details
              @change="checkPayment(pay_method)"
              label="Select Payment Method"
              single-line
            ></v-select>
            <div class="container">
              <div v-show="showCard2">
                <h4>PayBill: 880100</h4>
                <h4>Account No: 52480550017</h4>

                <!-- <div class="d-flex">
                  <h4>NB:</h4>
                  <p>Provide the Mpesa message sent.</p>
                </div> -->
              </div>
            </div>

            <div class="d-flex">
              <span>
                <v-btn icon><v-icon color="black">mdi-cash</v-icon></v-btn
                >{{ pay_method }}</span
              >
            </div>
          </div>
          <div class="container">
            <br />
            <v-btn
              block
              color="black"
              large
              id="btn_checkout"
              @click="viewItemDialog = true"
            >
              Check Out
            </v-btn>
            <br />
            <v-btn block color="black" large text @click="dialog_cart = true">
              Clear Cart
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="7" lg="7" sm="12">
          <div class="text-center">
            <h3><strong>My Cart List</strong></h3>
          </div>
          <div id="items_view">
            <div style="margin: 80px" v-show="!cart" class="text-center">
              <v-img cover height="80" :contain="true" :src="empty_cart">
              </v-img>
              <h4 class="text-center" style="color: #808080">Cart Empty</h4>
            </div>
            <v-card elevation="0">
              <div class="row">
                <div class="logo py-0 row justify-center">
                  <div
                    v-scroll.self="onScroll"
                    class="with-header row container overflow-y-auto"
                    align="center"
                    justify="center"
                    height="700"
                  >
                    <div
                      v-for="cart_list in cart_lists"
                      :key="cart_list.id"
                      :id="cart_list.id"
                      :cart_list="cart_list.cart_list"
                      class="col-md-4"
                      align="center"
                      justify="center"
                    >
                      <v-card
                        align="center"
                        justify="center"
                        elevation="0"
                        id=""
                        height="250"
                        class="car_card mx-auto my-12"
                        width="300"
                      >
                        <div class="text-center">
                          <v-btn
                            text
                            block
                            color="red"
                            @click="
                              (dialog_cart_remove = true),
                                (item_ids = cart_list.id),
                                (item_prices = cart_list.item_price)
                            "
                            ><v-icon>mdi-delete</v-icon><span>Delete Item</span>
                          </v-btn>
                        </div>
                        <div id="clothImage">
                          <nuxt-img
                            fit="cover"
                            width="180"
                            height="180"
                            :quality="30"
                            placeholder
                            :src="cart_list.item_image"
                          >
                          </nuxt-img>
                        </div>

                        <v-card-actions>
                          <div class="px-0 container">
                            <div>
                              <strong>
                                <h4>{{ cart_list.item_name }}</h4></strong
                              >
                              Size
                              <h4>{{ cart_list.item_size }}</h4>
                            </div>
                            <div id="pricing">
                              <h4>Qty {{ cart_list.item_quantity }}</h4>
                              <span
                                ><h2 id="price">
                                  ksh/<span>.</span
                                  ><strong>{{ cart_list.item_price }}</strong>
                                </h2>
                              </span>
                            </div>
                            <br />
                            <div></div>

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
                          <v-spacer></v-spacer>
                        </v-card-actions>
                      </v-card>
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-row v-show="true">
      <v-col cols="12" sm="12" md="12">
        <div class="container">
          <div>
            <h4 id="body_h5"><strong>Shipping Policy & Delivery</strong></h4>
            <p id="p_body">
              We ship worldwide Via DHL, cost of shipping belongs to the buyer
              and is based on delivery destination. Orders are dispatched within
              24 -48 hrs of payments.
            </p>
          </div>
          <div>
            <h4 id="body_h5"><strong>Returns & Exchange</strong></h4>
            <p id="p_body">
              Please inspect your order upon reception & contact us immediately
              if the item is wrong or damaged. We evaluate and make it right We
              don’t do cash refunds.You are however open to exchange the item or
              another.Applicable within 2 days
            </p>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="viewItemDialog" width="800" min-width="400">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-card>
            <div class="">
              <div class="container">
                <div class="d-flex">
                  <div class="text-center container"></div>
                  <v-spacer></v-spacer>
                  <v-btn icon color="red" @click="viewItemDialog = false"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </div>
                <v-row>
                  <V-col cols="12" md="12" lg="12" sm="12">
                    <div class="">
                      <form>
                        <v-text-field
                          v-model="user_name"
                          :counter="18"
                          label="Name"
                        ></v-text-field>

                        <v-text-field
                          v-model="phone_number"
                          :counter="15"
                          label="Phone Number"
                        ></v-text-field>

                        <v-text-field
                          v-model="email"
                          label="E-mail"
                        ></v-text-field>
                        <v-text-field
                          v-model="location"
                          label="Location"
                        ></v-text-field>
                        <v-text-field
                          v-model="landMark"
                          label="LandMark"
                        ></v-text-field>

                        <v-checkbox
                          v-model="checkbox"
                          value="1"
                          label="Agree to terms and Policy"
                          type="checkbox"
                        ></v-checkbox>

                        <v-btn
                          class="me-7"
                          id="btn_order"
                          block
                          @click="checkPayState(pay_method)"
                          color="black"
                        >
                          Place Order
                        </v-btn>

                        <v-btn text v-show="showCard">
                          <a :href="checkoutUrl">Enter card Detail</a>
                        </v-btn>
                      </form>
                      <div class="container">
                        <div class="">
                          <p v-show="timerEnabled">Processing</p>
                          <v-progress-linear
                            v-show="timerEnabled"
                            :width="5"
                            :buffer-value="timerCount"
                            stream
                            v-model="timerCount"
                            color="black"
                          >
                          </v-progress-linear>
                        </div>
                        <v-btn
                          text
                          color="warning"
                          v-show="showPayAgain"
                          @click="pause, CheckTimer, (timerCount = 90)"
                        >
                          Cancel Process
                        </v-btn>
                      </div>
                    </div>
                  </V-col>

                  <V-col cols="12" md="6" lg="6" sm="12"> </V-col>
                  <v-col v-show="true" cols="12" sm="12" md="12">
                    <div class="container">
                      <div>
                        <h5 id="body_h5">
                          <strong>Shipping Policy & Delivery</strong>
                        </h5>
                        <p id="p_body">
                          We ship worldwide Via DHL, cost of shipping belongs to
                          the buyer and is based on delivery destination. Orders
                          are dispatched within 24 -48 hrs of payments.
                        </p>
                      </div>
                      <div>
                        <h5 id="body_h5">
                          <strong>Returns & Exchange</strong>
                        </h5>

                        <p id="p_body">
                          Please inspect your order upon reception & contact us
                          immediately if the item is wrong or damaged. We
                          evaluate and make it right We don’t do cash
                          refunds.You are however open to exchange the item or
                          another.Applicable within 2 days
                        </p>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-dialog>
    <v-dialog v-model="dialog_cart" max-width="300">
      <v-card max-width="300">
        <div class="">
          <div class="container">
            <div class="d-flex" style="align-items: center">
              <v-spacer></v-spacer>
              <div class="text-center">
                <v-img :src="header_cart" width="60" cover height="60"></v-img>
              </div>
              <v-spacer></v-spacer>
            </div>
            <v-row class="text-center">
              <V-col cols="12" md="12" lg="12" sm="12">
                <div class="text-center container">
                  <h3 id="logout_text">
                    Are you sure you want to clear this Cart.
                  </h3>
                </div>
              </V-col>

              <v-col cols="6" md="6" lg="6" sm="6"
                ><v-btn
                  density="compact"
                  color="black"
                  text
                  id="cart_btn"
                  @click="dialog_cart = false"
                  >No
                </v-btn></v-col
              >
              <v-col cols="6" md="6" lg="6" sm="6">
                <v-btn
                  density="compact"
                  color="red"
                  text
                  id="cart_btn"
                  @click="FetchIteAndDelete"
                  >Yes
                </v-btn></v-col
              >
              <v-col
                cols="12"
                md="12"
                lg="12"
                sm="12"
                align="center"
                justify="center"
              >
                <v-progress-linear
                  v-show="progress_bar"
                  indeterminate
                  color="pink"
                ></v-progress-linear>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_cart_remove" max-width="300">
      <v-card max-width="300">
        <div class="">
          <div class="container">
            <div class="d-flex" style="align-items: center">
              <v-spacer></v-spacer>
              <div class="text-center" style="margin: 10px">
                <v-img :src="header_cart2" width="60" height="60" cover></v-img>
              </div>
              <v-spacer></v-spacer>
            </div>
            <v-row class="text-center">
              <V-col cols="12" md="12" lg="12" sm="12">
                <div class="text-center container">
                  <h3 id="logout_text">
                    Delete this item from your Cart List.
                  </h3>
                </div>
              </V-col>

              <v-col cols="6" md="6" lg="6" sm="6"
                ><v-btn
                  density="compact"
                  color="black"
                  text
                  id="cart_btn"
                  @click="dialog_cart_remove = false"
                  >No
                </v-btn></v-col
              >
              <v-col cols="6" md="6" lg="6" sm="6">
                <v-btn
                  density="compact"
                  color="red"
                  text
                  id="cart_btn"
                  @click="MinusTotalAmount(item_prices, item_ids)"
                  >Yes
                </v-btn></v-col
              >
              <v-col
                cols="12"
                md="12"
                lg="12"
                sm="12"
                align="center"
                justify="center"
              >
                <v-progress-linear
                  v-show="progress_bar"
                  indeterminate
                  color="pink"
                ></v-progress-linear>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card>
    </v-dialog>

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
import axios from "axios";
export default {
  data() {
    return {
      checkoutUrl: "",
      showCard: false,
      showCard2: false,
      pay_method: "",
      payments: ["Cash on Delivery", "Mpesa"],
      item_ids: null,
      item_prices: null,
      progress_bar: false,
      dialog_cart: false,
      dialog_cart_remove: false,
      viewItemDialog: false,
      value: 1,
      active: true,
      cart_lists: [],
      scrollInvoked: 0,
      total: 0,
      cart_Count: 0,
      user_name: "",
      phone_number: "",
      location: "",
      landMark: "",
      email: "",
      snackbar: false,
      snackbarText: "No error message",
      snackbar2: false,
      snackbarText2: "",
      cart: false,
      checkbox: false,
      empty_cart: require("@/assets/empty_cart.png"),
      header_cart: require("@/assets/delete_cart.png"),
      header_cart2: require("@/assets/shop_bag.png"),
      uid: null,
      item_id: null,
      id_list: [],
      timerEnabled: false,
      timerCount: 90,
      accept: false,
      paid: false,
      showPayAgain: false,
    };
  },
  methods: {
    checkPayState(val) {
      if (val == "Card") {
        this.PlaceOrder();
      } else if (val == "Mpesa") {
        this.PlaceOrder2();
      }
    },
    checkPayment(val) {
      if (val == "Cash on Delivery") {
        this.showCard2 = false;
      } else if (val == "Mpesa") {
        this.showCard2 = true;
        this.showCard = false;
      }
    },
    initiateCard() {
      let that = this;
      axios
        .post(
          "https://houseofdelivery-58e55adf4543.herokuapp.com/create-checkout-session",
          {
            item: "Elmasha Items",
            amount: Number(that.total),
            OrderID: this.$route.params.id,
            user_ID: this.$fire.auth.currentUser.uid,
          }
        )
        .then(function (response) {
          console.log(response);

          if (response.status == 200) {
            that.checkoutUrl = response.data;
          } else if (response.status == 400) {
            that.snackbarText = response.data;
            that.snackbar = true;
            that.show6 = false;
            that.show66 = false;
          }
        })
        .catch(function (error) {
          console.log(error);
          that.snackbarText = error;
          that.snackbar = true;
          that.show6 = false;
          that.show66 = false;
        })
        .then(function () {
          // always executed
        });
    },

    async MinusTotalAmount(val, val2) {
      if (this.cart_Count == 0) {
        this.snackbar2 = true;
        this.snackbarText2 = "Cart is empty";
      } else {
        console.log("Minus ", val, "successful ID", val2);
        // Create a reference to the SF doc.
        const db = this.$fire.firestore;
        var sfDocRef = db
          .collection("Order_request")
          .doc(this.$route.params.id);

        return db
          .runTransaction((transaction) => {
            // This code may get re-run multiple times if there are conflicts.
            return transaction.get(sfDocRef).then((sfDoc) => {
              let tot = Number(this.total) - Number(val);
              transaction.update(sfDocRef, { Total: Number(tot) });
            });
          })
          .then(() => {
            console.log("Minus Transaction successfully committed!");
            this.DeleteCartFromList(val2);
          })
          .catch((error) => {
            console.log("Transaction failed: ", error);
          });
      }
    },

    async DeleteCartFromList(val) {
      const db = this.$fire.firestore;
      var cart_ref = db
        .collection("Order_request")
        .doc(this.$route.params.id)
        .collection("item_list")
        .where("item_id", "==", val);
      let batch = db.batch();

      cart_ref.get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
          this.FetchOrder();
          this.FetchUser();
          this.dialog_cart_remove = false;
        });
        return batch.commit();
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
            (this.user_name = doc.data().user_name),
              (this.email = doc.data().email);
            this.uid = doc.data().user_uid;
          });
        });
    },
    onScroll() {
      this.scrollInvoked++;
    },
    checkPaymentMethod(val) {
      if (val == "") {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide Payment method.";
      } else {
        this.viewItemDialog = true;
      }
    },
    async PlaceOrder() {
      if (
        (this.user_name == "") |
        (this.email == "") |
        (this.phone_number == "") |
        (this.location == "") |
        (this.landMark == "")
      ) {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide the Details Required";
      } else if (this.checkbox == false) {
        this.snackbar2 = true;
        this.snackbarText2 = "Accept terms and condition";
      } else {
        const db = this.$fire.firestore;
        db.collection("Order_request")
          .doc(this.$route.params.id)
          .update({
            user_name: this.user_name,
            location: this.location,
            land_mark: this.landMark,
            email: this.email,
            phone: this.phone_number,
            payment_method: this.pay_method,
            order_status: 0,
            timestamp: new Date(),
          })
          .then((docRef) => {
            // this.dropState = true;
            this.UpdateUID();
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            this.snackbar2 = true;
            this.dropState = true;
            this.snackbarText2 = error;
          });
      }
    },
    async UpdateUID() {
      const db = this.$fire.firestore;
      db.collection("Members")
        .doc(this.$fire.auth.currentUser.uid)
        .update({
          Order_id: null,
          cart: false,
        })
        .then((docRef) => {
          // this.dropState = true;
          this.snackbar = true;
          this.snackbarText = "Cart Cleared..";
          this.showCard = true;
          this.$router.push("/the-petite-studio");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.snackbarText2 = error;
        });
    },
    async PlaceOrder2() {
      if (
        (this.user_name == "") |
        (this.email == "") |
        (this.phone_number == "") |
        (this.location == "") |
        (this.landMark == "")
      ) {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide the Details Required";
      } else if (this.checkbox == false) {
        this.snackbar2 = true;
        this.snackbarText2 = "Accept terms and condition";
      } else {
        const db = this.$fire.firestore;
        db.collection("Order_request")
          .doc(this.$route.params.id)
          .update({
            user_name: this.user_name,
            location: this.location,
            land_mark: this.landMark,
            email: this.email,
            phone: this.phone_number,
            payment_method: this.pay_method,
            order_status: 0,
            timestamp: new Date(),
            cart: false,
            paid: false,
          })
          .then((docRef) => {
            // this.dropState = true;
            this.UpdateUID2();
            this.viewItemDialog = true;
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            this.snackbar2 = true;
            this.dropState = true;
            this.snackbarText2 = error;
          });
      }
    },
    async UpdateUID2() {
      const db = this.$fire.firestore;
      db.collection("Members")
        .doc(this.$fire.auth.currentUser.uid)
        .update({
          Order_id: null,
          cart: false,
        })
        .then((docRef) => {
          // this.dropState = true;
          this.snackbar = true;
          this.snackbarText = "Provide Card Details";
          this.$router.push("/the-petite-studio");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.snackbarText2 = error;
        });
    },

    async DeleteCart() {
      const db = this.$fire.firestore;
      var cart_ref = db
        .collection("Order_request")

        .where("Order_id", "==", this.$route.params.id);
      let batch = db.batch();

      cart_ref.get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
          this.UpdateUID();
        });
        return batch.commit();
      });
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
    FetchItem() {
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
            this.cart_Count = queryResult.size;
          });
        });
    },

    FetchIteAndDelete() {
      this.progress_bar = true;
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
            this.cart_Count = queryResult.size;
            const data = {
              id: doc.id,
              item_category: doc.data().item_category,
              item_type: doc.data().item_type,
              item_image: doc.data().item_image,
              item_quantity: doc.data().item_quantity,
              item_name: doc.data().item_brand,
              item_price: doc.data().item_price,
            };
            this.id_list.push("Cart", data);

            this.item_id = data.id;
            this.DeleteList(data.id);
            // this.DeleteCartItem(this.item_id);
          });
        });
    },
    async DeleteList(val) {
      const db = this.$fire.firestore;
      console.log(val);
      var cart_ref = db
        .collection("Order_request")
        .doc(this.$route.params.id)
        .collection("item_list")
        .where("item_id", "==", val);
      let batch = db.batch();

      cart_ref.get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
          this.DeleteCart();
        });
        return batch.commit();
      });
    },
    async DeleteCartItem(val) {
      const db = this.$fire.firestore;

      var cart_ref = db
        .collection("item_list")
        .where("item_id", "==", post.job_id);
      let batch = firestore.batch();

      cart_ref.get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        return batch.commit();
      });
    },

    FetchOrder() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .where("Order_id", "==", this.$route.params.id)
        .where("cart", "==", true)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            console.log("Order details", doc.data());
            this.total = doc.data().Total;
            this.cart = doc.data().cart;
            this.paid = doc.data().paid;

            this.checkCartState(this.cart);
          });
        });
    },
    FetchOrder2() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .where("Order_id", "==", this.$route.params.id)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            console.log("Order details", doc.data());

            this.paid = doc.data().paid;

            this.checkIfPaid();
          });
        });
    },
    checkIfPaid() {
      if (this.paid == true) {
        this.snackbar = true;
        this.snackbarText = "Payment Successful";
        this.timerCount = 90;
        this.timerEnabled = false;
        this.viewItemDialog = false;
        this.$router.push("/the-petite-studio");
      } else {
        this.showCard = true;
        this.snackbar2 = true;
        this.snackbarText2 = "Something went wrong try again later.";
        this.timerCount = 90;
        this.timerEnabled = false;
        this.viewItemDialog = false;
      }
    },
    checkUserID() {
      if (this.$fire.auth.currentUser == null) {
      } else {
        console.log(this.$fire.auth.currentUser);

        this.FetchOrder();
        this.FetchUser();
      }
    },
    checkCartState(val) {
      console.log(val);
      if (val == true) {
        this.FetchItem();
        this.FetchProducts2();
      } else {
        this.cart_Count = 0;
        this.total = 0;
      }
    },
    play() {
      this.timerEnabled = true;
    },

    pause() {
      this.timerEnabled = false;
    },
    CheckTimer() {
      this.timerCount = 0;
    },
  },
  created() {
    this.checkUserID();
  },
  mounted() {},
  watch: {
    timerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.timerCount--;
        }, 1000);
      }
    },

    timerCount: {
      handler(value) {
        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        } else if (value == 0) {
          this.FetchOrder2();
        }
      },
      immediate: false, // This ensures the watcher is triggered upon creation
    },
  },
};
</script>
<style>
nuxt-link {
  text-decoration-line: none;
}
#btn_checkout {
  color: #fff;
}
#items_view {
  height: 400px;
  width: 100%;
}
p {
  color: #808080;
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
#btn_order {
  color: white;
}
* {
  box-sizing: border-box;
}
</style>
