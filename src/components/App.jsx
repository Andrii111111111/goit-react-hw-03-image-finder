
import { Component } from "react";
import { Form } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as GetInfo from './GetInfo/GetInfo'
import { ImageGallery,ImageGalleryItem } from './ImageGallery/ImageGallery.styled'
import { But } from "./Button/Button.styles";
import { Audio } from 'react-loader-spinner'
import { Loading } from './Loader/Loader.styles'
import ModalImage from "react-modal-image";





export class App extends Component {

  state = {
    images: [],
    page: 1,
    data: '',
    buttonVisible: false,
    loading: false,
  }
  
  componentDidUpdate(_, prevState) {
    if (
      prevState.data !== this.state.data ||
      this.state.page !== prevState.page
    ) {
      this.getImages();
    }
   
  }


  getImages = async () => {
     try {
      this.setState({ loading:true })
      const images = await GetInfo.getImages(
        this.state.data,
        this.state.page
      );
       
      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        buttonVisible: this.state.page < Math.ceil(images.totalHits / 12), 
      }));
    if ((this.state.page === 1) & (images.totalHits === 0)) {
      toast.error(
        `Sorry, there are no images matching your search ${this.state.data}. Please try again.`
      );
    }
    } catch (error) {
      console.log('Error');
    }
    finally { this.setState({ loading: false })}
  };

  getData = data => {
    this.setState.page = 1
    this.setState(prevState => ({
    images: [...prevState.images = []] }));
    this.setState({ data })
  }
 
  buttonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
};
  
  render() {
    
  return (
   
    <>
      <Form onSubmit={this.getData} />
      <ToastContainer />
         {this.state.loading && <Loading><Audio
    height = "80"
    width = "80"
    radius = "9"
    color = 'green'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
  /></Loading> }
      <ImageGallery>
        {this.state.images.map(({ id,webformatURL, largeImageURL,tags }) => {
          return (
            <ImageGalleryItem key={id} >
              {/* <img src={webformatURL} alt={tags} /> */}
              {<ModalImage small={webformatURL} large={largeImageURL} alt={tags}/>}
              </ImageGalleryItem>
            );
          })}
      </ImageGallery>
      {this.state.buttonVisible && (
          <But type="button" onClick={this.buttonClick}>
            Load more
        </But>
      )}
    </>)
}
}