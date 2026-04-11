export default async function BlogPost({ params }) {
  const { slug } = await params;
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Post : {slug}</h1>
      <p className="text-gray-600 mt-4">This page was generated from the URL</p>
    </div>
  );
}
