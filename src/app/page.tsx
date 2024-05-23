import Banner from "@/app/home/components/Banner";
import Introduction from "@/app/home/components/Introduction";
import Books from "@/app/home/components/Books";
import Activities from "@/app/home/components/Activities";
import Contact from "@/app/home/components/Contact";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";

export default async function LandingPage() {
  return (
    <LandingPageLayout>
      <div style={{marginTop: 84}}>
        <Banner/>
        <Introduction/>
        <Books/>
        <Activities/>
        <Contact/>
      </div>
    </LandingPageLayout>
  )
}
