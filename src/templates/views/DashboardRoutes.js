import { Route } from "react-router-dom";
import { asyncComponent } from "../../functions/Helper";
import DashboardMain from "./dashboard/templates/DashboardMain";

const Dashboard = asyncComponent(() =>
  import('./dashboard/pages/Dashboard').then(module => module.default)
);

// account section:
const ManufactureInformation = asyncComponent(() =>
  import('./dashboard/pages/account/ManufactureInformation').then(module => module.default)
);

// Product Section:
const ManageProducts = asyncComponent(() =>
  import('./dashboard/pages/products/ManageProducts').then(module => module.default)
);

const AddProduct = asyncComponent(() =>
  import('./dashboard/pages/products/AddProduct').then(module => module.default)
);

const ManageCategories = asyncComponent(() =>
  import('./dashboard/pages/categories/ManageCategories').then(module => module.default)
);

const DashboardRoutes = () => ([
  <Route exact path="/dashboard" element={<Dashboard />} />,

  <Route exact path="/dashboard/account/password-reset" element={<DashboardMain> password-reset </DashboardMain>} />,

  <Route exact path="/dashboard/account/manufacturer-information" element={<ManufactureInformation />} />,

  <Route exact path="/dashboard/products/manage" element={<ManageProducts />} />,

  <Route exact path="/dashboard/products/create" element={<AddProduct />} />,

  <Route exact path="/dashboard/products/:productId" element={<>Edit Product</>} />,

  <Route exact path="/dashboard/categories/manage" element={<ManageCategories />} />,

  <Route exact path="/dashboard/categories/create" element={<AddProduct />} />,

  <Route exact path="/dashboard/categories/:categoryId" element={<>Edit Category</>} />,

]);

export default DashboardRoutes;
