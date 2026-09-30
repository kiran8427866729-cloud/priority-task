const passwordRegex= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const validateRegister=(data)=>{
if(!data.firstName) return "please enter your firstName"
if(!data.lastName) return "please enter your lastName"
if(!data.password) return"please enter your password";
if(!data.userName) return"please enter your username";
if(!data.email) return"please enter your email"
if (!passwordRegex.test(data.password)){
    return "please enter atleast 8 character with alphabat,number and special symbol"
}
if(!emailRegex.test(data.email)){
return "enter valid email"
}
if(data.password !==data.confirmpassword) {
    return "password is not matched";
}
return "";
}


export const loginValidate=(data)=>{
if(!data.email) return "enter your email";
if(!data.password) return "enter your password"
if(!passwordRegex.test(data.password))
    return "enter valid password"
if(!emailRegex.test(data.email))
    return "enter valid email"
}