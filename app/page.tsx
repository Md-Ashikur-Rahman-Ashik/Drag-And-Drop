import PageManager from "./components/PageManager";
import Header from "./components/Header";

export default function Home() {
  return (
    <div>
      <Header siteName="My Website Builder" />
      <PageManager />
    </div>
  );
}
