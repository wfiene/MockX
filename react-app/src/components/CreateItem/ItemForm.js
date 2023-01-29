import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import { createItem } from '../../store/items'

const CreateItemForm = ({setShowModal}) => {
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [color, setColor] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
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
        else if (name.split(" ").length < 3) errors.push('Thats a silly name')
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
                name,
                category,
                color,
                image,
                price,
            }

            let createdItem = await dispatch(createItem(payload))
            if (createdItem) {
                // history.push(`/items/${createItem.id}`)
                setErrors(false)
                setShowModal(false)
            }
        }

    }

    return (
        <div className='edititem-form'>
            <div className='edititem-outer'>
                <form onSubmit={handleSubmit}>
                    <h2 id='welcome-edit'>Add an Item</h2>
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
                            type='number'
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

export default CreateItemForm