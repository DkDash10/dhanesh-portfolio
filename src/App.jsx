import Navbar from "./components/Navbar/Navbar";
import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Projects from "./sections/Projects/Projects";
import MotionLab from "./sections/MotionLab/MotionLab";
import Toolkit from "./sections/Toolkit/Toolkit";
import Contact from "./sections/Contact/Contact";
import CustomCursor from "./components/CustomCursor/CustomCursor";

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
