import axios from 'axios';
import { Component } from "react";
import { Form } from './Searchbar/Searchbar';


 const API_KEY = '39240631-8a58999efa7d66452fb176341';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  per_page: 12,
};

export const getImages = async (query, page) => {
  try {
    const { data } = await axios.get(`search?query=${query}&page=${page}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export class App extends Component {

  state = {
    images: [],
     page : 1,
  }
  


  
  render() {
   console.log(Form.state.data)
  return (
   
    <>
      <Form/>
    </>)

}
}