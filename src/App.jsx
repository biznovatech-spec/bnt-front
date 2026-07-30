import { RouterProvider } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { router } from "./router";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  );
}

export default App;
