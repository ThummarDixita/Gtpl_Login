import { NEXT_PAGE, PREV_PAGE, ADD_NAME ,ADD_CONTACT ,PACKAGE_TYPE ,START_DATE ,PACKAGE_PLANE , PRICE, TOTAL_PRICE} from "../constant"


export const nextPage = (payload) => {
    return {
        type: NEXT_PAGE,
        payload
    }
}

export const backPage = (payload) => {
    return {
        type: PREV_PAGE,
        payload
    }
}

export const addName = (payload) => {
    return {
        type: ADD_NAME,
        payload
    }
}

export const addContact = (payload) => {
    return {
        type: ADD_CONTACT,
        payload
    }
}

export const addPackgeType = (payload) => {
    return {
        type: PACKAGE_TYPE,
        payload
    }
}
export const addStartDate = (payload) => {
    return {
        type: START_DATE,
        payload
    }
}
export const addPackgePlane = (payload) => {
    return {
        type: PACKAGE_PLANE,
        payload
    }
}
export const addPrice = (payload) => {
    return {
        type: PRICE,
        payload
    }
}
export const addTotalPrice = (payload) => {
    console.log("payload" ,payload);
    return {
        type: TOTAL_PRICE,
        payload
    }
}