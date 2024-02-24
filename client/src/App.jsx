import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import { Suspense, lazy } from "react";
const App = () => {
  const Home = lazy(() => import("./pages/Home.jsx"));
  const About = lazy(() => import("./pages/About.jsx"));
  const Services = lazy(() => import("./pages/Services.jsx"));

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "services",
          element: <Services />,
        },
      ],
    },
  ]);
  return (
    <Suspense fallback={<h1>Loading....</h1>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
