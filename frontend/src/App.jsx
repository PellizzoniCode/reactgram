import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { useAuth } from "./hooks/useAuth";

import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/Auth/Register";
import EditProfile from "./pages/EditProfile/EditProfile";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={auth ? <Home /> : <Login />} />
            <Route
              path="/profile"
              element={auth ? <EditProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
