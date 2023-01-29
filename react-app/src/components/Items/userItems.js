import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from 'react-router-dom'
import { getItemsByUserId, editItem, deleteItem } from "../../store/items"
import EditItemModal from "../EditItems/EditItemModal"

const CurrentUserItems = () => {
  const userItemsObj = useSelector(state => state.items.allItems)
  const items = Object.values(userItemsObj)
  console.log('----------user items-----------', userItemsObj)
  // const user = useSelector(state => state.session.user)
  // const items = user.items
  const { userId } = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getItemsByUserId(userId)).then(() => setIsLoaded(true))
  }, [dispatch])

  if (!items?.length) {
    return (<h5 className="nothing-here">Nothing here... try listing an item!</h5>)
  } else {
    return isLoaded && (items?.map(item => (
      <div id="outer-most-my-items">
        <div className="frame-mySpots">
          <div key={item?.id}>
            {/* <NavLink to={`/items/${item.id}`}> */}
            <div>
              <div>{item?.name}</div>
              {/* <div>
                  <img className="my-item-image" onError={(e)=> e.target.src="https://cdn-icons-png.flaticon.com/512/70/70644.png"} src={item?.image} alt='img' />
                </div> */}
              <button className='editspot-pink-buttons' onClick={() => { dispatch(deleteItem(item.id)) }}>DELETE</button>
              <EditItemModal item={item} />
            </div>
            {/* </NavLink> */}
          </div>
        </div>
      </div>
    )))
  }

}

export default CurrentUserItems