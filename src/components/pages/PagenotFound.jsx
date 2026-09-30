
import {Link} from 'react-router-dom'
const PagenotFound = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center">
        <div className="h-100 w-100  flex items-center justify-center ">
            <img src="https://img.freepik.com/premium-vector/page-found-concept-illustration_114360-1869.jpg"  alt="photo" className="h-full w-full object-cover " />
        </div>
        <div>
            <h1 className="font-black mb-3 text-3xl">OPPS! PAGE NOT FOUND</h1>
           <p className="text-center">You can search for the page you want here </p>
           <p className="text-center">or return to the homepage</p>
        </div>
        <div>
            <button className="bg-black w-40 mt-2 text-white p-1 rounded-sm">
                <Link to="/dashboard">
                Home page
                </Link>
                </button>
        </div>
    </div>
  )
}

export default PagenotFound