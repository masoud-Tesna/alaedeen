import { Route } from "react-router-dom";
import { asyncComponent } from "../../functions/Helper";
import DashboardMain from "./dashboard/templates/DashboardMain";

const Dashboard = asyncComponent(() =>
  import('./dashboard/pages/Dashboard').then(module => module.default)
);

const ManageProducts = asyncComponent(() =>
  import('./dashboard/pages/ManageProducts').then(module => module.default)
);

const AddProduct = asyncComponent(() =>
  import('./dashboard/pages/AddProduct').then(module => module.default)
);

const DashboardRoutes = () => ([
  <Route exact path="/dashboard" element={<Dashboard />} />,

  <Route exact path="/dashboard/account/password-reset" element={<DashboardMain> password-reset </DashboardMain>} />,

  <Route exact path="/dashboard/account/manufacturer-information" element={<DashboardMain> manufacturer-information </DashboardMain>} />,

  <Route exact path="/dashboard/product/products" element={<ManageProducts />} />,

  <Route exact path="/dashboard/product/:productId" element={<h1>Product edit</h1>} />,

  <Route exact path="/dashboard/product/add" element={<AddProduct />} />,

]);

export default DashboardRoutes;
