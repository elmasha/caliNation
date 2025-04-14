<template>
  <v-app>
    <div class="container">
      <v-row>
        <v-col cols="12" sm="12" md="12">
          <div class="container">
            <h2>Upload New Stock</h2>
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
              <div class="container">
                <h4>Select category</h4>
              </div>
              <div class="row">
                <v-item v-for="cat in category" :key="cat" v-slot="{ active }">
                  <v-chip-group row>
                    <v-chip @click="cloth_category = cat.title" filter variant="outlined">
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
                <v-item v-for="type in types" :key="type" v-slot="{ active }">
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
                placeholder="eg. Dress , Jumpsuit ,Suit "
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
                placeholder="eg. New arrival ,Sale"
                :items="['New arrival', 'Sale', 'Discount', 'Best sellers']"
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
                placeholder="Item Description"
              >
              </v-textarea>

              <v-text-field
                v-model="cloth_price"
                :counter="10"
                :rules="nameRules2"
                label="Item Price"
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
                Upload item
              </v-btn>
            </v-form>
          </div>
        </v-col>
      </v-row>
      <br />
    </div>
    <v-snackbar color="green accent-8" :timeout="2000" v-model="snackbar" bottom outlined>
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
  </v-app>
</template>
<script>
import Dropzone from "nuxt-dropzone";
import "nuxt-dropzone/dropzone.css";
import { uuid } from "vue-uuid";
import myOrders from "/components/myOrders";

export default {
  components: {
    Dropzone,
    myOrders,
  },
  data() {
    return {
      S: false,
      M: false,
      L: false,
      All_size: false,
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
      options: {
        url: "http://httpbin.org/anything",
      },
      snackbar: false,
      snackbarText: "",
      snackbar2: false,
      snackbarText2: "",
      posterUrl: "",
      images: [],
      units: [],
      id: "",
      idd: "",
      tab: null,
    };
  },
  mounted() {
    const instance = this.$refs.el.dropzone;
  },
  created() {
    this.FetchTypes();
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
    onScroll() {
      this.scrollInvoked++;
    },
    FetchProductSearchAll(val, val2) {
      const db = this.$fire.firestore;

      if (val != "") {
        this.all_products.splice(this.all_products);

        db.collection("items")
          .where("item_category", "==", val)
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                item_b: doc.data().item_brand,
                item_cat_id: doc.data().item_category,
                item_im: doc.data().item_image,
                item_un: doc.data().item_unit,
                item_sku_unit: doc.data().item_sku_unit,
                item_type: doc.data().item_type,
              };
              this.all_products.push(data);
              console.log(this.all_products);
            });
          });
      } else {
        this.all_products.splice(this.all_products);

        db.collection("items")
          .where("item_category", "==", val)
          .where("item_brand", "==", val2)
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                item_b: doc.data().item_brand,
                item_cat_id: doc.data().item_category,
                item_im: doc.data().item_image,
                item_un: doc.data().item_unit,
                item_sku_unit: doc.data().item_sku_unit,
                item_type: doc.data().item_type,
              };
              this.all_products.push(data);
              console.log(this.all_products);
            });
          });
      }
    },
    FetchProductSearch(val, val2) {
      const db = this.$fire.firestore;

      if (val != "") {
        this.products.splice(this.products);

        db.collection("items")
          .where("item_category", "==", val)
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                item_b: doc.data().item_brand,
                item_cat_id: doc.data().item_category,
                item_im: doc.data().item_image,
                item_un: doc.data().item_unit,
                item_sku_unit: doc.data().item_sku_unit,
                item_type: doc.data().item_type,
              };
              this.products.push(data);
              console.log(this.products);
            });
          });
      } else {
        this.products.splice(this.products);

        db.collection("items")
          .where("item_category", "==", val)
          .where("item_brand", "==", val2)
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                item_b: doc.data().item_brand,
                item_cat_id: doc.data().item_category,
                item_im: doc.data().item_image,
                item_un: doc.data().item_unit,
                item_sku_unit: doc.data().item_sku_unit,
                item_type: doc.data().item_type,
              };
              this.products.push(data);
              console.log(this.products);
            });
          });
      }
    },
    FetchProductSearch2(val) {
      const db = this.$fire.firestore;

      if (val != "") {
        this.products.splice(this.products);
        db.collection("items")
          .where("item_category", "==", this.searchCat)
          .where("item_brand", "==", val)
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                item_b: doc.data().item_brand,
                item_cat_id: doc.data().item_category,
                item_im: doc.data().item_image,
                item_un: doc.data().item_unit,
                item_sku_unit: doc.data().item_sku_unit,
                item_type: doc.data().item_type,
              };
              this.products.push(data);
              console.log(this.products);
            });
          });
      } else {
      }
    },
    FetchProducts() {
      if ((this.item_name_s == null) | (this.item_type_s == null)) {
        const db = this.$fire.firestore;
        this.products.splice(this.products);
        db.collection("items")
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                item_b: doc.data().item_brand,
                item_cat_id: doc.data().item_category,
                item_im: doc.data().item_image,
                item_un: doc.data().item_unit,
                item_sku_unit: doc.data().item_sku_unit,
                item_type: doc.data().item_type,
              };

              this.products.push(data);
              console.log(this.products);
            });
          });
      } else {
        const db = this.$fire.firestore;
        this.products.splice(this.products);
        db.collection("items")
          .where("item_category", "==", this.item_name_s)
          .where("tem_category", "==", this.item_type_s)
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                item_b: doc.data().item_brand,
                item_cat_id: doc.data().item_category,
                item_im: doc.data().item_image,
                item_un: doc.data().item_unit,
                item_sku_unit: doc.data().item_sku_unit,
                item_type: doc.data().item_type,
              };
              this.products.push(data);
              console.log(this.products);
            });
          });
      }
    },
    FetchProducts2() {
      if ((this.item_name_s == null) | (this.item_type_s == null)) {
        const db = this.$fire.firestore;
        this.all_products.splice(this.all_products);
        db.collection("items")
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                item_b: doc.data().item_brand,
                item_cat_id: doc.data().item_category,
                item_im: doc.data().item_image,
                item_un: doc.data().item_unit,
                item_sku_unit: doc.data().item_sku_unit,
                item_type: doc.data().item_type,
              };

              this.all_products.push(data);
              console.log(this.all_products);
            });
          });
      } else {
        const db = this.$fire.firestore;
        this.products.splice(this.products);
        db.collection("items")
          .where("item_category", "==", this.item_name_s)
          .where("tem_category", "==", this.item_type_s)
          .get()
          .then((queryResult6) => {
            queryResult6.forEach((doc) => {
              const data = {
                id: doc.id,
                item_b: doc.data().item_brand,
                item_cat_id: doc.data().item_category,
                item_im: doc.data().item_image,
                item_un: doc.data().item_unit,
                item_sku_unit: doc.data().item_sku_unit,
                item_type: doc.data().item_type,
              };
              this.products.push(data);
              console.log(this.products);
            });
          });
      }
    },
    FetchBrands() {
      const db = this.$fire.firestore;
      this.brands.splice(this.brands);
      db.collection("Brand")
        .get()
        .then((queryResult6) => {
          queryResult6.forEach((doc) => {
            const data = {
              id: doc.id,
              brand: doc.data().brand,
            };

            this.brands.push(data);
            console.log(this.brands);
          });
        });
    },
    Fetch() {
      const db = this.$fire.firestore;
      this.categories.splice(this.categories);
      db.collection("categories")
        .get()
        .then((queryResult6) => {
          queryResult6.forEach((doc) => {
            const data = {
              id: doc.id,
              cat: doc.data().category,
              cat_id: doc.data().cat_id,
            };

            this.categories.push(data);
            console.log(this.categories);
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
    FetchUnits() {
      const db = this.$fire.firestore;
      this.units.splice(this.units);
      db.collection("units")
        .get()
        .then((queryResult6) => {
          queryResult6.forEach((doc) => {
            const data = {
              id: doc.id,
              units: doc.data().units,
            };
            this.units.push(data);
            console.log(this.categories);
          });
        });
    },
    setCat(val) {
      val = this.cate;
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
          .set({
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
            this.snackbarText = "Document written";
            this.UploadType();
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            this.snackbar2 = true;
            this.dropState = true;
            this.snackbarText2 = error;
          });
      }
    },

    UploadBrand() {
      const db = this.$fire.firestore;
      let id = this.cloth_category + this.cloth_type;
      db.collection("Brand")
        .doc(this.cloth_name)
        .set({
          name: this.cloth_name,
          id: id,
        })
        .then((docRef) => {
          this.UploadType();
          this.snackbar = true;
          this.snackbarText = "brand  uploaded";
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.snackbarText2 = "Selection Fee updated";
        });
    },

    UploadType() {
      const db = this.$fire.firestore;
      db.collection("Type")
        .doc(this.cloth_type)
        .set({
          type: this.cloth_type,
        })
        .then((docRef) => {
          this.UploadGenderAndType();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.snackbarText2 = error;
        });
    },

    UploadGenderAndType() {
      const db = this.$fire.firestore;
      db.collection(this.cloth_gender)
        .doc(this.cloth_type)
        .set({
          type: this.cloth_type,
        })
        .then((docRef) => {
          this.snackbar = true;
          this.snackbarText = "item uploaded";
          this.Fetch();
          this.FetchTypes();
          this.ClearInput();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          this.snackbar2 = true;
          this.snackbarText2 = error;
        });
    },

    async afterCompletePoster(upload2) {
      const storageRef = this.$fire.storage.ref();
      var imageNameP = uuid.v1();
      try {
        //save image
        let file = upload2;
        var metadata = {
          contentType: "image/png",
        };
        var imageRef = storageRef.child(`images/${imageNameP}.png`);
        await imageRef.put(file, metadata);
        var downloadURLP = await imageRef.getDownloadURL();
        this.images.push({ src: downloadURLP });
        this.posterUrl = downloadURLP;
        console.log(this.posterUrl);
        this.snackbar = true;
        this.snackbarText = "Image Uploaded";
      } catch (error) {
        this.snackbar2 = true;
        this.snackbarText2 = error;
        console.log(error);
      }
    },
    queryCategory(val) {
      const db = this.$fire.firestore;
      db.collection("categories")
        .where("category", "==", val)
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            const data = {
              id: doc.id,
              category: doc.data().category,
            };
            if (data.category == this.cate) {
              console.log("This category exists");
              this.UploadItem(data.id);
            } else {
              this.AddCategory(val);
              console.log("null ");
            }
          });
        });
    },
  },
};
</script>
<style>
#cat_chip {
  margin: 3px;
}
#cat_chip2 {
  margin: 4px;
}
.scrollmenu {
  overflow: auto;
  white-space: wrap;
  padding: 5px 10px 5px 10px;
}
</style>
