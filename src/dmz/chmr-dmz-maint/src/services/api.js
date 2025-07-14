import axios from "axios";

 
   const api = axios.create({
     baseURL: "/report",
     timeout: 10_000,
   });
   
   export default api;
   