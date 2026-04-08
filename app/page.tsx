import Button from "./components/Button";

export default function Home() {
  const builderName = "My Website Builder";
  const yourName = "Ashikur Rahman";
  const currentYear = 2026;

  return (
    <div>
      <h1>{builderName}</h1>
      <p>Built by {yourName}</p>
      <p>Started in {currentYear}</p>
      <Button />
    </div>
  );
}
