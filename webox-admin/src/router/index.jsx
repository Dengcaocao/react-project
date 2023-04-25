import Layout from "../components/layout";
import Sandwiches from "../views/sandwiches";

const routes = [
  {
    path: "/",
    component: Layout,
    routes: [
      {
        path: 'sandwiches',
        component: Sandwiches
      }
    ]
  }
]

export default routes
