import { Page } from "@/_components/Page";
import { SoloLayout } from "@/_layouts/SoloLayout";
import CountriesPage from "@/pages/dashboards/countries";
import CountryDetail from "@/pages/dashboards/countries/CountryDetail";
import Error404 from "@/pages/extra-pages/404";
import { createBrowserRouter } from "react-router-dom";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <Page Component={CountriesPage} />,
      },
      {
        path: "/dashboards/countries",
        element: <Page Component={CountriesPage} />,
      },
      {
        path: "/dashboards/countries/:code",
        element: <Page Component={CountryDetail} />,
      },
    ],
  },
  {
    path: "/extra-pages",
    element: <SoloLayout />,
    children: [
      {
        path: "404",
        element: <Error404 />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />,
  },
];

export const router = createBrowserRouter(routes);
