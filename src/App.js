import React, { useEffect, useState } from "react";
import "./App.css";
import Homepage from "./components/Hompage";
import Apollo from "./components/Apollo";
import Visualizer from "./components/Visualizer";

function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const goToApolloSection = () => setCurrentSection(1);
  useEffect(() => {
    const sections = [Homepage, Apollo, Visualizer].map((Component, index) => (
      <div key={index} id={`section-${index}`} className="full-page-section">
        <Component />
      </div>
    ));

    const handleScroll = (e) => {
      e.preventDefault();
      const newSection = currentSection + (e.deltaY > 0 ? 1 : -1);
      if (newSection >= 0 && newSection < sections.length) {
        setCurrentSection(newSection);
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentSection]);

  useEffect(() => {
    const targetSection = document.getElementById(`section-${currentSection}`);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });
    }
  }, [currentSection]);

  const sections = [Homepage, Apollo, Visualizer].map((Component, index) => (
    <div key={index} id={`section-${index}`} className="full-page-section">
      <Component
        goToApolloSection={index === 0 ? goToApolloSection : undefined}
      />
    </div>
  ));

  return <>{sections}</>;
}

export default App;
