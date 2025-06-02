import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home'; // Create these pages later
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <nav className="p-4 bg-gray-800 text-white">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-blue-300">Home</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-300">About</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-300">Contact</Link>
          </li>
        </ul>
      </nav>

      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </>
  );
}

export default App;