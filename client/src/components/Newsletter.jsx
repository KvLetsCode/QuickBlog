

const Newsletter = () => {
  return (
      <div className="flex flex-col items-center justify-center text-center my-32 space-y-2">
          <h1 className="md:text-4xl text-2xl font-semibold">Never Miss a Blog</h1>
          <p className="md:text-lg text-gray-500/70 pb-8">Subscribe to get the latest blog, new tech, and exclusive news</p>
          <form className="flex items-center justify-center max-w-2xl w-full h-12 md:h-13">
              <input type="text" placeholder="Enter Your Email Id" required className="border border-gray-300 rounded-md h-full w-full outline-none border-r-0 rounded-r-none px-3 text-gray-500 "/>
              <button type="submit" className="md:px-12 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none ">Subscribe</button>
          </form>
    </div>
  )
}

export default Newsletter