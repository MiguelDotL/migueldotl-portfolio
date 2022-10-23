// import "../assets/styles/App.css";
import NavBar from "./NavBar";
import Hero from "./Hero";
import Skills from "./Skills";
import Projects from "./Projects";
import ContactMe from "./ContactMe";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Hero />
            <Skills />
            <Projects />
            <ContactMe />
        </div>
    );
}

export default App;
