import Counter from "./components/Counter";
import Header from "./components/Header";

export default function Home() {
  return (
    <div>
      <Header siteName="My Website Builder" />
      <Counter />
    </div>
  );
}
