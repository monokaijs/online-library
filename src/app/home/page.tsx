import Banner from "@/app/home/components/Banner";
import Introduction from "@/app/home/components/Introduction";
import Books from "@/app/home/components/Books";
import Activities from "@/app/home/components/Activities";
import Contact from "@/app/home/components/Contact";

export default async function LandingPage() {
  return <div>
    <Banner/>
    <Introduction/>
    <Books/>
    <Activities/>
    <Contact/>
  </div>
}
