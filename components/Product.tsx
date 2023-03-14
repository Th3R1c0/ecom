
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";


const useFetch = (url: string) => {
  const [res, setRes] = useState<any>(null)
  const [error, setError] = useState< boolean | string>(false);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        setRes(await response?.json())
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    })();
  }, [url])

  return [ res, error, loading]
}

const SingleProduct = () => {
  const router = useRouter()
    const {id} = router.query
    console.log(id)
    const [res, error, loading] = useFetch(`https://dummyjson.com/products/${id}`)
    if (loading) {
      return (
        <>
        <div className="flex flex-col space-x-4 md:flex-row p-8 animate-pulse">
  <div className="flex w-full flex-col h-full ">
    <div className=" h-[300px] w-full rounded-md bg-gray-200 shadow-md"></div>
    <div className=" h-[300px] w-full rounded-md bg-gray-200 shadow-md"></div>
  </div>
  <div className=" w-full bg-blue-200 text-6xl font-serif flex flex-col justify-end space-y-8 p-4">
    <div className="flex-1 bg-gray-200 rounded-md"></div>
    <div className="h-[100px] bg-gray-200 rounded-md"></div>
    <button className="w-full h-max p-2 rounded-md bg-purple-100 text-3xl"> Add To Cart </button>
  </div>
</div>


        </>
      )
    }
    return (
        <>
        <div className="flex flex-col space-x-4 md:flex-row p-8">
  <div className="flex w-full flex-col h-full space-y-8 md:space-y-0 ">
    <div className=" h-[300px] w-full md:hidden rounded-md bg-purple-200 shadow-lg"></div>
    <div className=" md:h-[600px] h-[300px] w-full rounded-md bg-purple-200 shadow-lg"></div>
  </div>
  <div className=" w-full text-3xl font-serif flex flex-col space-y-8 p-4">
    <h1 className="text-6xl">{res?.title}</h1>
    <div className="w-full  border-black border-b-2 text-3xl p-4
    ">
      <p>{res?.description}</p>
    </div>
    <p>${res?.price}NZD</p>
    <p>stock: {res?.stock} stock avalible</p>
    <button className="w-full h-max p-2 rounded-md bg-purple-100 text-3xl"> Add To Cart </button>
  </div>
</div>


        </>
    )
}

const MoreProducts = () => {
  return (
    <>
    <div className="flex flex-col w-full h-max  p-8 text-4xl space-y-4">
    <span>Other Products</span>
    <div className="border-2 border-black w-full h-[300px]">
      More products
    </div>
</div>
    </>
  )
}


const SingleProductPage = () => {
  return (
    <>
      <SingleProduct />
      <MoreProducts />
    </>
  )
}
export default SingleProductPage;