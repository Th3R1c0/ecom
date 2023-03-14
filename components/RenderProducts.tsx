


import { useDispatch } from "react-redux";
import Image from 'next/image'
import Link from "next/link";
import { updateCart } from "features/storeSlice";

export const RenderProducts = ({ data }) => {
    const dispatch = useDispatch();
    return (
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 p-8">
        {data?.products?.map((product) => (
          <div className="border-2 border-white hover:border-gray-200 p-8 flex flex-col" key={product.id}>
            <Link href={`/product/${product.id}`}>
            <div className="w-full bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-gray-200 via-gray-400 to-gray-600 rounded-lg h-[300px]">
                
                {/*<Image src={product.images[0]} className='w-full h-full' width='50' height='50' />*/}
            </div></Link>
            <div className=''>
            <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">${product.price} NZD</p>
            <button
            className="w-full h-max p-2 rounded-md bg-purple-100"
              onClick={() => {
                dispatch(updateCart({ type: 'add', payload:  product}));
                
              }
              }
            >
              {' '}
              Add to Cart{' '}
            </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  