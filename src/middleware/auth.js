export default function (to, from, next) {
    let isLoggedIn = sessionStorage.getItem('user') ? sessionStorage.getItem('user') : false 
    if (to.meta.auth && !isLoggedIn) {
        // Redirect the user to the login page if not authenticated
        next('/login');
    } else {
        // Continue with the next middleware or to the route
        next();
    }
}
