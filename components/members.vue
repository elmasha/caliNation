<template>
  <div>
    <v-row>
      <v-col cols="12" md="12" lg="12" sm="12">
        <div class="container">
          <v-list>
            <v-list-item v-for="(chat, idcc) in recent" :key="idcc">
              <v-list-item-avatar>
                <v-img
                  :alt="`${chat.user_name} avatar`"
                  :src="showImage(chat.image)"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="chat.user_name"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="chat.email"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon> </v-list-item-icon>
            </v-list-item>
          </v-list>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      recent: [],
      empty_user: require("@/assets/user.png"),
    };
  },
  methods: {
    showImage(val) {
      if (val == null) {
        return this.empty_user;
      } else {
        return val;
      }
    },
    FetchOrder() {
      const db = this.$fire.firestore;
      db.collection("Members")
        .get()
        .then((queryResult) => {
          queryResult.forEach((doc) => {
            console.log("Members details", doc.data());
            const data = {
              image: doc.data().image,
              user_name: doc.data().user_name,
              email: doc.data().email,
            };
            this.recent.push(data);
          });
        });
    },
  },
  created() {
    this.FetchOrder();
  },
};
</script>
<style lang=""></style>
