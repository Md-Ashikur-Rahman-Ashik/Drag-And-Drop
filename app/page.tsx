import PageList from "./components/PageList";
import Header from "./components/Header";

export default function Home() {
  return (
    <div>
      <Header siteName="My Website Builder" />
      <PageList />
    </div>
  );
}
