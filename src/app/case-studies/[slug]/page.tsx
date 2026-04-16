import caseStudies from "@/data/case-studies.json";
import CaseStudyClient from "./CaseStudyClient";

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <CaseStudyClient slug={resolvedParams.slug} />;
}
