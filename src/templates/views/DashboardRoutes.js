import { Route } from "react-router-dom";
import { asyncComponent } from "../../functions/Helper";

/*const Dashboard = asyncComponent(() =>
  import('./dashboard/pages/Dashboard').then(module => module.default)
);*/

// account section:
const ManufactureInformation = asyncComponent(() =>
  import('./dashboard/pages/account/ManufactureInformation').then(module => module.default)
);

// Product Section:
const ManageProducts = asyncComponent(() =>
  import('./dashboard/pages/products/ManageProducts').then(module => module.default)
);

const CreateProduct = asyncComponent(() =>
  import('./dashboard/pages/products/CreateProduct').then(module => module.default)
);

const UpdateProduct = asyncComponent(() =>
  import('./dashboard/pages/products/UpdateProduct').then(module => module.default)
);

const ManageCategories = asyncComponent(() =>
  import('./dashboard/pages/categories/ManageCategories').then(module => module.default)
);

const Plans = asyncComponent(() =>
  import('./dashboard/pages/plans').then(module => module.default)
);

const Result = asyncComponent(() =>
  import('./dashboard/pages/payment/Result').then(module => module.default)
);

const DashboardRoutes = () => ([
  <Route exact path="/dashboard" element={<Plans />} />,

  <Route exact path="/dashboard/account/password-reset" element={<h1> password-reset </h1>} />,

  <Route exact path="/dashboard/account/manufacturer-information" element={<ManufactureInformation />} />,

  <Route exact path="/dashboard/products/manage" element={<ManageProducts />} />,

  <Route exact path="/dashboard/products/create" element={<CreateProduct />} />,

  <Route exact path="/dashboard/products/:productId" element={<UpdateProduct />} />,

  <Route exact path="/dashboard/categories/manage" element={<ManageCategories />} />,

  <Route exact path="/dashboard/categories/:categoryId" element={<>Edit Category</>} />,

  <Route exact path="/dashboard/plans" element={<Plans />} />,

  <Route exact path="/dashboard/payment/result" element={<Result />} />,

]);

export default DashboardRoutes;
