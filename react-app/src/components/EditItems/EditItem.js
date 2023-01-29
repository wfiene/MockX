import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'
import { editItem } from '../../store/items';

const EditItemForm = ({ item, setShowModal }) => {
    const dispatch = useDispatch()
    const history = useHistory();

    const [name, setName] = useState(item.name)
    const [category, setCategory] = useState(item.category)
    const [color, setColor] = useState(item.color)
    const [image, setImage] = useState(item.image)
    const [price, setPrice] = useState(item.price)
    const [validationErrors, setValidationErrors] = useState([])
    const [errors, setErrors] = useState(false)

    const updateName = (e) => setName(e.target.value)
    const updateCategory = (e) => setCategory(e.target.value)
    const updateColor = (e) => setColor(e.target.value)
    const updateImage = (e) => setImage(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)

    useEffect(() => {
        const errors = []
        if (!name || name.length < 18) errors.push('Name must be at least 18 Characters')
        else if (name.length > 34) errors.push('Name can\'t be more than 34 characters')
        if (!category) errors.push('Must specify a category')
        if (!color) errors.push('Must specify a color')
        else if (color.length > 20) errors.push('Color can not be longer than 20 characters')
        if (!image) errors.push('Must provide an image')
        if (!price || price < 5) errors.push('Must provide a price more than $5')
        setValidationErrors(errors)
    }, [name, category, color, image, price])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors(true)
        if (!validationErrors.length) {
            const payload = {
                ...item,
                id: item.id,
                name,
                category,
                color,
                image,
                price
            }

            let updatedItem = await dispatch(editItem(payload))
            history.push('/')
            if (updatedItem) {
                setErrors(false)
                setShowModal(false)
            }
        }

    }

    return (
        <div className='edititem-form'>
            <div className='edititem-outer'>
                <form onSubmit={handleSubmit}>
                    <h2 id='welcome-edit'>Edit a listed item</h2>
                    <div className='edititem-content-area'>
                        <input
                            type='text'
                            placeholder='name'
                            value={name}
                            onChange={updateName}
                        />

                        <input
                            type='text'
                            placeholder='category'
                            value={category}
                            onChange={updateCategory}
                        />

                        <input
                            type='text'
                            placeholder='color'
                            value={color}
                            onChange={updateColor}
                        />

                        <input
                            type='text'
                            placeholder='image-url'
                            value={image}
                            onChange={updateImage}
                        />

                        <input
                            type='text'
                            placeholder='price'
                            value={price}
                            onChange={updatePrice}
                            min='5'
                            max='50000'
                        />
                        <button type='submit'>Edit</button>
                        <div className='edit-item-errors'>
                            <ul>
                                {errors && validationErrors.length > 0 && validationErrors.map(error => (
                                    <li className='error-messages' key={error}>{error}</li>))}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default EditItemForm