// import guest from cross-domain-storage/guest
import createGuest from "cross-domain-storage/guest";

// create getUserLoginFromHornDomain variable for get LocalStorage from https://hornb2b.com/accessStorage
const getUserLoginFromHornDomain = createGuest('http://localhost:3000/accessStorage');

export {getUserLoginFromHornDomain};
