import LibraryLayout from "@/components/layouts/LibraryLayout";
import SuggestedBooks from "@/components/pages/Home/SuggestedBooks";

export default function Home() {
  return (
    <>
      <SuggestedBooks/>
    </>
  )
}

Home.getLayout = (page: any) => {
  return <LibraryLayout>
    {page}
  </LibraryLayout>
}