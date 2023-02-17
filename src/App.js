import { BrowserRouter, Route} from "react-router-dom";
import './App.css';
import React from "react";
import AdminRegisterScreen from "./screens/userManagement/register/AdminRegisterScreen";
import AdminLoginScreen from "./screens/userManagement/login/AdminLoginScreen";
import CustomerLoginScreen from "./screens/userManagement/login/CustomerLoginScreen";
import LoginSelectorPage from "./screens/static/loginSelector/LoginSelectorPage";
import SellerLoginScreen from "./screens/userManagement/login/SellerLoginScreen";
import CustomerRegisterScreen from "./screens/userManagement/register/CustomerRegisterScreen";
import SellerRegisterScreen from "./screens/userManagement/register/SellerRegisterScreen";


const App = () => {
  return (
    <BrowserRouter>
      
       <main>
      
          <Route path = "/admin-register" component={AdminRegisterScreen}exact/>
          <Route path = "/customer-register"component={CustomerRegisterScreen}exact/>
          <Route path = "/seller-register"component={SellerRegisterScreen}exact/>
          <Route path = "/admin-login" component={AdminLoginScreen} exact />
          <Route path = "/customer-login" component={CustomerLoginScreen}exact />
          <Route path = "/seller-login" component={SellerLoginScreen}exact/>
          <Route path="/login-select" component={LoginSelectorPage} exact />
       
       </main>
       
    </BrowserRouter>
  );
}

export default App;
