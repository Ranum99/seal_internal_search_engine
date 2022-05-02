import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react"
import Image from 'next/image';
//import logo from "../../sealenglogopng.png"
import logo from "../../seal_fin.png"
import { useState } from "react"



const Search = () => {
  const router = useRouter();
  const { search } = router.query;
  const [searchInput, setSearchInput] = useState("")
  const [error, setError] = useState("")
  const [searchResults, setSearchResults] = useState({});
  const [page, setPage] = useState(0)

  useEffect(() => {
    setSearchInput(search)
    getSearchResults()
  }, [search])

  useEffect(() => {
    getSearchResults()
  }, [page])

  const getSearchResults = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `../api/search/${searchInput}`,
        data: {
                page: page
        }
      })

        console.log(response.data)

      if(response.data.success)
        setSearchResults(response.data.data.hits)
    } catch (error) {
      console.log(error)
      console.warn("Can't retrieve data")
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if(searchInput) {
      router.replace(`./${searchInput}`)
      setError()
      setPage(0)
    } else
      setError("Må fylle inn felt for å søke")
  }

  const handleChange = (evt) => {
    setSearchInput(evt.currentTarget.value)
  }

  const pageDown = (evt) => {
    if(page > 0)
      setPage(page - 1)
  }

  const pageUp = (evt) => {
    setPage(page + 1)
  }

  const openFile = (evt) => {
    //console.log(evt.currentTarget.innerHTML)
    window.open(evt.currentTarget.innerHTML)
  }

  return (
    <>
      <nav>
        <Image src={logo} alt="Logo for Seal Engineering AS" />
        <form onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          <input onChange={handleChange} placeholder="Skriv inn søk her..." type="text" value={searchInput}/>
          <input type="submit" value="Søk"/>
        </form>
      </nav>
      <main>
        <p>{`Antall resultater: ${searchResults?.total?.value}`}</p>
        <div>
                {page != 0 && <p onClick={pageDown}>Forrige side</p>}
                <p onClick={pageUp}>Neste side</p>
        </div>
        {searchResults?.hits?.map(result =>
          <div key={result._id}>
            <p><strong>Filename: </strong>{result._source.log.file.path.split("/").at(-1)}</p>
            <p>{result._source.message}</p>
            <p onClick={openFile}>{result._source.log.file.path}</p>
          </div>
        )}
        <div>
                {page != 0 && <p onClick={pageDown}>Forrige side</p>}
                <p onClick={pageUp}>Neste side</p>
        </div>
      </main>
    </>
  )
}

export default Search