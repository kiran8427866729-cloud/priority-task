import React from 'react'
import Sidebar from "../Layout/Sidebar";
import Header from "../Layout/Header"
const Admin = () => {
  return (
    <div>
       <div className="flex">
   <Sidebar/>
   <div className="flex-1 mr-6">
<Header/>
    <h1 className="text-2xl"> Welcome to admin page</h1>
    </div>
    </div>
    </div>
  )
}

export default Admin