import paths from "./configs/path";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";

const routes = [
    {
        layout: DefaultLayout,
        children: [{ path: paths.home, component: Home }],
    },
];

export default routes;
