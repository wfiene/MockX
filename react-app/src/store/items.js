

const GET_ITEMS = 'items/getItems'
const ONE_ITEM = 'item/oneItem'
const USER_ITEMS = 'items/userItems'
const CREATE_ITEM = 'item/createItem'
const EDIT_ITEM = 'item/editItem'
const DELETE_ITEM = 'item/deleteItem'

//-------------  Actions -------------//

export const loadItems = (items) => {
    return {
        type: GET_ITEMS,
        items
    }
}

export const loadOneItem = (item) => {
    return {
        type: ONE_ITEM,
        item
    }
}

export const loadUserItems = (items) => {
    return {
        type: USER_ITEMS,
        items
    }
}

export const addItem = (item) => {
    return {
        type: CREATE_ITEM,
        item
    }
}

export const changeItem = (item) => {
    return {
        type: EDIT_ITEM,
        item
    }
}

export const removeItem = (itemId) => {
    return {
        type: DELETE_ITEM,
        itemId
    }
}


//------------- Thunks -------------//

export const getItems = () => async (dispatch) => {
    const res = await fetch('/api/items', {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(loadItems(data.items))
        return data
    }
}

export const getOneItem = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/items/${itemId}`)

    if (res.ok) {
        const data = res.json()
        dispatch(loadOneItem(data))
        return data
    }
}

export const getItemsByUserId = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/items`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadUserItems(data))
        return data
    }
}

export const createItem = (item) => async (dispatch) => {
    const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });

    if (res.ok) {
        const item = await res.json()
        await dispatch(addItem(item.id))
        return item
    }
}

export const editItem = (item) => async (dispatch) => {
    const res = await fetch(`/api/items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    });
    if (res.ok) {
        const data = await res.json()
        dispatch(changeItem(data))
    }
}

export const deleteItem = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(removeItem(itemId))
    }
}

//---------- Reducer ----------//

const initialState = { allItems: {}, oneItem: {} }
const itemReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case GET_ITEMS:
            {
                newState = { allItems: { ...state.allItems }, oneItem: {} }
                action.items.forEach(item => {
                    newState.allItems[item.id] = item
                })
                return newState
            }
        case ONE_ITEM:
            {
                newState = { ...state, oneItem: { ...state.oneItem } }
                newState.oneItem = { ...action.item }
                return newState
            }
        case USER_ITEMS:
            {
                newState = { allItems: { ...state.allItems }, oneItem: {} }
                action.items.userItems.forEach(item => {
                    newState.allItems[item.id] = item
                });
                return newState
            }
        case CREATE_ITEM:
            {
                newState = { allItems: { ...state.allItems }, oneItem: { ...state.oneItem } }
                newState.allItems[action.item.id] = action.item
                return newState
            }
        case EDIT_ITEM:
            {
                newState = { allItems: { ...state.allItems }, oneItem: { ...state.oneItem } }
                newState.allItems[action.item.id] = action.server
                newState.oneItem[action.item.id] = action.item
                return newState
            }
        case DELETE_ITEM:
            {
                newState = { allItems: { ...state.allItems }, oneItem: { ...state.oneItem } }
                delete newState.allItems[action.itemId]
                delete newState.oneItem[action.itemId]
                return newState
            }
        default:
            return state
    }
}

export default itemReducer