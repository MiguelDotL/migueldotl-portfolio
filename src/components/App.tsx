import { lazy, Suspense } from "react";
import NavBar from "./NavBar";
import Hero from "./Hero";
import Footer from "./Footer";

// Below-the-fold sections are code-split so the initial bundle only carries
// NavBar + Hero. Each lazy chunk pulls in its own assets (devicon font in
// Skills, project images in Projects, ContactForm in ContactMe). Suspense
// fallback is a reserved-height div so the page layout doesn't shift as
// chunks resolve.
const Skills = lazy(() => import("./Skills"));
const Projects = lazy(() => import("./Projects"));
const ContactMe = lazy(() => import("./ContactMe"));

const SectionFallback = ({ minHeight }: { minHeight: number }) => (
    <div aria-hidden="true" style={{ minHeight }} />
);

function App() {
    return (
        <div className="App">
            <NavBar />
            <main>
                <Hero />
                <Suspense fallback={<SectionFallback minHeight={500} />}>
                    <Skills />
                </Suspense>
                <Suspense fallback={<SectionFallback minHeight={800} />}>
                    <Projects />
                </Suspense>
                <Suspense fallback={<SectionFallback minHeight={500} />}>
                    <ContactMe />
                </Suspense>
            </main>
            <Footer />
        </div>
    );
}

export default App;
