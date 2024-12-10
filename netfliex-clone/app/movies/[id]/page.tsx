import UI from "./ui";

interface MovieDetailProps {
  params: Promise<{ id: string }>;
}

export default async function MovieDetail({ params }: MovieDetailProps) {
  const { id } = await params;

  return (
    <main className="py-16 flex items-center bg-blue-50 w-full absolute top-0 bottom-0 left-0 right-0">
      <UI id={id} />
    </main>
  );
}
