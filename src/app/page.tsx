import { fetchProjects } from "@/lib/data";
import { ProjectShowcase } from "@/components/ProjectShowcase";

export default async function Home() {
  const projects = await fetchProjects();

  return (
    <main className="w-screen h-screen overflow-hidden bg-black selection:bg-zinc-800">
      <ProjectShowcase projects={projects} />
    </main>
  );
}
