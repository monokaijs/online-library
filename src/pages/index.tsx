import LibraryLayout from "@/components/layouts/LibraryLayout";
import SuggestedBooks from "@/components/pages/Home/SuggestedBooks";
import SectionTitle from "@/components/shared/SectionTitle";
import TopBooks from "@/components/pages/Home/TopBooks";

export default function Home() {
  return (
    <>
      <SuggestedBooks/>
      <TopBooks/>
    </>
  )
}

Home.getLayout = (page: any) => {
  return <LibraryLayout>
    {page}
  </LibraryLayout>
}