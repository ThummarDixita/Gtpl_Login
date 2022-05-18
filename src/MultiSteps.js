import React, { useState, useEffect } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { nextPage, backPage, addName, addContact, addPackgeType, addStartDate, addPackgePlane, addPrice, addTotalPrice } from './actions/action';
import DatePicker from "react-date-picker";
import "react-datepicker/dist/react-datepicker.css";


const MultiSteps = () => {
    const myState = useSelector(state => state)
    var letters = /^[A-Za-z/ /]+$/;
    const dispatch = useDispatch()
    const [page, setPage] = useState(0);
    const [selctedDate, setSelectedDate] = useState("");
    const [obj, setObj] = useState({
        name: '',
        mobileNo: ''
    });
    const [errorMessage, setErrorMessage] = useState({
        name: '',
        mobileNo: '',
        selectType: '',
        selectDate: '',
        selectPlane: ''
    })
    const [packgeType, setPackgeType] = useState("")
    const [packagePlane, setpackagePlane] = useState("")
    const [price, setPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [plane, setPlane] = useState([{
        Select_Type: "SD",
        Price: 200,
        Package_Type: "",
        Select_Date: "",
        package_Plane: "",
        Plane_Price: 0
    }, {
        Select_Type: "HD",
        Price: 250,
        Package_Type: "",
        Select_Date: "", 
        package_Plane: "",
        Plane_Price: 0
    }, {
        Select_Type: "NORMAL",
        Price: 300,
        Package_Type: "",
        Select_Date: "",
        package_Plane: "",
        Plane_Price: 0
    }, {
        Select_Type: "HD+",
        Price: 400,
        Package_Type: "",
        Select_Date: "",
        package_Plane: "",
        Plane_Price: 0
    }, {
        Select_Type: "UHD",
        Price: 500,
        Package_Type: "",
        Select_Date: "",
        package_Plane: "",
        Plane_Price: 0
    }]
    )
    const setData = (state) => {
        setPage(state.Page)
        setObj(state.Name)
        setObj(state.Contact)
        setPackgeType(state.Package_Type)
        setPrice(state.Price)
        setSelectedDate(state.Select_Date)
        setpackagePlane(state.Package_Plane)
        setTotalPrice(state.Total_Price)
    }
    useEffect(() => {
        myState && setData(myState)
    }, [myState]);

    const nextHandler = () => {
        if (page === 2) {
            dispatch(addName(obj.name))
            dispatch(addContact(obj.mobileNo))
        }
        if (page === 3) {
            dispatch(addPackgeType(packgeType))
            dispatch(addPrice(price))
        }
        if (page === 4) {
            let getDate = selctedDate.getDate() + "/" + (selctedDate.getMonth() + 1) + "/" + selctedDate.getFullYear();
            dispatch(addStartDate(getDate))
            dispatch(addPackgePlane(packagePlane))
            dispatch(addTotalPrice(totalPrice))
        }
        dispatch(nextPage(page))
        pageDisplay()
    }
    const previousHandler = () => {
        dispatch(backPage(page))
    }
    const changeHandler = (e) => {
        let { name, value } = e.target
        setObj({ ...obj, [name]: value })
        if (name === 'name') {
            if (!value) {
                setErrorMessage({ ...errorMessage, name: "Name is Required.!" })
            } else if (!value.match(letters)) {
                setErrorMessage({ ...errorMessage, name: "Name is Invalid.!" })
            } else {
                setErrorMessage({ ...errorMessage, name: "" })
            }
        }
        if (name === 'mobileNo') {
            if (!value) {
                setErrorMessage({ ...errorMessage, mobileNo: "Mobile Number is Required.!" })
            } else if (value.length !== 10) {
                setErrorMessage({ ...errorMessage, mobileNo: "Mobile Number is Invalid.!" })
            }
            else {
                setErrorMessage({ ...errorMessage, mobileNo: "" })
            }
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!obj.name && !obj.mobileNo) {
            setErrorMessage({ name: "Name is Required.!", mobileNo: "Mobile Number is Required.!" })
        }
        else if (!obj.name) {
            setErrorMessage({ ...errorMessage, name: "Name is Required.!" })
        }
        else if (!obj.mobileNo) {
            setErrorMessage({ ...errorMessage, mobileNo: "Mobile Number is Required.!" })
        }
        else if (errorMessage.name || errorMessage.mobileNo) {
            return true
        } else {
            nextHandler()
            pageDisplay()
        }
    }
    const changePackageTypeHandler = (e) => {
        const { value, name } = e.target
        setPackgeType(value)
        if (name === "packgeType") {
            if (!value) {
                setErrorMessage({ ...errorMessage, selectType: "Please Select PackageType" })
            } else {
                setErrorMessage({ ...errorMessage, selectType: "" })
                const index = plane.findIndex(item => item.Select_Type === value)
                const price = plane[index].Price
                setPrice(price)
                setPlane(
                    plane.map(item => {
                        if (item.Select_Type === value) {
                            return { ...item, Package_Type: value }
                        } else {
                            return { ...item, Package_Type: '' }
                        }
                    })
                )
                // plane.map((data) => {
                //     if (data.Select_Type === value) {
                //         setPrice(data.Price)
                //     }
                // })
            }
        }
    }
    const packageTypeSubmitHandler = (e) => {
        e.preventDefault()
        if (!packgeType) {
            setErrorMessage({ ...errorMessage, selectType: "Please Select PackageType" })
        }
        else {
            nextHandler()
        }
    }

    const datePickerHandler = (date) => {
        if (!date) {
            setErrorMessage({ ...errorMessage, selectDate: "Please Select the Start Date" })
        } else {
            setErrorMessage({ ...errorMessage, selectDate: "" })
        }
        setSelectedDate(date)
        setPlane(
            plane.map((item) => {
                if (item.Package_Type === packgeType) {
                    return { ...item, Select_Date: date }
                } else {
                    return {
                        ...item,
                        Package_Type: "",
                        Select_Date: ""
                    }
                }
            })
        )
    }

    const changePackagePlaneHandler = (e) => {
        const { value, name } = e.target
        if (name === "packagePlane") {
            if (!value) {
                setErrorMessage({ ...errorMessage, package_Plane: "Please Select Plane Of The Package" })
            } else {
                setErrorMessage({ ...errorMessage, selectType: "" })
            }
        }
        setpackagePlane(value)
        let packagePrice
        if (value === '1-Month') {
            packagePrice = price
        }
        if (value === '3-Month') {
            packagePrice = price * 2.5
        }
        if (value === '6-Month') {
            packagePrice = price * 5
        }
        if (value === '1-Year') {
            packagePrice = price * 9
        }
        setPlane(plane.map((item) => {
            if (item.Package_Type === packgeType) {
                return { ...item, Package_Plane: value, Plane_Price: packagePrice }
            }
            else {
                return {
                    ...item,
                    Package_Type: "",
                    Select_Date: "",
                    Package_Plane: "",
                    Plane_Price: 0
                }
            }
        }))
        setTotalPrice(packagePrice)
    }
    const confirmHandler = (e) => {
        e.preventDefault();
        if (!selctedDate && !packagePlane) {
            setErrorMessage({ selectDate: "Please Select the Start Date", package_Plane: "Please Select Plane Of The Package" })
        }
        else if (!selctedDate) {
            setErrorMessage({ ...errorMessage, selectDate: "Please Select the Start Date" })
        }
        else if (!packagePlane) {
            setErrorMessage({ ...errorMessage, package_Plane: "Please Select Plane Of The Package" })
        } else {
            nextHandler()
        }
    }
    const pageDisplay = () => {
        switch (page) {
            case 1:
                return (
                    <div className="App">
                        <header className="App-header">
                            <div className="welcome_user_page">
                                <div className="user-img">
                                    <img className="img rounded-img" src="https://i.pinimg.com/736x/53/6a/1a/536a1adf40ac212182bdcdf403371ac7.jpg" /></div>
                                <p className='user-welcome'>Welcome, User</p>
                                <div className='listOfServices'>
                                    <ul>
                                        <li className='displayGtplList'>GTPL HD,Offers you advanced High Definition Picture Qulity for Your HD TVs.</li>
                                        <li className='displayGtplList'>Select from a range of packges channels to suit your viewing requirements.</li>
                                        <li className='displayGtplList'>Access to GTPL local channels and city specific channels.</li>
                                    </ul>
                                </div>
                                <div style={{ margin: '5% 5% 12% 5%' }}>
                                    <button className='Button'
                                        onClick={nextHandler}
                                    >GET START</button>
                                </div>
                            </div>
                        </header>
                    </div>
                )
            case 2:
                return (
                    <div className="App">
                        <div className="login-header">
                            <div className="welcome_user_page">
                                <div className='arrowLeft'>
                                    <button onClick={previousHandler} className='backButton'><IoIosArrowRoundBack /></button>
                                </div>
                                <div className='form'>
                                    <div className="formInput">
                                        <label className='title'>Enter Name:</label>
                                        <input type="text" className="form-control" value={obj.name} name='name' onChange={changeHandler} />
                                        <div className='mainError'>
                                            {errorMessage !== "" && <div className='errorMessage'>{errorMessage.name}</div>}
                                        </div>
                                    </div>
                                    <div className="formInput">
                                        <label className='title'>Mobile No.:</label>
                                        <input type="number" className="form-control" value={obj.mobileNo} name='mobileNo' maxLength={10} onChange={changeHandler} />
                                    </div>
                                    <div className='mainError'>
                                        {errorMessage !== "" && <div className='errorMessage'>{errorMessage.mobileNo}</div>}
                                    </div>
                                </div>
                                <div style={{ margin: '5% 5% 25% 5%' }}>
                                    <button className='nextButton' onClick={handleSubmit}>NEXT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 3:
                return (
                    <div className="App">
                        <div className="login-header">
                            <div className="welcome_user_page">
                                <div className='arrowLeft'>
                                    <button className='backButton' onClick={previousHandler}><IoIosArrowRoundBack /></button>
                                </div>
                                <div className='selectDiv'>
                                    <div className='packageType'><p className='pacageTitle'>Package_Type:</p>
                                        <select id='sd' value={packgeType} onChange={(e) => changePackageTypeHandler(e)} name="packgeType"
                                        >
                                            <option value="">Select Type</option>
                                            <option value="SD">SD</option>
                                            <option value="HD">HD</option>
                                            <option value="NORMAL">NORMAL</option>
                                            <option value="HD+">HD+</option>
                                            <option value="UHD">UHD</option>
                                        </select>
                                        <div className='mainError'>
                                            {errorMessage !== "" && <div className='errorMessage'>{errorMessage.selectType}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className='listItems'>
                                    <ul>
                                        <li className='packagelist'>
                                            SD - Standard Definition/720P.
                                        </li>
                                        <li className='packagelist'>
                                            HD - High Definition/2K.
                                        </li>
                                        <li className='packagelist'>
                                            Normal - Normal Resolution.
                                        </li>
                                        <li className='packagelist'>
                                            HD+ - High Definition/4K.
                                        </li>
                                        <li className='packagelist'>
                                            UHD - Ultra High Definition/8k
                                        </li>
                                    </ul>
                                </div>
                                <div style={{ margin: '5% 5% 25% 5%' }}>
                                    <button className='nextButton' onClick={(e) => packageTypeSubmitHandler(e)}>NEXT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 4:
                return (<div className="App">
                    <div className="login-header">
                        <div className="welcome_user_page">
                        <div className='arrowLeft'>
                                    <button onClick={previousHandler} className='backButton'><IoIosArrowRoundBack /></button>
                                </div>
                            <div className='selectPackgeDiv'>
                                <div className='packageType'><p className='pacageTitle'>Start_Date</p>
                                    <DatePicker
                                        value={selctedDate}
                                        onChange={(e) => datePickerHandler(e)}
                                        format="dd/MM/yyyy"
                                        minDate={new Date()}
                                        maxDate={new Date()}
                                        name="selctedDate"
                                    />
                                    <div className='mainError'>
                                        {errorMessage !== "" && <div className='errorMessage'>{errorMessage.selectDate}</div>}
                                    </div>
                                </div>
                                <div className='packageType'><p className='pacageTitle'>Package_Type</p>
                                    <select id='sd' value={packagePlane} onChange={(e) => changePackagePlaneHandler(e)} name="packagePlane">
                                        <option value="">Select Plane</option>
                                        <option value="1-Month">1-Month</option>
                                        <option value="3-Month">3-Month</option>
                                        <option value="6-Month">6-Month</option>
                                        <option value="1-Year">1-Year</option>
                                    </select>
                                    <div className='mainError'>
                                        {errorMessage !== "" && <div className='errorMessage'>{errorMessage.package_Plane}</div>}
                                    </div>
                                </div>
                            </div>
                            <div className='planList'>
                                <div className='firstColum'>
                                    <div className='listRow'>
                                        <div className='list-first-Div'>
                                            <p className='innerText'>Plane</p>
                                        </div>
                                    </div>
                                    <div className='listRow'>
                                        <div className='list-first-Div'>
                                            <p className='innerText'>1-Month</p>
                                        </div>
                                    </div>
                                    <div className='listRow'>
                                        <div className='list-first-Div'>
                                            <p className='innerText'>3-Month</p>
                                        </div>
                                    </div>
                                    <div className='listRow'>
                                        <div className='list-first-Div'>
                                            <p className='innerText'>6-Month</p>
                                        </div>
                                    </div>
                                    <div className='listRow'>
                                        <div className='list-first-Div'>
                                            <p className='innerText'>1-Year</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='listRow'>
                                        <div className='list-first-Div'>
                                            <p className='innerText'>Price</p>
                                        </div>
                                    </div>
                                    <div className='listRow'>
                                        <div className='list-first-Div'>
                                            <p className='innerText'>{price * 1}</p>
                                        </div>
                                    </div>
                                    <div className='listRow'>
                                        <div className='list-first-Div'>
                                            <p className='innerText'>{price * 2.5}</p>
                                        </div>
                                    </div>
                                    <div className='listRow'>
                                        <div className='list-first-Div'>
                                            <p className='innerText'>{price * 5}</p>
                                        </div>
                                    </div>
                                    <div className='listRow'>
                                        <div className='list-first-Div'>
                                            <p className='innerText'>{price * 9}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ margin: '5% 5% 15% 5%' }}>
                                <button className='confirmBtn' onClick={(e) => confirmHandler(e)}>CONFIRM</button>
                            </div>
                        </div>
                    </div>
                </div>)
            case 5:
                return (
                    <div className="App">
                        <div className="login-header">
                            <div className="welcome_user_page">
                                <div className='imageClass'>
                                    <img className='thankyouImg' src="https://flyclipart.com/thumb2/thank-you-hands-clipart-402821.png" alt="" />
                                    <p className='user-welcome'>Thank You</p>
                                </div>
                                <div className='planList' style={{ marginBottom: '30%' }}>
                                    <div className='firstColum'>
                                        <div className='listRow'>
                                            <div className='list-first-Div'>
                                                <p className='innerText'>Name</p>
                                            </div>
                                        </div>
                                        <div className='listRow'>
                                            <div className='list-first-Div'>
                                                <p className='innerText'>Package_Type</p>
                                            </div>
                                        </div>
                                        <div className='listRow'>
                                            <div className='list-first-Div'>
                                                <p className='innerText'>Start_Date</p>
                                            </div>
                                        </div>
                                        <div className='listRow'>
                                            <div className='list-first-Div'>
                                                <p className='innerText'>Package_Plan</p>
                                            </div>
                                        </div>
                                        <div className='listRow'>
                                            <div className='list-first-Div'>
                                                <p className='innerText'>Price</p>
                                            </div>
                                        </div>
                                        <div className='listRow'>
                                            <div className='list-first-Div'>
                                                <p className='innerText'>Status</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='listRow'>
                                            <div className='list-first-Div'>
                                                <p className='innerText'>{myState.Name}</p>
                                            </div>
                                        </div>
                                        <div className='listRow'>
                                            <div className='list-first-Div'>
                                                <p className='innerText'>{myState.Package_Type}</p>
                                            </div>
                                        </div>
                                        <div className='listRow'>
                                            <div className='list-first-Div'>
                                                <p className='innerText'>{myState.Start_Date}</p>
                                            </div>
                                        </div>
                                        <div className='listRow'>
                                            <div className='list-first-Div'>
                                                <p className='innerText'>{myState.Package_Plane}</p>
                                            </div>
                                        </div>
                                        <div className='listRow'>
                                            <div className='list-first-Div'>
                                                <p className='innerText'>{myState.Price}</p>
                                            </div>
                                        </div>
                                        <div className='listRow'>
                                            <div className='list-first-Div'>
                                                <p className='innerText'>Activated</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            default:
                <h1>OPPS! Page is Not Found</h1>
        }
    }
    return (
        <>
            {pageDisplay()}
        </>
    )
}

export default MultiSteps;