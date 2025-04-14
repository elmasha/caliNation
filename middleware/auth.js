export default function ({ store, app, route, redirect }) {
  if (route.path === "/") {
    //  we are on a protected route
    // if (app.$fire.auth.currentUser == null) {
    //   //take them to sign in page
    //   return redirect("/login");
    // } else {
    //   //ff
    //   // return redirect("admin/dashboard");
    // }
  }else   if (route.path === "/accounts") {
    //  we are on a protected route
    if (app.$fire.auth.currentUser == null) {
      //take them to sign in page
      return redirect("/login");
    } else {
      //ff
      // return redirect("admin/dashboard");
    }
  }

}

// export default function ({ store, app, route, redirect }) {
//   if (route.path === "/admin") {
//     //  we are on a protected route
//     if (!app.$fire.auth.currentUser) {
//       //take them to sign in page
//       return redirect("/auth/login");
//     } else {
//       // return redirect("admin/dashboard");
//     }
//   } else if (route.path === "/cartlist") {
//     //  we are on a protected route
//     if (!app.$fire.auth.currentUser) {
//       //take them to sign in page
//       return redirect("/shop");
//     } else {
//       //return redirect("admin/dashboard");
//     }
//   }

// }
