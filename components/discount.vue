<template>
  <div>
    <div class="container">
      <v-row>
        <v-col>
          <v-card elevation="0">
            <v-card-actions>
              <v-btn @click="Refresh" color="grey" icon medium>
                <v-icon>mdi-refresh</v-icon>
              </v-btn>

              <div class="container col-md-6">
                <v-btn color="primary" icon large>
                  <v-icon>mdi-brightness-percent</v-icon>
                  <h2>{{ discount_per }}</h2>
                </v-btn>

                <div>
                  <div v-show="!edit" class="d-flex">
                    <h4>Discount {{ discount_per }}%</h4>
                    <v-btn @click="edit = true" color="grey" icon small>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </div>
                  <div v-show="edit">
                    <v-btn color="red" @click="edit = false" icon large>
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
                </div>
                <div v-show="edit" class="container">
                  <v-text-field
                    v-model="discount_per"
                    :counter="10"
                    :rules="nameRules2"
                    label="Price"
                  ></v-text-field>

                  <v-btn color="black" class="white--text" @click="UploadDiscount">
                    Update
                  </v-btn>
                </div>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
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
                  v-for="cart_list in all_products"
                  :key="cart_list.id"
                  :id="cart_list.id"
                  :cart_list="cart_list.cart_list"
                  class="col-sm-3 text-center"
                  align="center"
                  justify="center"
                >
                  <v-card
                    align="center"
                    justify="center"
                    elevation="0"
                    id=""
                    height="350"
                    class="car_card mx-auto my-12 text-center"
                    max-width="300"
                  >
                    <div id="clothImage">
                      <v-img
                        height="180"
                        max-height="180"
                        class="align-end"
                        cover
                        :contain="true"
                        width="100%"
                        :src="cart_list.cloth_image"
                      >
                        <template v-slot:placeholder>
                          <v-row class="fill-height ma-0" align="center" justify="center">
                            <v-progress-circular
                              indeterminate
                              color="secondary"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                        <v-chip color="red" v-show="cart_list.sold" style="color: white"
                          >SOlD OUT</v-chip
                        >
                      </v-img>
                    </div>

                    <v-card-actions>
                      <div class="container">
                        <div class="" style="margin: 0px">
                          <div>
                            <h4>{{ cart_list.cloth_name }}</h4>
                            <strong>{{ cart_list.cloth_price }}</strong>
                          </div>

                          <div style="margin: 0px" id="pricing">
                            <span v-show="cart_list.discount"
                              ><h4>
                                <span>{{ discount_per }}</span
                                ><v-icon small>mdi-percent</v-icon>
                                <strong>{{ discount(cart_list.cloth_price) }}</strong>
                              </h4>
                            </span>
                          </div>
                          <div class="row">
                            <v-switch
                              color="pink"
                              @click="updateStatus4(cart_list.sold, cart_list.id)"
                              v-model="cart_list.sold"
                              :label="`Sold: ${cart_list.sold}`"
                            ></v-switch>
                            <v-switch
                              @click="updateStatus3(cart_list.state, cart_list.id)"
                              color="pink"
                              v-model="cart_list.state"
                              :label="`Published: ${cart_list.state}`"
                            ></v-switch>
                            <v-switch
                              color="pink"
                              @click="updateStatus1(cart_list.Negotiable, cart_list.id)"
                              v-model="cart_list.Negotiable"
                              :label="`Negotiable: ${cart_list.Negotiable}`"
                            ></v-switch>
                          </div>
                          <div class="row text-center">
                            <div>
                              <v-btn
                                icon
                                color="red"
                                @click="(dialog_delete = true), (item_id = cart_list.id)"
                                ><v-icon>mdi-delete</v-icon></v-btn
                              >
                            </div>
                            <div>
                              <v-btn
                                icon
                                color="primary"
                                @click="
                                  (updateItemDialog = true),
                                    (item_id = cart_list.id),
                                    (cloth_image = cart_list.cloth_image),
                                    (cloth_name = cart_list.cloth_name),
                                    (cloth_category = cart_list.cloth_category),
                                    (cloth_gender = cart_list.cloth_gender),
                                    (cloth_status = cart_list.cloth_status),
                                    (cloth_type = cart_list.cloth_type),
                                    (cloth_description = cart_list.cloth_desc),
                                    (cloth_price = cart_list.cloth_price),
                                    (cloth_size = cart_list.cloth_size),
                                    (cloth_discount = cart_list.cloth_discount),
                                    (S = cart_list.S),
                                    (M = cart_list.M),
                                    (L = cart_list.L)
                                "
                                ><v-icon>mdi-pencil-outline</v-icon></v-btn
                              >
                            </div>
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
    </div>
    <v-dialog v-model="dialog_update" max-width="350">
      <v-card max-width="360">
        <div class="">
          <div class="container">
            <div class="d-flex">
              <div class="text-center container"></div>
              <v-spacer></v-spacer>
              <v-btn icon color="red" @click="dialog_update = false"
                ><v-icon>mdi-close</v-icon></v-btn
              >
            </div>
            <v-row class="text-center">
              <v-col cols="12" md="12" lg="12" sm="12">
                <uploadStock />
              </v-col>
            </v-row>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_delete" max-width="300">
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
                  <h3 id="logout_text">Delete this item from my Stock.</h3>
                </div>
              </V-col>

              <v-col cols="6" md="6" lg="6" sm="6"
                ><v-btn
                  density="compact"
                  color="black"
                  text
                  id="cart_btn"
                  @click="dialog_delete = false"
                  >No
                </v-btn></v-col
              >
              <v-col cols="6" md="6" lg="6" sm="6">
                <v-btn
                  density="compact"
                  color="red"
                  text
                  id="cart_btn"
                  @click="DeleteCartFromList(item_id)"
                  >Yes
                </v-btn></v-col
              >
              <v-col cols="12" md="12" lg="12" sm="12" align="center" justify="center">
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
    <v-dialog color="white" v-model="updateItemDialog" width="800" min-width="400">
      <v-card>
        <div class="container">
          <div class="d-flex">
            <div class="text-center container"></div>
            <v-spacer></v-spacer>
            <v-btn icon color="red" @click="updateItemDialog = false"
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </div>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <div class="container">
                <h2>Update Stock</h2>
              </div>
              <div>
                <div>
                  <dropzone
                    id="foo"
                    ref="el"
                    height="300"
                    :options="options"
                    @vdropzone-complete="afterCompletePoster"
                  ></dropzone>
                </div>
                <br />
                <div>
                  <v-btn text @click="clearDropzone">Clear image</v-btn>
                </div>
                <div class="d-flex text-center">
                  <div>
                    <v-chip id="cat_chip" :input-value="true" active-class="black--text">
                      {{ cloth_category }}
                    </v-chip>
                  </div>

                  <div>
                    <v-chip id="cat_chip" :input-value="true" active-class="black--text">
                      {{ cloth_type }}
                    </v-chip>
                  </div>
                </div>

                <v-col cols="12" md="12" lg="12" sm="12">
                  <div class="row">
                    <v-item v-for="cat in category" :key="cat" v-slot="{ active }">
                      <v-chip-group row>
                        <v-chip
                          @click="cloth_category = cat.title"
                          filter
                          variant="outlined"
                        >
                          <v-icon start icon="">{{ cat.icon }}</v-icon>
                          {{ cat.title }}
                        </v-chip>
                      </v-chip-group>
                    </v-item>
                  </div>
                </v-col>
                <v-form ref="form" lazy-validation>
                  <div style="padding:0px:">
                    <v-card elevation="0" class="text-center"> </v-card>
                    <br />
                  </div>

                  <div class="container">
                    <h4>Select Type</h4>
                  </div>
                  <div class="row">
                    <v-item v-for="(type, idx) in types" :key="idx" v-slot="{ active }">
                      <v-chip-group row>
                        <v-chip
                          id="cat_chip"
                          filter
                          active-class="black--text"
                          :input-value="active"
                          @click="cloth_type = type.type"
                        >
                          {{ type.type }}
                        </v-chip>
                      </v-chip-group>
                    </v-item>
                    <br />
                  </div>
                  <br />

                  <v-text-field
                    v-model="cloth_type"
                    :rules="nameRules2"
                    label="Cloth Type"
                  ></v-text-field>

                  <div>
                    <v-item-group multiple>
                      <v-subheader>Select Brands</v-subheader>
                      <v-item v-for="brand in brands" :key="brand" v-slot="{ active }">
                        <v-chip
                          id="cat_chip"
                          active-class="black--text"
                          :input-value="active"
                          @click="item_name = brand.brand"
                        >
                          {{ brand.brand }}
                        </v-chip>
                      </v-item>
                    </v-item-group>
                    <br />
                  </div>

                  <v-text-field
                    v-model="cloth_name"
                    :rules="nameRules2"
                    label="Cloth Brand"
                  ></v-text-field>
                  <v-text-field
                    v-model="cloth_size"
                    :counter="10"
                    :rules="nameRules2"
                    label="Cloth size"
                  ></v-text-field>

                  <v-select
                    :counter="10"
                    :rules="nameRules2"
                    v-model="cloth_status"
                    label="Select status"
                    :items="statusItems"
                  ></v-select>

                  <v-select
                    :counter="10"
                    :rules="nameRules2"
                    v-model="cloth_gender"
                    label="Select gender"
                    :items="['Male', 'Female']"
                  ></v-select>
                  <v-textarea
                    v-model="cloth_description"
                    :rules="nameRules2"
                    label="Description"
                  >
                  </v-textarea>

                  <v-text-field
                    v-model="cloth_price"
                    :counter="10"
                    :rules="nameRules2"
                    label="Price"
                  ></v-text-field>

                  <div class="container text-center">
                    <div class="d-flex">
                      <v-switch
                        color="pink"
                        v-model="S"
                        @click="All_size = false"
                        :label="`S ${S}`"
                      ></v-switch>
                      <v-switch
                        color="pink"
                        @click="All_size = false"
                        v-model="M"
                        :label="`M ${M}`"
                      ></v-switch>
                      <v-switch
                        color="pink"
                        @click="All_size = false"
                        v-model="L"
                        :label="`L ${L}`"
                      ></v-switch>
                      <v-switch
                        color="pink"
                        v-model="All_size"
                        @click="(S = true), (M = true), (L = true)"
                        :label="`All size ${All_size}`"
                      ></v-switch>
                    </div>
                    <div>
                      <div>
                        <div class="d-flex">
                          <span>
                            <v-icon>mdi-hanger</v-icon>
                          </span>
                          <div v-show="S"><h4>S</h4></div>
                          -
                          <div v-show="M"><h4>M</h4></div>
                          -
                          <div v-show="L"><h4>L</h4></div>
                          --
                          <div v-show="All_size"><h4>All size</h4></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <v-btn color="black" block class="white--text" @click="UploadItem">
                    Update item
                  </v-btn>
                </v-form>
              </div>
            </v-col>
          </v-row>
          <br />
        </div>
      </v-card>
    </v-dialog>
    <v-snackbar color="white--text" :timeout="4000" v-model="snackbar" center>
      {{ snackbarText }}
    </v-snackbar>
    <v-snackbar color="red" :timeout="4000" v-model="snackbar2" outlined bottom center>
      {{ snackbarText2 }}
    </v-snackbar>
  </div>
</template>
<script>
import Dropzone from "nuxt-dropzone";
import uploadStock from "/components/uploadStock";
export default {
  components: {
    uploadStock,
    Dropzone,
  },
  data() {
    return {
      statusItems: ["New arrival", "Sale", "Best sellers", "New arrival"],
      updateItemDialog: false,
      category: [
        {
          icon: "mdi-hanger",
          title: "Clothing",
        },
        {
          icon: "mdi-shoe-sneaker",
          title: "Shoes",
        },
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
      products: [],
      brands: [],
      categories: [],
      types: [],
      units: "",
      S: false,
      M: false,
      L: false,
      All: false,
      edit: false,
      switch1: true,
      item_id: null,
      scrollInvoked: 0,
      all_products: [],
      discount_state: false,
      snackbar: false,
      snackbarText: "No error message",
      snackbar2: false,
      showLogin: false,
      snackbarText2: "",
      discount_per: 0,
      dialog_delete: false,
      dialog_update: false,
      cloth_name: "",
      cloth_category: "",
      cloth_type: "",
      cloth_size: "",
      cloth_description: "",
      cloth_gender: "",
      cloth_price: "",
      cloth_status: "",
      cloth_status2: "",
      options: {
        url: "http://httpbin.org/anything",
      },
    };
  },
  methods: {
    ClearInput() {
      this.cloth_category = "";
      this.cloth_type = "";
      this.posterUrl = "";
      this.cloth_name = "";
      this.cloth_size = "";
      this.cloth_gender = "";
      this.cloth_description = "";
      this.cloth_size = "";
      this.cloth_price = "";
      this.cloth_status = "";
      this.clearDropzone();
    },
    handleSuccess(file, response) {
      // Handle success event here
      console.log("File uploaded successfully!", response);
    },
    clearDropzone() {
      this.$refs.el.dropzone.removeAllFiles();
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
    Refresh() {
      this.FetchProducts2();
      this.FetchPricing();
    },
    FetchPricing() {
      const db = this.$fire.firestore;
      db.collection("Admin")
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            // this.dis_per = doc.data().discount;
            this.discount_per = doc.data().discount;
            console.log("Admin details", this.discount_per);
          });
        });
    },
    async DeleteCartFromList(val) {
      const db = this.$fire.firestore;
      var cart_ref = db.collection("My_Stock").where("cloth_id", "==", val);
      let batch = db.batch();

      cart_ref.get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
          this.FetchProducts2();
          this.dialog_delete = false;
        });
        return batch.commit();
      });
    },
    discount(val) {
      let discount_rate = this.discount_per / 100;
      let new_price = val * discount_rate;

      console.log("price", val, "dis", discount_rate, "new price", new_price);
      return new_price;
    },
    DiscountLabel(val) {
      if (val == true) {
        return "Enabled";
      } else {
        return "Disabled";
      }
    },
    onScroll() {
      this.scrollInvoked++;
    },
    FetchProducts2() {
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
              cloth_status: doc.data().cloth_status,
              cloth_gender: doc.data().cloth_gender,
              cloth_description: doc.data().cloth_desc,
              state: doc.data().state,
              status: doc.data().status,
              Negotiable: doc.data().Negotiable,
              sold: doc.data().sold,
              discount: doc.data().discount,
              All_size: doc.data().All_size,
              S: doc.data().S,
              M: doc.data().M,
              L: doc.data().L,
            };

            this.all_products.push(data);
            console.log(this.all_products);
          });
        });
    },
    updateStatus(val, val2) {
      const db = this.$fire.firestore;
      db.collection("My_Stock")
        .doc(val2)
        .update({
          discount: val,
          discount_per: 60,
        })
        .then((docRef) => {
          // this.dropState = true;
          if (val == true) {
            this.snackbar = true;
            this.snackbarText = "Enabled";
          } else {
            this.snackbar = true;
            this.snackbarText = "Disabled";
          }
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.snackbarText2 = error;
        });
    },
    updateStatus1(val, val2) {
      const db = this.$fire.firestore;
      db.collection("My_Stock")
        .doc(val2)
        .update({
          Negotiable: val,
        })
        .then((docRef) => {
          // this.dropState = true;
          if (val == true) {
            this.snackbar = true;
            this.snackbarText = "Enabled";
          } else {
            this.snackbar = true;
            this.snackbarText = "Disabled";
          }
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.snackbarText2 = error;
        });
    },
    updateStatus2(val, val2) {
      const db = this.$fire.firestore;
      db.collection("My_Stock")
        .doc(val2)
        .update({
          status: val,
        })
        .then((docRef) => {
          // this.dropState = true;
          if (val == true) {
            this.snackbar = true;
            this.snackbarText = "Enabled";
          } else {
            this.snackbar = true;
            this.snackbarText = "Disabled";
          }
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.snackbarText2 = error;
        });
    },
    updateStatus3(val, val2) {
      const db = this.$fire.firestore;
      db.collection("My_Stock")
        .doc(val2)
        .update({
          state: val,
        })
        .then((docRef) => {
          // this.dropState = true;
          if (val == true) {
            this.snackbar = true;
            this.snackbarText = "Enabled";
          } else {
            this.snackbar = true;
            this.snackbarText = "Disabled";
          }
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.snackbarText2 = error;
        });
    },
    updateStatus4(val, val2) {
      const db = this.$fire.firestore;
      db.collection("My_Stock")
        .doc(val2)
        .update({
          sold: val,
        })
        .then((docRef) => {
          // this.dropState = true;
          if (val == true) {
            this.snackbar = true;
            this.snackbarText = "Enabled";
          } else {
            this.snackbar = true;
            this.snackbarText = "Disabled";
          }
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.snackbarText2 = error;
        });
    },
    UploadDiscount() {
      const db = this.$fire.firestore;
      db.collection("Admin")
        .doc("pricings")
        .update({
          discount: Number(this.discount_per),
        })
        .then((docRef) => {
          // this.dropState = true;

          this.FetchPricing();
          this.snackbar = true;
          this.snackbarText = "Updated";
          this.edit = false;
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.snackbarText2 = error;
        });
    },
    UploadItem() {
      if (this.cloth_category == "") {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide category";
      } else if (this.posterUrl == "") {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide a item image";
      } else if (this.cloth_name == "") {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide a item name";
      } else if (this.cloth_type == "") {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide a item type";
      } else if (this.cloth_description == "") {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide a item description";
      } else if (this.cloth_size == "") {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide a item size";
      } else if (this.cloth_gender == "") {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide gender";
      } else if (this.cloth_price == "") {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide item price";
      } else if (this.cloth_status == "") {
        this.snackbar2 = true;
        this.snackbarText2 = "Provide item status";
      } else {
        const db = this.$fire.firestore;
        this.id = uuid.v1();
        console.log(uuid.v1());
        let ID = this.cloth_name + this.cloth_type + this.cloth_size;
        let ID2 = this.cloth_name + this.cloth_type;
        db.collection("My_Stock")
          .doc(ID)
          .update({
            cloth_category: this.cloth_category,
            cloth_type: this.cloth_type,
            cloth_image: this.posterUrl,
            cloth_brand: this.cloth_name,
            size: this.cloth_size,
            cloth_gender: this.cloth_gender,
            cloth_desc: this.cloth_description,
            cloth_size: this.cloth_size,
            cloth_price: Number(this.cloth_price),
            cloth_status: this.cloth_status,
            S: this.S,
            M: this.M,
            L: this.L,
            All_size: this.All_size,
            cloth_discount: "",
            cloth_id: ID,
            item_id: ID2,
          })
          .then((docRef) => {
            // this.dropState = true;
            this.snackbar = true;
            ss;
            this.snackbarText = "Document written";
            this.updateItemDialog = false;
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            this.snackbar2 = true;
            this.dropState = true;
            this.snackbarText2 = error;
          });
      }
    },
  },
  created() {
    this.FetchProducts2();
    this.FetchPricing();
    this.FetchTypes();
  },
};
</script>
<style lang="css"></style>
