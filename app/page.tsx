import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import PracticeDemo from "@/components/PracticeDemo";
import ForEmployers from "@/components/ForEmployers";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <HowItWorks />
        <PracticeDemo />
        <ForEmployers />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
