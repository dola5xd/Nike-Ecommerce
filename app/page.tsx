import BestSeller from "./_components/layout/BestSeller";
import DiscoverMore from "./_components/layout/DiscoverMore";
import Footer from "./_components/layout/Footer";
import Header from "./_components/layout/Header";
import Hero from "./_components/layout/Hero";
import JustDoIt from "./_components/layout/JustDoIt";
import Matriels from "./_components/layout/Matriels";
import Trending from "./_components/layout/Trending";

function Page() {
  return (
    <main id="main">
      <Header />
      <Hero />
      <Matriels />
      <JustDoIt />
      <BestSeller />
      <Trending />
      <DiscoverMore />
      <Footer />
    </main>
  );
}

export default Page;
