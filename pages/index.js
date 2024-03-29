import { useState } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
//import logo from "../sealenglogopng.png"
import logo from "../seal_fin.png"


const Home = () => {
  const [search, setSearch] = useState("")
  const [error, setError] = useState("")
  const router = useRouter();

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if(search)
      router.push(`./search/${search}`)
    else
      setError("Må fylle inn felt for å søke")
  }

  const handleChange = (evt) => {
    setSearch(evt.currentTarget.value)
  }

  return (
    <main id="main">
      <section>
        <Image src={logo} id="logo" alt="Logo for Seal Engineering AS" />
        <form onSubmit={handleSubmit}>
          {error && <p>{error}</p>}
          <input onChange={handleChange} placeholder="Skriv inn søk her..." type="text" value={search}/>
          <input type="submit" value="Søk"/>
        </form>
      </section>
    </main>
  )
}

export default Home
