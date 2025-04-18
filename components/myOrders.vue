<template>
  <div class="container">
    <v-card color="">
      <div class="container">
        <div class="d-flex">
          <div class="container">
            <h3 id="h32"><strong>Live orders</strong></h3>
          </div>
          <div class="">
            <v-spacer></v-spacer>
            <v-btn @click="Refresh" color="grey" text medium>
              <div class="d-flex">
                <h4 style="margin: 8px">Refresh</h4>
                <v-icon>mdi-refresh</v-icon>
              </div>
            </v-btn>
          </div>
        </div>

        <v-row>
          <v-col cols="12" md="3" lg="3" sm="3">
            <v-card color="black">
              <br />
              <br />
              <v-card-actions>
                <div class="container">
                  <v-btn color="warning" icon large>
                    <v-icon>mdi-package</v-icon>
                    <h2 id="o_count">{{ all_order }}</h2>
                  </v-btn>
                  <h4 style="color: white">Orders</h4>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="3" lg="3" sm="3">
            <v-card>
              <br />
              <br />
              <v-card-actions>
                <div class="container">
                  <v-btn color="primary" icon large>
                    <v-icon>mdi-timeline-clock-outline</v-icon>
                    <h2 id="o_count">{{ pending }}</h2>
                  </v-btn>
                  <h4>Pending</h4>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="3" lg="3" sm="3">
            <v-card>
              <br />
              <br />
              <v-card-actions>
                <div class="container">
                  <v-btn color="green" icon large>
                    <v-icon>mdi-truck-fast</v-icon>
                    <h2 id="o_count">{{ dispatched }}</h2>
                  </v-btn>
                  <h4>Dispatched</h4>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" md="3" lg="3" sm="3">
            <v-card color="black" dark>
              <v-card-actions
                ><v-spacer></v-spacer>
                <div class="d-flex">
                  <span style="margin-top: 8px; font-size: 0.7rem">
                    {{ moment(new Date(date)).format("MMM YYYY") }}
                  </span>
                  <v-btn color="green" icon
                    ><v-icon color="gree">mdi-calendar-month-outline</v-icon></v-btn
                  >
                </div>
              </v-card-actions>
              <v-card-actions>
                <div class="container">
                  <v-btn color="green" icon large>
                    <div class="d-flex">
                      <h2 id="o_count">{{ numeral(totalSale).format("0,0.0") }}</h2>
                    </div>
                  </v-btn>
                  <h4>Total Sale</h4>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="11" sm="5">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="searchDate"
                  label="Pick a month"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" type="month" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </div>

      <v-data-table
        :headers="headers"
        :items="orders"
        :items-per-page="5"
        class="container"
        item-key="mpesa_receipt"
        :search="search"
        :custom-filter="filterOnlyCapsText2"
        @click="showValue(user_name)"
      >
        <template v-slot:top>
          <v-text-field v-model="search" label="Search" class="mx-4"></v-text-field>
        </template>
        <template v-slot:body.append>
          <td colspan="4"></td>
        </template>
        <template v-slot:item.status="{ item }">
          <span color="blue">{{ checkStatus(item.status) }}</span>

          <!-- :to="`/book/${car_list.car_model}`" -->
          <!-- :to="`/viewOrder/${item.id}`" -->
        </template>
        <template v-slot:item.timestamp="{ item }">
          <span color="blue">{{ checkDate(item.createdAt) }}</span>

          <!-- :to="`/book/${car_list.car_model}`" -->
          <!-- :to="`/viewOrder/${item.id}`" -->
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn icon :to="`/admin/viewOrder/${item.id}`"
            ><v-icon small class="mr-2"> mdi-eye</v-icon></v-btn
          >

          <!-- :to="`/book/${car_list.car_model}`" -->
          <!-- :to="`/viewOrder/${item.id}`" -->
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import moment from "moment";
import numeral from "numeral";

export default {
  name: "myOrders",
  data() {
    return {
      date: new Date().toISOString().substr(0, 7),
      menu: false,
      modal: false,
      searchDate: null,
      numeral,
      moment,
      pending: 0,
      all_order: 0,
      dispatched: 0,
      search: "",
      headers: [
        { text: "Status", value: "status" },
        { text: "Date", value: "timestamp", sortable: true, align: "start" },
        {
          text: "User name",
          align: "start",
          sortable: true,
          value: "user_name",
        },
        { text: "mpesa_receipt", value: "mpesa_receipt" },
        { text: "Phone number", value: "phone" },
        { text: "Location", value: "location" },
        { text: "Land Mark", value: "landmark" },
        { text: "Total Amount", value: "amount" },
        { text: "View Items", value: "actions", sortable: false },
      ],
      orders: [],
      totalSale: 0,
    };
  },
  methods: {
    checkDate(val) {
      return val;
    },
    Refresh() {
      this.checkUser();
      this.FetchOrderCount();
      this.FetchPendingCount();
      this.FetchDispatchCount();
    },
    FetchOrderCount() {
      this.all_order = 0;
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .where("cart", "==", false)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            if (!doc.exists) {
              throw "Document does not exist!";
            }
            console.log("order details", queryResult.size);
            this.all_order = queryResult.size;
          });
        });
    },
    FetchPendingCount() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .where("cart", "==", false)
        .where("order_status", "==", 0)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            if (!doc.exists) {
              throw "Document does not exist!";
            }
            console.log("order details", queryResult.size);
            this.pending = queryResult.size;
          });
        });
    },
    FetchDispatchCount() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .where("cart", "==", false)
        .where("order_status", "==", 1)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            if (!doc.exists) {
              throw "Document does not exist!";
            }
            console.log("order details", queryResult.size);
            this.dispatched = queryResult.size;
          });
        });
    },

    checkStatus(val) {
      console.log(val);
      if (val == 0) {
        return "Pending";
      } else if (val == 1) {
        return "Confirmed";
      } else if (val == 2) {
        return "Dispatched";
      } else if (val == 3) {
        return "Delivered";
      }
    },
    CheckItem(val) {
      console.log(val);
    },
    showValue(val) {
      console.log("Val", val);
    },
    checkUser() {
      if (this.$fire.auth.currentUser != null) {
        if (this.$fire.auth.currentUser.uid != null) {
          this.FetchOrder();
        }
      }
    },
    FetchOrder() {
      this.orders.splice(this.orders);
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .where("cart", "==", false)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            console.log("Order details", doc.data());
            const data = {
              id: doc.id,
              amount: doc.data().Total,
              user_name: doc.data().user_name,
              location: doc.data().location,
              landmark: doc.data().land_mark,
              phone: doc.data().phone,
              mpesa_receipt: doc.data().mpesa_receipt,
              status: doc.data().order_status,
              timestamp: doc.data().timestamp,
              discount: doc.data().discount,
              createdAt: doc.data().createdAt,
            };
            this.orders.push(JSON.parse(JSON.stringify(data)));
          });
        });
    },
    filterOnlyCapsText2(value, search, item) {
      return (
        value != null &&
        search != null &&
        item != null &&
        typeof value === "string" &&
        value.toString().toLowerCase().indexOf(search) !== -1
      );
    },
    FetchTotalSale() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .where("cart", "==", false)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            if (!doc.exists) {
              throw "Document does not exist!";
            }

            this.totalSale += doc.data().total;
            console.log("Total Sale ", this.totalSale);
          });
        });
    },
  },
  created() {
    this.checkUser();
    this.FetchOrderCount();
    this.FetchPendingCount();
    this.FetchDispatchCount();
    this.FetchTotalSale();
  },
  watch: {
    FetchOrderCount() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .where("cart", "==", false)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            if (!doc.exists) {
              throw "Document does not exist!";
            }
            console.log("order details", queryResult.size);
            this.all_order = queryResult.size;
          });
        });
    },
    FetchPendingCount() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .where("order_status", "==", 0)
        .where("cart", "==", false)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            if (!doc.exists) {
              throw "Document does not exist!";
            }
            console.log("order details", queryResult.size);
            this.pending = queryResult.size;
          });
        });
    },
    FetchDispatchCount() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
        .where("cart", "==", false)
        .where("order_status", "==", 1)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            if (!doc.exists) {
              throw "Document does not exist!";
            }
            console.log("order details", queryResult.size);
            this.dispatched = queryResult.size;
          });
        });
    },
  },
};
</script>
<style>
#o_count {
  margin-left: 12px;
}
</style>
