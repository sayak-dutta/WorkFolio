import projectsData from "@/data/projects.json";

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  liveUrl: string;
  techStack: string[];
  moreInfo: string;
}

export async function fetchProjects(): Promise<ProjectData[]> {
  // Simulating an asynchronous fetch from the local JSON file. 
  // You can later swap this out for a real API call (e.g. Notion/Google Sheets)
  return projectsData as ProjectData[];
}
