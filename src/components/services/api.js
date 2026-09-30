import refreshAccessToken from "../services/refreshToken"
const api=async(url,options={})=>{
    // get current access token
    let accessToken=localStorage.getItem("accessToken")
    // firstApi request
    let response=await fetch(url,{
        ...options,
        headers:{
            ...options.headers,
            Authorization:`Bearer ${accessToken}`,
            "Content-Type":"application/json",

        }
    })
    // Access token expired
    if(response.success ===401){
        console.log("Access token expired. refreshing")
        // get new access token
        accessToken= await refreshAccessToken();

    
    // try to access the original API again
    response=await fetch(url,{
        ...options,
        headers:{
            ...options.headers,
            Authorization:`Bearer ${accessToken}`,
            "Content-Type":"application/json",
        }}
        
    )} 
    return response
}
export default api