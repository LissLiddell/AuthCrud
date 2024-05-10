const urlLocal ='http://127.0.0.1:8000/api/'
const headers = {
    'Access-Control-Allow-Origin':"*",
    'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
    'Access-Control-Allow-Headers': "Content-Type, Authorization, X-Requested-With",
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept': 'application/json'
 }
export default { urlLocal, headers }