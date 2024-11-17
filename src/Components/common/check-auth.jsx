/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Logging to check current path and authentication state
  console.log("Location:", location.pathname);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("User:", user);

  // Define a utility function for checking roles
  const hasRole = (role) => user?.role === role;

  // Handle redirects based on the current path
  const handleRedirects = () => {
    // Redirect to dashboard or listing based on role if authenticated on the home page
    if (location.pathname === "/") {
      return isAuthenticated
        ? hasRole("admin") ? "/admin/dashboard" : "/"
        : null; // No forced redirect to login if unauthenticated
    }

    // Redirect if user is authenticated and accessing login/signup pages
    if (isAuthenticated && ["/login", "/signup"].some(path => location.pathname.includes(path))) {
      return hasRole("admin") ? "/admin/dashboard" : "/";
    }

    // Prevent regular users from accessing admin routes
    if (isAuthenticated && !hasRole("admin") && location.pathname.includes("admin")) {
      return "/unauthpage";
    }

    // Prevent admin users from accessing regular user routes directly
    if (isAuthenticated && hasRole("admin") && location.pathname.includes("/")) {
      return "/admin/dashboard";
    }

    return null; // No redirection needed
  };

  const redirectTo = handleRedirects();
  if (redirectTo) {
    // Add user feedback via toast notifications if needed
    // e.g., toast.error("Redirecting due to role-based access control");

    return <Navigate to={redirectTo} />;
  }

  return <>{children}</>;
}

export default CheckAuth;


// /* eslint-disable react/prop-types */
// import { Navigate, useLocation } from "react-router-dom";

// function CheckAuth({ isAuthenticated, user, children }) {
//   const location = useLocation();

//   // Logging to check current path and authentication state
//   console.log("Location:", location.pathname);
//   console.log("isAuthenticated:", isAuthenticated);
//   console.log("User:", user);

//   // Redirect to login if on home page and not authenticated
//   if (location.pathname === "/") {
//     if (!isAuthenticated) {
//       return <Navigate to="/auth/login" />;
//     } else if (user?.role === "admin") {
//       return <Navigate to="/admin/dashboard" />;
//     }
//   }

//   // Redirect if user is not logged in and trying to access a protected route
//   if (
//     !isAuthenticated &&
//     !(
//       location.pathname.includes("/login") ||
//       location.pathname.includes("/signup")
//     )
//   ) {
//     return <Navigate to="/auth/login" />;
//   }

//   // Redirect based on user role when accessing login/signup pages while authenticated
//   if (
//     isAuthenticated &&
//     (location.pathname.includes("/login") ||
//       location.pathname.includes("/signup"))
//   ) {
//     return user?.role === "admin"
//       ? <Navigate to="/admin/dashboard" />
//       : <Navigate to="/shop/listing" />;
//   }

//   // Prevent regular users from accessing admin routes
//   if (
//     isAuthenticated &&
//     user?.role !== "admin" &&
//     location.pathname.includes("admin")
//   ) {
//     return <Navigate to="/unauthpage" />;
//   }

//   // Prevent admin users from accessing regular user routes directly
//   if (
//     isAuthenticated &&
//     user?.role === "admin" &&
//     location.pathname.includes("/shop")
//   ) {
//     return <Navigate to="/admin/dashboard" />;
//   }

//   return <>{children}</>;
// }

// export default CheckAuth;