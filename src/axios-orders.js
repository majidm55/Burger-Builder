import axios from 'axios';

 const instance = axios.create({
  baseURL: 'https://build-a-burger-99240.firebaseio.com/'
 });

 export default instance;