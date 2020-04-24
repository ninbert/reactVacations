import axios from 'axios';

// this function is updating some of the default settings of axios. in this case is for the headers object and its authorization property.
// the issue is that in some cases the token is not parsed in node.
const setAuthToken = token => {
if (token) {
    axios.defaults.headers.common['Authorization'] = token;
} else{
     delete axios.defaults.headers.common['Authorization'] 
}
}
export default setAuthToken;