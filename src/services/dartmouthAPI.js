import axios from 'axios';


const API_URL = 'https://api.dartmouth.edu/api/people/f003m8c'; 
const API_KEY = 'CWOjK3YJgJe1CkQwrYtctDVJrrsELYL18W4hzbWB2Rpeh4tcPyEsUZ9sjltsHlt7nG4VjmAWfEV5Ri7wyxGMycbk1TN6S7SJmTgKUj7R2uJVDvpuqDVcgjIYPZ87Z60SfaU0sW9vPR8NIXCOlqPaupvUNDMbrUlMS7bifcyr3k0MkHwh5lrm4teLycCKfW4MtuOYHsz1ZcLqwkgyvZEm4ZZ936nE5CJ628D3PU28HmMS3HWbInb75jKsSGGpozZ6w0f6OGyKPhdmaRqDvkSxbtEm9bTSUumZXGETUKmVxHC1ABlu5yTmwGg0Kxn58gBIUj7ccJScej0x5U2hyWan4PLj';

export const fetchStudent = () => {
    axios.get(API_URL, { headers: { authorization: localStorage.getItem('token') } }).then((response) => { 
        // response.data.forEach((industry) => {
        //   callback(industry);
        // });
      }).catch((error) => {
        // console.log(error);
        return (error);
      });
      
}