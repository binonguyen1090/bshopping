import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";

import Home from "./components/Home";
import './App.css'


function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <Home />
      </div>
      <Footer />
    </div>
  );
}

export default App;