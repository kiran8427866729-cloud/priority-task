const logoutApi=async()=>{
 const accessToken= localStorage.getItem("accessToken");
 const response=await fetch(`${import.meta.env.VITE_APP_API_URL}/api/auth/logout`,
{   
    method:"POST",
    headers:{
        Authorization:`Bearer ${accessToken}`,
        "Content-Type":"application/json",
    },
});
const data=await response.json()
if(!response.ok){
    throw new Error(data.error?.message  || "logout failed")
}
return data;

}
export default logoutApi
