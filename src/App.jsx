import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TableComponent from "./Components/TableComponent/TableComponent";

function App() {
  const navStyle = {
    background: "#f4f4f4",
    padding: "10px",
    marginBottom: "20px",
  };

  const navListStyle = {
    display: "flex",
    listStyle: "none",
    gap: "20px",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    padding: "5px 10px",
    borderRadius: "4px",
    transition: "background-color 0.3s",
  };

  return (
    <Router>
      <div>
        <nav style={navStyle}>
          <ul style={navListStyle}>
            <li>
              <Link to="/" style={linkStyle}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/empty" style={linkStyle}>
                Empty Component
              </Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h1 class="text-3xl font-bold underline">Hello world!</h1>

                <div style={{ padding: "20px", textAlign: "center" }}>
                  Home Page
                </div>
              </div>
            }
          />

          <Route path="/table" element={<TableComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
