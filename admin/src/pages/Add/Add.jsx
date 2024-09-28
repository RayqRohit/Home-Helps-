import React, { useEffect } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';


const Add = ({url}) => {


    const [image, setImage] = React.useState(false)
    const [data, setData] = React.useState({
        name: '',
        description: '',
        category: 'Women Spa',
        price: ''
    })


    const onChangeHandler = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setData(data => ({ ...data, [name]: value }))

    }


    const onSubmitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('price', Number(data.price));
        formData.append('image', image);

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);

            if (response.data.success) {
                // Reset the form state and image state
                setData({
                    name: '',
                    description: '',
                    category: 'Women Spa',
                    price: ''
                });

                setImage(false);

                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    };


    // useEffect(() => {

    //     console.log(data);


    // }, [data])


    return (
        <div className='add'>


            <form className='flex-col' onSubmit={onSubmitHandler}>

                <div className="add-img-upload flex-col">

                    <p>Upload Image</p>

                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                    </label>

                </div>


                <div className="add-product-name flex-col">

                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type Here.' />



                </div>


                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows={6} placeholder='Write Content Here.' required>


                    </textarea>


                </div>


                <div className="add-category-price">
                    <div className='add-category flex-col'>

                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" >
                            <option value="Women Spa">Women Spa</option>
                            <option value="Cleaning">Cleaning</option>
                            <option value="AC Repair">AC Repair</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Massage">Massage</option>
                            <option value="Men Saloon">Men Saloon</option>
                            <option value="Home Painting">Home Painting</option>
                            <option value="Electrician">Electrician</option>
                        </select>

                    </div>


                    <div className="flex-col add-price">
                        <p>Proudct Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
                    </div>



                </div>

                <button type='submit' className='add-btn'>Add Product</button>

            </form>

        </div>
    )
}

export default Add