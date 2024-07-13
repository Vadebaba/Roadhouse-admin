import { useState } from 'react'
import upload_area from '../assets/upload_area.svg'
import { MdAdd } from "react-icons/md"
//import { Form } from 'react-router-dom';

const AddProduct = () => {

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: '',

  })

  const imageHandler = (e) => {
    setImage(e.target.files[0])
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }

  /*const Add_Product = async () => {
    console.log(productDetails);
    let responseData;
    let product = { ...productDetails }; // Create a copy of productDetails

    let formData = new FormData();
    formData.append('product', image);
*/

    const Add_Product = async () => {

      console.log(productDetails);
    //  let responseData;
      let product = { ...productDetails }; // Create a copy of productDetails
  
      let formData = new FormData();
      formData.append('product', image)

      try {
        // Upload the image
        const uploadResponse = await fetch('https://roadhouse-backend.onrender.com/upload', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          body: formData,
        });
    
        const responseData = await uploadResponse.json();
    
        if (!responseData.success) {
          alert('Image upload failed');
          return;
        }
    
        // Add the image URL to the product details
        product.image = responseData.image_url;
        console.log(product);
    
        // Add the product
        const addProductResponse = await fetch('https://roadhouse-backend.onrender.com/addproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });
    
        if (!addProductResponse.ok) {
          const errorData = await addProductResponse.json();
          console.error('Error adding product:', errorData.message);
          alert(`Upload Failed: ${errorData.message}`);
          return;
        }
    
        const addProductData = await addProductResponse.json();
    
        if (addProductData.success) {
          alert('Product Added');
        } else {
          alert(`Upload Failed: ${addProductData.message}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    };
    

    /* Upload the image
    await fetch('https://roadhouse-backend.onrender.com/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) =>{responseData = data})
  
  
    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
  
      await fetch('https://roadhouse-backend.onrender.com/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        data.success ? alert("Product Added") : alert('Upload Failed')
      })
    }*/
  




  return (
    <div className='p-8 box-border bg-white w-full rounded-sm mt-4 lg:m-7'>

      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Product title:</h4>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here...'
          className='bg-primary outline-none max-w-80 w-full py-3 px-4
        rounded-md'/>
      </div>

      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Price:</h4>
        <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here...'
          className='bg-primary outline-none max-w-80 w-full py-3 px-4
        rounded-md'/>
      </div>

      <div className='mb-3'>
        <h4 className='bold-18 pb-2'>Offer Price: </h4>
        <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here...'
          className='bg-primary outline-none max-w-80 w-full py-3 px-4
        rounded-md'/>
      </div>

      <div className='mb-3 flex items-center gap-x-4' >
        <h4 className='bold-18 pb-2'>Product Category:</h4>
        <select value={productDetails.category} onChange={changeHandler} name='category' id="" className='bg-primary ring-1 ring-slate-900/20
        medium-16 rounded-sm outline-none'>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kid</option>
        </select>
      </div>

      <div>
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='cursor-pointer  w-20 rounded-sm inline-block' />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden className='bg-primary
        max-w-80 w-full py-3 px-4' />
      </div>
      <button  onClick={Add_Product} className='btn_dark_rounded mt-4 flexCenter gap-x-3'><MdAdd />Add Product</button>

    </div>
  )
}

export default AddProduct;