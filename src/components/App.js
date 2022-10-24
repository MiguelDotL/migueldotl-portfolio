// import "../assets/styles/App.css";
import NavBar from "./NavBar";
import Hero from "./Hero";
import Skills from "./Skills";
import Projects from "./Projects";
import ContactMe from "./ContactMe";
import PreFooter from "./PreFooter";
import Footer from "./Footer";

function App() {
    return (
        <div className="App">
            <NavBar />
            <Hero />
            <Skills />
            <Projects />
            <ContactMe />
            <Footer />
        </div>
    );
}

export default App;
