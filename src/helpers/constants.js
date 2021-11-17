import axios  from "axios";



// export const BASE_URL =
//   "http://ec2-3-134-82-132.us-east-2.compute.amazonaws.com:5000/api/";
export const BASE_URL = "http://192.168.114.36:5000/api/";
export const apiRequest=async({method,url,body,Authorization})=>{
  const config = {
      method: method,
      url: url,
      headers: { 'Authorization': Authorization||"", 'Content-Type':'application/json' },
      data: body||null,
      // timeout: 1000,
  }
const response=  await axios(config)
return response
 
}