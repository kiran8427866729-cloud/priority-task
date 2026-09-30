
 const registerUser=async(userData)=>{
 const response = await fetch( `${import.meta.env.VITE_APP_API_URL}/api/auth/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  Authorization:`Bearer ${token}`
  },
  body: JSON.stringify(userData),
});
   const data=await response.json();
   console.log("server response",data)
   if(!response.ok){
    throw new Error(data.message || "registeration failed")
   }
   
   return data;
 } 
export default registerUser