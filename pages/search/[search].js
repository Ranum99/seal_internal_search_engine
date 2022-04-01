import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react"

const Search = () => {
  const router = useRouter();
  const { search } = router.query;

  useEffect(() => {
    getSearchResults()
  }, [search])

  const getSearchResults = async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `http://localhost:9200/pokemon/_search`,
        data: {
          query: {
            match_phrase_prefix: {
                Name: search
            }
          }
        },
        source_content_type: 'application/json'
      })

      console.log(response, "meem");
    } catch (error) {
      console.log(error)
      console.warn("Can't retrieve data")
    }
  }

  return (
    <main>
        <p>{search}</p>
    </main>
  )
}

export default Search