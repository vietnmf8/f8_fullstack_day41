import paths from "./configs/path";
import DefaultLayout from "./layouts/DefaultLayout";
import Provinces from "./pages/Address/Provinces";
import Home from "./pages/Home";

const routes = [
    {
        layout: DefaultLayout,
        children: [
            { path: paths.home, component: Home },
            { path: paths.provinces, component: Provinces },
        ],
    },
];

export default routes;
