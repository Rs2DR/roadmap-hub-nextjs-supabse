export default async function MyRoadmapPage({
  params,
}: PageProps<'/dashboard/my-roadmaps/[id]'>) {
  const { id } = await params;

  return <div>{id}</div>;
}
