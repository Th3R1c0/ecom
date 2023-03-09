
import { useSelector, useDispatch } from 'react-redux';
import {
    updateCart,
    updateFilter,
    fetchProducts,
    fetchCategories,
  } from '../features/storeSlice';
  import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const Categoriess = () => {
    const { data, error, loading } = useSelector(
      (state) => state.store.categorystate
    );
    const filter = useSelector((state) => state.store.filter);
  
    const dispatch = useDispatch();
    if (data) {
      return (
        <div className='flex flex-wrap flex-col sm:flex-row bg-red-200 p-4'>
          {data.length > 0 &&
            data.map((category) => (
              <div
              className='w-full h-max sm:w-1/3 border-2 border-black rounded-sm p-2'
                onClick={() =>
                  dispatch(updateFilter({ type: 'add', payload: category }))
                }
              >
                {category}
              </div>
            ))}
        </div>
      );
    }
  };

  export const Categories = () => {
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
    const { data, error, loading } = useSelector(
      (state) => state.store.categorystate
    );
    const filter = useSelector((state) => state.store.filter);
  
    const dispatch = useDispatch();
    
    if (data) {
      console.log(data)
    return (
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
           {data.length > 0 &&
            data.map((category) => (
              <div
              className='w-full rounded-sm p-2'
                onClick={() =>
                  dispatch(updateFilter({ type: 'add', payload: category }))
                }
              >
                            <div className=" bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600 rounded-lg h-[400px]">
                
                {/*<Image src={product.images[0]} className='w-full h-full' width='50' height='50' />*/}
            </div>
                <div className='p-8 flex justify-between'><p className='text-4xl'>{category}</p><button className='p-4 rounded-md bg-purple-100 font-bold'>Shop Now</button></div>
              </div>
            ))}
    </Carousel>
    ) 
              }
  }