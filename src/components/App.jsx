
import { Component } from "react";
import { Form } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as GetInfo from './GetInfo/GetInfo'
import { ImageGallery,ImageGalleryItem } from './ImageGallery/ImageGallery.styled'
import { But } from "./Button/Button.styles";
import { Audio } from 'react-loader-spinner'
import { Loading } from './Loader/Loader.styles'

// import * as basicLightbox from 'basiclightbox';


 



export class App extends Component {

  state = {
    images: [],
    page: 1,
    data: '',
    buttonVisible: false,
    loading: false,
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
  componentDidUpdate(_, prevState) {
    if (
      prevState.data !== this.state.data ||
      this.state.page !== prevState.page
    ) {
      this.getImages();
    }
   
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
            <ImageGalleryItem key={id}>
            
                <img src={webformatURL} alt={tags} />
             
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