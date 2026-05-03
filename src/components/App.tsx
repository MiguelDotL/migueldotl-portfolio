import NavBar from "./NavBar";
import Hero from "./Hero";
import Skills from "./Skills";
import Projects from "./Projects";
import ContactMe from "./ContactMe";
import Footer from "./Footer";

function App() {
    return (
        <div className="App">
            <NavBar />
            <main>
                <Hero />
                <Skills />
                <Projects />
                <ContactMe />
            </main>
            <Footer />
        </div>
    );
}

export default App;
