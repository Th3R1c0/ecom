
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import Carousel from "react-multi-carousel";


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
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  const data = [1,2,3,4]

  return (
    <>
    <div className="w-full h-max p-4 text-4xl  tracking-wide">
      <h1>Similar Products:</h1>
    </div>
  <Carousel
  
    swipeable={false}
    draggable={false}
    showDots={true}
    responsive={responsive}
    ssr={true} // means to render carousel on server-side.
    infinite={true}
    autoPlaySpeed={1000}
    keyBoardControl={true}
    customTransition="transform 300ms ease-in-out"
    transitionDuration={500}
    containerClass="carousel-container"
    
    dotListClass="custom-dot-list-style"
    itemClass="carousel-item-padding-40-px"
  >
         {
          data.map((category) => (
            <div
            className='w-full rounded-sm p-2'
            >
                          <div className=" bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600 rounded-lg h-[400px]">
              
              {/*<Image src={product.images[0]} className='w-full h-full' width='50' height='50' />*/}
          </div>
              <div className='p-8 flex justify-between'><p className='text-4xl'>{category}</p><button className='p-4 rounded-md bg-purple-100 font-bold'>Shop Now</button></div>
            </div>
          ))}
  </Carousel>
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