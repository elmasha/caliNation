<template>
  <div class="container">
    <div class="container">
      <div class="d-flex">
        <div class="container">
          <h3 id="h32"><strong>Live orders</strong></h3>
        </div>
        <div class="">
          <v-spacer></v-spacer>
          <v-btn @click="Refresh" color="grey" icon medium>
            Refresh
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </div>
      </div>

      <v-row>
        <v-col cols="12" md="4" lg="4" sm="4">
          <v-card>
            <v-card-actions>
              <div class="container">
                <v-btn color="warning" icon large>
                  <v-icon>mdi-package</v-icon>
                  <h2 id="o_count">{{ all_order }}</h2>
                </v-btn>
                <h4>Orders</h4>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" lg="4" sm="4">
          <v-card>
            <v-card-actions>
              <div class="container">
                <v-btn color="primary" icon large>
                  <v-icon>mdi-timeline-clock-outline</v-icon>
                  <h2 id="o_count">{{ pending }}</h2>
                </v-btn>
                <h4>Total Pending</h4>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" md="4" lg="4" sm="4">
          <v-card>
            <v-card-actions>
              <div class="container">
                <v-btn color="green" icon large>
                  <v-icon>mdi-truck-fast</v-icon>
                  <h2 id="o_count">{{ dispatched }}</h2>
                </v-btn>
                <h4>Total Dispatched</h4>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div class="container">
      <p>Below are order sent by your customers.</p>
    </div>
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="5"
      class="elevation-1"
      item-key="username"
      :search="search"
      :custom-filter="filterOnlyCapsText2"
      @click="showValue(user_name)"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:body.append>
        <td colspan="4"></td>
      </template>
      <template v-slot:item.status="{ item }">
        <span color="blue">{{ checkStatus(item.status) }}</span>

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
  </div>
</template>
<script>
export default {
  name: "myOrders",
  data() {
    return {
      pending: 0,
      all_order: 0,
      dispatched: 0,
      search: "",
      headers: [
        { text: "Status", value: "status" },
        {
          text: "User name",
          align: "start",
          sortable: true,
          value: "user_name",
        },
        { text: "email", value: "email" },
        { text: "Phone number", value: "phone" },
        { text: "Location", value: "location" },
        { text: "Land Mark", value: "landmark" },
        { text: "Total Amount", value: "amount" },
        { text: "View Items", value: "actions", sortable: false },
      ],
      orders: [],
    };
  },
  methods: {
    Refresh() {
      this.checkUser();
      this.FetchOrderCount();
      this.FetchPendingCount();
      this.FetchDispatchCount();
    },
    FetchOrderCount() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
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
              email: doc.data().email,
              status: doc.data().order_status,
              timestamp: doc.data().timestamp,
              discount: doc.data().discount,
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
        value.toString().toLocaleLowerCase().indexOf(search) !== -1
      );
    },
  },
  created() {
    this.checkUser();
    this.FetchOrderCount();
    this.FetchPendingCount();
    this.FetchDispatchCount();
  },
  watch: {
    FetchOrderCount() {
      const db = this.$fire.firestore;
      db.collection("Order_request")
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
<style >
#o_count {
  margin-left: 12px;
}
</style>
