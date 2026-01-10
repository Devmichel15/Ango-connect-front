import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Sign />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
export default App;
