import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TableComponent from "./Components/TableComponent/TableComponent";

function App() {
  return (
    <Router>
      <div>
        <nav className="bg-gray-100 p-2.5 mb-5">
          <ul className="flex list-none gap-5">
            <li>
              <Link
                to="/"
                className="no-underline text-gray-800 font-bold px-2.5 py-1.5 rounded transition-colors duration-300 hover:bg-gray-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/table"
                className="no-underline text-gray-800 font-bold px-2.5 py-1.5 rounded transition-colors duration-300 hover:bg-gray-200"
              >
                Table
              </Link>
            </li>
            <li>
              <Link
                to="/empty"
                className="no-underline text-gray-800 font-bold px-2.5 py-1.5 rounded transition-colors duration-300 hover:bg-gray-200"
              >
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
                <h1 className="text-3xl font-bold underline">Hello world!</h1>

                <div className="p-5 text-center">Home Page</div>
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
