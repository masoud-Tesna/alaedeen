import { Navigate, Route } from "react-router-dom";
import { asyncComponent } from "../../functions/Helper";
import { useGetAuthState } from "../../contexts/user/UserContext";

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

const Affiliate = asyncComponent(() =>
  import('./dashboard/pages/affiliate').then(module => module.default)
);

const DashboardRoutes = () => {

  const { user_data } = useGetAuthState();

  return (
    <Route path="dashboard">

      {user_data?.load ?
        <>Loading...</> :

        user_data?.auth?.user_id ?
          <>
            <Route index element={<Plans />} />

            <Route path="account/password-reset" element={<h1> password-reset </h1>} />

            <Route path="account/manufacturer-information" element={<ManufactureInformation />} />

            <Route path="products">
              <Route index element={<Navigate to="manage" />} />

              <Route path={"manage"} element={<ManageProducts />} />

              <Route path="create" element={<CreateProduct />} />

              <Route path=":productId" element={<UpdateProduct />} />
            </Route>

            <Route path="categories">
              <Route index element={<Navigate to="manage" />} />

              <Route path={"manage"} element={<ManageCategories />} />

              <Route path=":categoryId" element={<>Edit Category</>} />
            </Route>

            <Route path="plans" element={<Plans />} />

            <Route path="payment/result" element={<Result />} />

            <Route path="affiliate" element={<Affiliate />} />
          </> :
          <Route index path={"*"} element={<Navigate to="/" />} />
      }
    </Route>
  )
}

export default DashboardRoutes;
