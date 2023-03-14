import { updateCart } from "features/storeSlice";
import { useDispatch, useSelector } from "react-redux";


const Carts = () => {

    const cartitems = [1,2,3]
    return (
      <div>
        <button >
          clear cart{' '}
        </button>
        cart:
        {cartitems?.map((c) => (
          <div>
            {c.title}
            <button
              onClick={() => dispatch(updateCart({ type: 'delete', payload: c }))}
            >
              -
            </button>
          </div>
        ))}
      </div>
    );
  };

  const RenderCartItems = () => {
    const dispatch = useDispatch();
    const cartitems = useSelector((state) => state.store.cartitems);
    console.log(`called from rendercartitems ${cartitems}`)
    if(cartitems.length == 0) {
        return (
            <div>no cart items here</div>
        )
    }
    return (
        <>
            {cartitems.map(item => {
                return (
                    <div className="w-full h-max py-4 px-8 flex justify-between rounded-md bg-purple-200 items-center">
                    <div className="flex space-x-4 items-center w-[50%]">
                        <div className="bg-red-200 p-4 rounded-md">IMG</div>
                        <p>{item.title}</p>
                    </div>
                    <div className="flex justify-between px-8 py-4 bg-white space-x-8 border-1 rounded-md border-gray-400">
                    <button onClick={() => dispatch(updateCart({type: 'increment', payload: item.id}))}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg></button>

                        <p>1</p>
                        <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg></button>

                    </div>
                <div className="">price: 20$</div>
                </div>
                )
            })}
        </>

    )
  }

export default function CartComponent() {
    const dispatch = useDispatch()
    return (
        
        <div className="flex flex-col max-w-6xl h-[80vh] m-8 space-y-8">
            <div className="w-full flex justify-between items-center">
            <h1 className="text-4xl">Your Cart</h1>
            <button className="rounded-md py-2 px-8 bg-purple-200 text-2xl" onClick={() => dispatch(updateCart({ type: 'clear' }))}>clear</button>
            </div>
            <div className="flex flex-col border-gray-200 border-2 rounded-lg h-full p-8 space-y-4">
            <RenderCartItems />
                
            </div>
            <div className="flex justify-end text-2xl">
                <div className="flex flex-col space-y-4">
                    <p>Total: 50$NZD</p>
                    <button className="rounded-md px-1 py-2 bg-purple-200">Checkout</button>
                </div>
            </div>
        
        </div>
    )
}