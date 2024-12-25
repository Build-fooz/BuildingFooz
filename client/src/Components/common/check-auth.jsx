/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  console.log("Location:", location.pathname);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("User:", user); 
  
//User role
  const Role = (role) => user?.role === role; 
  const Redirects = () => {
    if (location.pathname === "/") {
      return isAuthenticated
        ? Role("admin") ? "/admin/dashboard" : "/"
        : null; 
    } 
    if (isAuthenticated && ["/login", "/signup","/resetpassword"].some(path => location.pathname.includes(path))) {
      return Role("admin") ? "/admin/dashboard" : "/";
    }
    if (!isAuthenticated && location.pathname.includes("/resetpassword")) {
      return null; 
    }
    if (isAuthenticated && !Role("admin") && location.pathname.includes("admin")) {
      return "/unauthpage";
    } 
    if (isAuthenticated && Role("admin") && location.pathname.includes("/")) {
      return "/admin/dashboard";
    }
    return null; 
  };
  const redirectTo = Redirects();
  if (redirectTo) {  
    return <Navigate to={redirectTo} />;
  }
  return <>{children}</>;
}
export default CheckAuth;
