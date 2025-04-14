<template>
  <div>
    <v-app-bar color="white" :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn icon to="/Admin/uploads">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon to="/Admin/uploads">
        <v-icon>mdi-cart-variant</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
export default {};
</script>
<style lang="">
</style>
