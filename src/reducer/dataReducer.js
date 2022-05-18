import { initialState } from "./state";
import { ADD_CONTACT, ADD_NAME, NEXT_PAGE, PACKAGE_TYPE, PREV_PAGE, START_DATE, PACKAGE_PLANE, PRICE, TOTAL_PRICE } from '../constant';

export const dataReducer = (state = initialState, action) => {
    let page = 0
    let name = ""
    let contact = ""
    let packageType = ""
    let startDate = ""
    let packagePlane = ""
    let price = ""
    let totalPrice = ""
    switch (action.type) {
        case NEXT_PAGE:
            page = action.payload + 1
            return { ...state, Page: page }
        case PREV_PAGE:
            page = action.payload - 1
            return { ...state, Page: page }
        case ADD_NAME:
            name = action.payload
            return { ...state, Name: name }
        case ADD_CONTACT:
            contact = action.payload
            return { ...state, Contact: contact }
        case PACKAGE_TYPE:
            packageType = action.payload
            return { ...state, Package_Type: packageType }
        case START_DATE:
            startDate = action.payload
            return { ...state, Start_Date: startDate }
        case PACKAGE_PLANE:
            packagePlane = action.payload
            return { ...state, Package_Plane: packagePlane }
        case PRICE:
            price = action.payload
            return { ...state, Price: price }
        case TOTAL_PRICE:
            totalPrice = action.payload
            return { ...state,  Total_Price : totalPrice }
        default:
            return state;
    }
}
export default dataReducer