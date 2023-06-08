import HomePage from './Home/page';
export default async function Home () {
  return <HomePage />;
}

export async function getServerSideProps() {
  const data = JSON.stringify({ time: new Date() });
  return { props: { data } };
}