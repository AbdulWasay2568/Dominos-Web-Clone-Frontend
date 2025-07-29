import ProfileSection from '../components/ProfileSection';
import LeftBar from '../components/LeftBar';
import NavBar from '../components/NavBar';
import ProjectsList from '../components/ProjectsList';
import SkillsList from '../components/SkillsList';

export default function Home() {
  return (
    <div className="bg-[#0f0f0f] text-white font-sans flex flex-col min-h-screen w-full scroll-smooth">
      <NavBar />

      <div className="flex flex-col lg:flex-row gap-6 px-4 py-6 mt-16">
        <LeftBar />

        <div className="w-full lg:w-3/4 flex flex-col gap-10">
          <section id="about">
            <ProfileSection />
          </section>
          <section id="projects">
            <ProjectsList />
          </section>
          <section id="skills">
            <SkillsList />
          </section>
          <section id="contact" className="py-10">
            {/* Add your ContactMe component or dummy section */}
            <div className="text-center text-lg">Contact Me Section</div>
          </section>
        </div>
      </div>
    </div>
  );
}
