import Layout from "../components/layout"
import Sandwiches from "../views/sandwiches"

const routes = [
  {
    path: "/sandwiches",
    component: Layout,
    routes: [
      {
        path: 'a',
        component: Sandwiches
      }
    ]
  }
]

export default routes
