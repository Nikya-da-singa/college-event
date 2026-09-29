import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import EventDetail from "./pages/EventDetail";
import AdminAddEvent from "./pages/AdminAddEvent";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events/:id" element={<EventDetail />} />
            <Route path="/admin/add-event" element={<AdminAddEvent />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
