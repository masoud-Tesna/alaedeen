import { lazy, Suspense } from "react";
import { Navigate, Route } from "react-router-dom";
import { useGetAuthState } from "../../contexts/user/UserContext";

const Dashboard = lazy(() => import('./dashboard/pages/homePage'));

const AccountSettings = lazy(() => import('./dashboard/pages/account/Settings'));

const ManufactureInformation = lazy(() => import('./dashboard/pages/account/ManufactureInformation'));

const StoreInformation = lazy(() => import('./dashboard/pages/personalStore/StoreInformation'));

const ManageProducts = lazy(() => import('./dashboard/pages/products/ManageProducts'));

const CreateProduct = lazy(() => import('./dashboard/pages/products/CreateProduct'));

const UpdateProduct = lazy(() => import('./dashboard/pages/products/UpdateProduct'));

const ManageCategories = lazy(() => import('./dashboard/pages/categories/ManageCategories'));

const BusinessPromotion = lazy(() => import('./dashboard/pages/businessPromotion'));

const Affiliate = lazy(() => import('./dashboard/pages/affiliate'));

const RequestPublicSent = lazy(() => import('./dashboard/pages/requests/public/Sent'));

const RequestPublicReceived = lazy(() => import('./dashboard/pages/requests/public/Received'));

const RequestPrivateSent = lazy(() => import('./dashboard/pages/requests/private/Sent'));

const RequestPrivateReceived = lazy(() => import('./dashboard/pages/requests/private/Received'));

const RequestPublicConversation = lazy(() => import('./dashboard/pages/requests/public/Conversation'));

const RequestPrivateConversation = lazy(() => import('./dashboard/pages/requests/private/Conversation.js'));

const Invoices = lazy(() => import('./dashboard/pages/invoices'));

const PaymentResult = lazy(() => import('./dashboard/pages/invoices/Result'));

const Notifications = lazy(() => import('./dashboard/pages/notifications/Notifications'));

const DashboardRoutes = () => {

  const { user_data } = useGetAuthState();

  const planId = user_data?.auth?.plan_id || null;

  const isPersonalStore = user_data?.auth?.pay_for_store === "Y";

  return (
    <Route path="dashboard">

      { user_data?.load ?
        <>Loading...</> :

        user_data?.auth?.user_id ?
          <>
            <Route index element={ <Suspense fallback={null}><Dashboard /></Suspense> }/>

            <Route path="account">
              <Route index path="*" element={ <Navigate to="settings"/> }/>

              <Route path="settings" element={ <Suspense fallback={null}><AccountSettings /></Suspense> }/>

              <Route path="manufacturer-information" element={ <Suspense fallback={null}><ManufactureInformation /></Suspense> }/>
            </Route>

            <Route path="personal-store">
              {isPersonalStore ?
                <>
                  <Route index path="*" element={ <Navigate to="manage-information" /> }/>

                  <Route path="manage-information" element={ <Suspense fallback={null}><StoreInformation /></Suspense> }/>

                  <Route path="categories">
                    <Route index element={ <Suspense fallback={null}><ManageCategories /></Suspense> }/>

                    <Route path=":categoryId" element={ <Suspense fallback={null}><h1>Edit Category</h1></Suspense> }/>
                  </Route>
                </> :
                <Route index path="*" element={ <Navigate to="/dashboard" /> }/>
              }
            </Route>

            <Route path="products">
              <Route index element={ <Suspense fallback={null}><ManageProducts /></Suspense> }/>

              <Route path="create" element={ <Suspense fallback={null}><CreateProduct /></Suspense> }/>

              <Route path=":productId" element={ <Suspense fallback={null}><UpdateProduct /></Suspense> }/>
            </Route>

            <Route path="business-promotion" element={ <Suspense fallback={null}><BusinessPromotion /></Suspense> }/>

            <Route path="invoices">
              <Route index element={ <Suspense fallback={null}><Invoices /></Suspense> }/>

              <Route path="result/:orderId" element={ <Suspense fallback={null}><PaymentResult /></Suspense> }/>

              <Route path="*" element={ <Navigate to="" /> }/>
            </Route>

            <Route path="affiliate" element={ planId === "14" ? <Suspense fallback={null}><Affiliate /></Suspense> : <Navigate to="/dashboard" /> }/>

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

              <Route path="sent">
                <Route index element={ <Navigate to="public"/> }/>

                <Route path="public">
                  <Route index element={ <Suspense fallback={null}><RequestPublicSent /></Suspense> } />

                  <Route path=":requestId" element={ <Suspense fallback={null}><RequestPublicConversation /></Suspense> } />
                </Route>

                <Route path="private">
                  <Route index element={ <Suspense fallback={null}><RequestPrivateSent/></Suspense> } />

                  <Route path=":requestId" element={ <Suspense fallback={null}><RequestPrivateConversation /></Suspense> } />
                </Route>
              </Route>

              <Route path="received">
                <Route index element={ <Navigate to="public"/> }/>

                <Route path="public">
                  <Route index element={ <Suspense fallback={null}><RequestPublicReceived /></Suspense> } />

                  <Route path=":requestId" element={ <Suspense fallback={null}><RequestPublicConversation /></Suspense> } />
                </Route>

                <Route path="private">
                  <Route index element={ <Suspense fallback={null}><RequestPrivateReceived /></Suspense> } />

                  <Route path=":requestId" element={ <Suspense fallback={null}><RequestPrivateConversation /></Suspense> } />
                </Route>

              </Route>
            </Route>
  
            <Route path="notifications" element={ <Suspense fallback={null}><Notifications /></Suspense> }/>
          </> :
          <Route index path={ "*" } element={ <Navigate to="/"/> }/>
      }
    </Route>
  )
}

export default DashboardRoutes;
