import { lazy, Suspense } from "react";
import { Navigate, Route } from "react-router-dom";
import { useGetAuthState } from "../../contexts/user/UserContext";

// account section:
const ManufactureInformation = lazy(() => import('./dashboard/pages/account/ManufactureInformation'));

// Product Section:
const ManageProducts = lazy(() => import('./dashboard/pages/products/ManageProducts'));

const CreateProduct = lazy(() => import('./dashboard/pages/products/CreateProduct'));

const UpdateProduct = lazy(() => import('./dashboard/pages/products/UpdateProduct'));

const ManageCategories = lazy(() => import('./dashboard/pages/categories/ManageCategories'));

const Plans = lazy(() => import('./dashboard/pages/plans'));

const Result = lazy(() => import('./dashboard/pages/payment/Result'));

const Affiliate = lazy(() => import('./dashboard/pages/affiliate'));

const RequestPublicSent = lazy(() => import('./dashboard/pages/requests/public/Sent'));

const RequestPublicReceived = lazy(() => import('./dashboard/pages/requests/public/Received'));

const RequestPrivateSent = lazy(() => import('./dashboard/pages/requests/private/Sent'));

const RequestPrivateReceived = lazy(() => import('./dashboard/pages/requests/private/Received'));

const RequestPublicConversation = lazy(() => import('./dashboard/pages/requests/public/Conversation'));
const RequestPrivateConversation = lazy(() => import('./dashboard/pages/requests/private/Conversation.js'));

const DashboardRoutes = () => {

  const { user_data } = useGetAuthState();

  return (
    <Route path="dashboard">

      { user_data?.load ?
        <>Loading...</> :

        user_data?.auth?.user_id ?
          <>
            <Route index element={ <Suspense fallback={null}><Plans /></Suspense> }/>

            <Route path="account/password-reset" element={ <Suspense fallback={null}><h1> password-reset </h1></Suspense> }/>

            <Route path="account/manufacturer-information" element={ <Suspense fallback={null}><ManufactureInformation /></Suspense> }/>

            <Route path="products">
              <Route index element={ <Navigate to="manage"/> }/>

              <Route path="manage" element={ <Suspense fallback={null}><ManageProducts /></Suspense> }/>

              <Route path="create" element={ <Suspense fallback={null}><CreateProduct /></Suspense> }/>

              <Route path=":productId" element={ <Suspense fallback={null}><UpdateProduct /></Suspense> }/>
            </Route>

            <Route path="categories">
              <Route index element={ <Navigate to="manage"/> }/>

              <Route path="manage" element={ <Suspense fallback={null}><ManageCategories /></Suspense> }/>

              <Route path=":categoryId" element={ <Suspense fallback={null}><h1>Edit Category</h1></Suspense> }/>
            </Route>

            <Route path="plans" element={ <Suspense fallback={null}><Plans /></Suspense> }/>

            <Route path="payment/result" element={ <Suspense fallback={null}><Result /></Suspense> }/>

            <Route path="affiliate" element={ <Suspense fallback={null}><Affiliate /></Suspense> }/>

            <Route path="requests">
              <Route index element={ <Navigate to="/dashboard"/> }/>

              <Route path="public">
                <Route index element={ <Navigate to="sent"/> }/>

                <Route path="sent">
                  <Route index element={ <Suspense fallback={null}><RequestPublicSent /></Suspense> } />

                  <Route path=":requestId" element={ <Suspense fallback={null}><RequestPublicConversation /></Suspense> } />
                </Route>

                <Route path="received">
                  <Route index element={ <Suspense fallback={null}><RequestPublicReceived /></Suspense> } />

                  <Route path=":requestId" element={ <Suspense fallback={null}><RequestPublicConversation /></Suspense> } />
                </Route>
              </Route>

              <Route path="private">
                <Route index element={ <Navigate to="sent"/> }/>

                <Route path="sent">
                  <Route index element={ <Suspense fallback={null}><RequestPrivateSent /></Suspense> } />

                  <Route path=":requestId" element={ <Suspense fallback={null}><RequestPrivateConversation /></Suspense> } />
                </Route>

                <Route path="received">
                  <Route index element={ <Suspense fallback={null}><RequestPrivateReceived /></Suspense> } />

                  <Route path=":requestId" element={ <Suspense fallback={null}><RequestPrivateConversation /></Suspense> } />
                </Route>

              </Route>
            </Route>
          </> :
          <Route index path={ "*" } element={ <Navigate to="/"/> }/>
      }
    </Route>
  )
}

export default DashboardRoutes;
