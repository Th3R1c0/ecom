

export const Header = () => {
    return (
        <header className="w-full font-serif text-3xl justify-between bg-purple-100 sm:flex sm:p-8">
        <h1>buy stuff</h1>
        <div className="flex space-x-2
        ">
          <div>Sign in</div>
          <div>Wishlist</div>
          <div>Cart</div>
        </div>
      </header>
    )
}