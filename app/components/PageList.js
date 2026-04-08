const pages = ["Home", "About", "Contact", "Portfolio"];

export default function PageList() {
  return (
    <ul>
      {pages.map((page) => (
        <li key={page}> {page}</li>
      ))}
    </ul>
  );
}
