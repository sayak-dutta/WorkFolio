import { fetchProjects } from "@/lib/data";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { MobileShowcase } from "@/components/MobileShowcase";

export default async function Home() {
  const projects = await fetchProjects();

  return (
    <main className="w-screen h-[100dvh] overflow-hidden bg-black selection:bg-zinc-800">
      {/* Desktop presentation view */}
      <div className="hidden md:block w-full h-full">
        <ProjectShowcase projects={projects} />
      </div>
      
      {/* Scrollable mobile card view */}
      <div className="block md:hidden w-full h-full overflow-y-auto no-scrollbar scroll-smooth">
        <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
        <MobileShowcase projects={projects} />
      </div>
    </main>
  );
}
