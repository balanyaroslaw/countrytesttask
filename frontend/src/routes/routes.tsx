import { ROUTER_KEYS } from "../keys/links";
import { CountryPage } from "../pages/country.page";
import { MainPage } from "../pages/main.page";

export const routes = [
    {
        route: ROUTER_KEYS.ALL,
        element: <MainPage/>
    },
    {
        route: ROUTER_KEYS.INFO,
        element: <CountryPage/>
    },
]