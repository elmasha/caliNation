<template>
  <div class="container">
    <div class="container">
      <div class="container">
        <h3 id="h32"><strong>Bookings</strong></h3>
      </div>
    </div>

    <div class="container">
      <p>Below are bookings sent by your customers.</p>
    </div>
    <v-data-table
      :headers="headers"
      :items="orders"
      :items-per-page="5"
      class="elevation-0"
      item-key="category"
      :search="search"
      :custom-filter="filterOnlyCapsText2"
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
          value: "username",
        },
        { text: "email", value: "email" },
        { text: "Booking category", value: "category" },
      ],
      orders: [],
    };
  },
  methods: {
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
    FetchBooking() {
      const db = this.$fire.firestore;
      db.collection("Bookings")
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            const data = {
              id: doc.id,
              username: doc.data().username,
              email: doc.data().email,
              category: doc.data().Category,
              status: doc.data().status,
              timestamp: doc.data().timestamp,
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
    this.FetchBooking();
  },
};
</script>
<style >
#o_count {
  margin-left: 12px;
}
</style>
