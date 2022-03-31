import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const { search } = router.query;

  return (
    <main>
        <p>{search}</p>
    </main>
  )
}

export default Search