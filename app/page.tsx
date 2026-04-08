import Button from "./components/Button";
import Header from "./components/Header";
import Card from "./components/Card";

export default function Home() {
  return (
    <div>
      <Header siteName="My Website Builder" />
      <Card title="Drag And Drop" description="Build pages visually" />
      <Card title="Templates" description="Start from a template" />
      <Button label="Get Started" />
    </div>
  );
}
