import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import MotionLab from "./sections/MotionLab";
import Toolkit from "./sections/Toolkit";
import Contact from "./sections/Contact";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <>
      <div id="top" className="min-h-screen bg-bg text-text">
        <CustomCursor />
        <Navbar />

        <main>
          <Hero />
          <About />
          <Projects />
          <MotionLab />
          <Toolkit />
          <Contact />
        </main>

      </div>
    </>
  );
}

export default App;
