import React, { useState, useEffect } from 'react'
import Profile from './profile.png'
import Thank from './Thank.png'
import Back from './back.png'
import './SetupBox.css'
import DatePicker from 'react-date-picker'
import { useDispatch, useSelector } from 'react-redux'
import {
  nextPage,
  backPage,
  changeName,
  changeContact,
  changePackage_Type,
  changePrice,
  changePackage_Plane,
  changeStart_Date,
  changeTotal_Price
} from './Redux/Action'

export default function SetupBox () {
  const [data, setData] = useState([])
  const [planeDate, setPlaneDate] = useState(null)
  const [page, setPage] = useState(0)
  const [packagePlane, setPackagePlane] = useState('')
  const [name, setName] = useState('')
  const [price, SetPrice] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [errorStatus, setErrorStatus] = useState([
    {
      nameError: false,
      contactError: false,
      pDateError: false,
      pPlaneError: false
    }
  ])
  const [valid, setValid] = useState([
    { nameValid: false, contactValid: false }
  ])
  const [contact, setContact] = useState('')
  const [packageType, setPackageType] = useState('')
  const [plane, setPlane] = useState([
    {
      Package_Type: 'SD',
      Price: 250,
      Select_Type: '',
      start_Date: '',
      select_Plane: '',
      Plane_Price: 0
    },
    {
      Package_Type: 'HD',
      Price: 300,
      Select_Type: '',
      start_Date: '',
      select_Plane: '',
      Plane_Price: 0
    },
    {
      Package_Type: 'Normal',
      Price: 350,
      Select_Type: '',
      start_Date: '',
      select_Plane: '',
      Plane_Price: 0
    },
    {
      Package_Type: 'HD+',
      Price: 400,
      Select_Type: '',
      start_Date: '',
      select_Plane: '',
      Plane_Price: 0
    },
    {
      Package_Type: 'UHD',
      Price: 450,
      Select_Type: '',
      start_Date: '',
      select_Plane: '',
      Plane_Price: 0
    }
  ])
  const setDataToProps = () => {
    setPage(state.Page)
    setName(state.Name)
    setContact(state.Contact)
    setPackageType(state.Package_Type)
    SetPrice(state.Price)
    setPlaneDate(state.Start_Date)
    setPackagePlane(state.Package_Plane)
    setTotalPrice(state.Total_Price)
  }
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  useEffect(() => {
    state && setDataToProps()
  }, [state])
  const pageNext = () => {
    if (page === 2) {
      dispatch(changeName(name))
      dispatch(changeContact(contact))
    }
    if (page === 3) {
      dispatch(changePackage_Type(packageType))
      dispatch(changePrice(price))
    }
    if (page === 4) {
      dispatch(changePackage_Plane(packagePlane))
    }
    if (page === 5) {
      dispatch(changeStart_Date(planeDate))
      dispatch(changeTotal_Price(totalPrice))
    }
    
    dispatch(nextPage(page))
    pageList()
  }
  const pageBack = () => {
    dispatch(backPage(page))
    pageList()
  }
  const pTypeHandler = e => {
    const value = e.target.value
    if (value === '') {
      SetPrice(0)
      setErrorStatus(
        errorStatus.map(item => {
          return { ...item, pTypeError: true }
        })
      )
    } else {
      const index = plane.findIndex(item => item.Package_Type === value)
      const price = plane[index].Price
      SetPrice(price)
      setErrorStatus(
        errorStatus.map(item => {
          return { ...item, pTypeError: false }
        })
      )
    }
    setPackageType(value)
    setPlane(
      plane.map(item => {
        if (item.Package_Type === value) {
          return { ...item, Select_Type: value }
        } else {
          return { ...item, Select_Type: '', select_Plane: '' }
        }
      })
    )
  }
  const nameHandler = e => {
    var letters = /^[A-Za-z]*$/
    const value = e.target.value
    if (value === '') {
      setErrorStatus(
        errorStatus.map(item => {
          return { ...item, nameError: true }
        })
      )
      setValid(
        valid.map(item => {
          return { ...item, nameValid: false }
        })
      )
    } else {
      if (!value.match(letters) || value.length > 35) {
        setValid(
          valid.map(item => {
            return { ...item, nameValid: true }
          })
        )
      } else {
        setValid(
          valid.map(item => {
            return { ...item, nameValid: false }
          })
        )
      }
      setErrorStatus(
        errorStatus.map(item => {
          return { ...item, nameError: false }
        })
      )
    }
    setName(value)
  }
  const contactHandler = e => {
    const value = parseInt(e.target.value)
    if (e.target.value === '') {
      setErrorStatus(
        errorStatus.map(item => {
          return { ...item, contactError: true }
        })
      )
      setValid(
        valid.map(item => {
          return { ...item, contactValid: false }
        })
      )
    } else {
      if (typeof value !== 'number' || e.target.value.length !== 10) {
        setValid(
          valid.map(item => {
            return { ...item, contactValid: true }
          })
        )
      } else {
        setValid(
          valid.map(item => {
            return { ...item, contactValid: false }
          })
        )
      }
      setErrorStatus(
        errorStatus.map(item => {
          return { ...item, contactError: false }
        })
      )
    }
    setContact(e.target.value)
  }
  const sbtHandler = e => {
    e.preventDefault()
    if (name === '') {
      setErrorStatus(
        errorStatus.map(item => {
          return { ...item, nameError: true }
        })
      )
    } else if (contact === '') {
      setErrorStatus(
        errorStatus.map(item => {
          return { ...item, contactError: true }
        })
      )
    } else {
      pageNext()
    }
  }
  const submit = e => {
    e.preventDefault()
    if (packageType === '') {
      setErrorStatus(
        errorStatus.map(item => {
          return { ...item, pTypeError: true }
        })
      )
    } else {
      pageNext()
    }
  }
  const dateHandler = e => {
    setPlaneDate(e)
    setPlane(
      plane.map(item => {
        if (item.Package_Type === packageType) {
          return { ...item, start_Date: e }
        } else {
          return {
            ...item,
            Select_Type: '',
            start_Date: '',
            select_Plane: '',
            Plane_Price: 0
          }
        }
      })
    )
  }
  const pPlaneHandler = e => {
    e.preventDefault()
    const value = e.target.value
    let packagePrice
    if (value === '1-Month') {
      packagePrice = price * 1
    }
    if (value === '3-Month') {
      packagePrice = price * 2.5
    }
    if (value === '6-Month') {
      packagePrice = price * 4
    }
    if (value === '1-Year') {
      packagePrice = price * 7
    }
    setPlane(
      plane.map(item => {
        if (item.Package_Type === packageType) {
          return { ...item, select_Plane: value, Plane_Price: packagePrice }
        } else {
          return { ...item, start_Date: '', select_Plane: '', Price: 0 }
        }
      })
    )
    setTotalPrice(packagePrice)
    setPackagePlane(value)
  }
  const confirmHandler = e => {
    e.preventDefault()
    if (planeDate === null) {
      setErrorStatus(
        errorStatus.map(item => {
          return { ...item, pDateError: true }
        })
      )
    } else if (packagePlane === '') {
      setErrorStatus(
        errorStatus.map(item => {
          return { ...item, pPlaneError: true }
        })
      )
    } else {
      setData([
        ...data,
        {
          id: Math.random()
            .toString()
            .substr(9, 4),
          Name: name,
          Package_Type: packageType,
          Start_Date: planeDate,
          Package_Plane: packagePlane,
          Price: totalPrice,
          Status: 'Activated'
        }
      ])
      pageNext()
    }
  }
  const pageList = () => {
    // console.log("page",page);
    switch (page) {
      case 1:
        return (
          <div className='container'>
            <div className='row'>
              <div className='profile'>
                <img src={Profile} className='imgProfile' alt='profile' />
              </div>
              <div className='User'>
                <label className='ULabel'>Welcome,User</label>
              </div>
              <div className='Description'>
                <ul>
                  <li>
                    GTPL HD offers you advanced High Definition picture quality
                    for your HD TVs.
                  </li>
                  <br />
                  <li>
                    Select from a range of packages channels to suit your
                    viewing requirements.
                  </li>
                  <br />
                  <li>
                    Access to GTPL local channels and city specific channels
                  </li>
                </ul>
              </div>
              <div className='btnClass'>
                <button className='btn' onClick={pageNext} type='button'>
                  Get Start
                </button>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className='container'>
            <div className='row'>
              <div className='back'>
                <span>
                  <img
                    src={Back}
                    onClick={pageBack}
                    className='imgBack'
                    alt='back'
                  />
                </span>
              </div>
              <div className='abc'>
                <div className='name'>
                  <label className='nameLabel'>Enter Name</label>
                </div>
                <div>
                  <input type='text' onChange={nameHandler} value={name} />
                  {errorStatus &&
                    errorStatus[0] &&
                    errorStatus[0].nameError === true && (
                      <div className='errorStatus'>Name is Required</div>
                    )}
                  {valid && valid[0] && valid[0].nameValid === true && (
                    <div className='errorStatus'>Name is Not Valid</div>
                  )}
                </div>
                <div className='contact'>
                  <label className='mobileLabel'>Mobile No.</label>
                </div>
                <div>
                  <input
                    type='text'
                    value={contact}
                    onChange={contactHandler}
                  />
                  {errorStatus &&
                    errorStatus[0] &&
                    errorStatus[0].contactError === true && (
                      <div className='errorStatus'>Contact is Required</div>
                    )}
                  {valid && valid[0] && valid[0].contactValid === true && (
                    <div className='errorStatus'>Contact is Not Valid</div>
                  )}
                </div>
                <div className='btnClass1'>
                  <button className='btn' onClick={sbtHandler} type='button'>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className='container'>
            <div className='row'>
              <div className='back'>
                <span>
                  <img
                    src={Back}
                    onClick={pageBack}
                    className='imgBack'
                    alt='back'
                  />
                </span>
              </div>
              <div className='package'>
                <label className='nameLabel'>Package_Type</label>
                <br />
                <select
                  className='select'
                  name='Package'
                  onChange={pTypeHandler}
                  value={packageType}
                >
                  <option value=''>Select Type</option>
                  <option value='SD'>SD</option>
                  <option value='HD'>HD</option>
                  <option value='Normal'>Normal</option>
                  <option value='HD+'>HD+</option>
                  <option value='UHD'>UHD</option>
                </select>
                {errorStatus &&
                  errorStatus[0] &&
                  errorStatus[0].pTypeError === true && (
                    <div className='errorStatus'>Package is Required</div>
                  )}
              </div>
              <div className='p_Description'>
                <ul>
                  <li>SD - Standard Definition/720p. </li>
                  <br />
                  <li>HD - High Definition/2k. </li>
                  <br />
                  <li>Normal - Normal Resolution.</li>
                  <br />
                  <li>HD+ - High Definition/4k.</li>
                  <br />
                  <li>UHD - Ultra High Definition/8k.</li>
                </ul>
              </div>
              <div className='btnClass2'>
                <button className='btn' onClick={submit} type='button'>
                  Next
                </button>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className='container'>
            <div className='row'>
              <div className='back'>
                <img
                  src={Back}
                  className='imgBack'
                  alt='back'
                  onClick={pageBack}
                />
              </div>
              <div className='package'>
                <label className='start_date'>Start_Date</label>
                <br />
                <DatePicker
                  className='date'
                  minDate={new Date()}
                  maxDate={new Date()}
                  style={{ backgroundColor: 'white' }}
                  value={planeDate}
                  onChange={dateHandler}
                />
                {errorStatus &&
                  errorStatus[0] &&
                  errorStatus[0].pDateError === true && (
                    <div className='errorStatus'>Start_Date is Required</div>
                  )}
              </div>
              <div className='package'>
                <label className='nameLabel'>Package_Plane</label>
                <br />
                <select
                  className='select'
                  onChange={pPlaneHandler}
                  value={packagePlane}
                  name='Package'
                >
                  <option value=''>Select Plane</option>
                  <option value='1-Month'>1-Month</option>
                  <option value='3-Month'>3-Month</option>
                  <option value='6-Month'>6-Month</option>
                  <option value='1-Year'>1-Year</option>
                </select>
                {errorStatus &&
                  errorStatus[0] &&
                  errorStatus[0].packagePlane === true && (
                    <div className='errorStatus'>Package_Plane is Required</div>
                  )}
              </div>
              <div className='detail'>
                <table className='table table-bordered' align='center'>
                  <thead>
                    <tr>
                      <th className='th1'>Plane</th>
                      <th className='th2'>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='td1'>1-Month</td>
                      <td className='td2'>{price}</td>
                    </tr>
                    <tr>
                      <td className='td1'>3-Month</td>
                      <td className='td2'>{price * 2.5}</td>
                    </tr>
                    <tr>
                      <td className='td1'>6-Month</td>
                      <td className='td2'>{price * 4}</td>
                    </tr>
                    <tr>
                      <td className='td1'>1-Year</td>
                      <td className='td2'>{price * 7}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='btnClass2'>
                <button className='btn' onClick={confirmHandler} type='button'>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className='container'>
            <div className='row'>
              {/* <div className='profile'>
                  <img src={Profile} className='imgProfile' alt='profile' />
                </div> */}
              <div className='thanks'>
                <img src={Thank} className='imgThanks' alt='thank' />
              </div>
              <div className='User'>
                <label className='ULabel'>Thank You</label>
              </div>
              <div className='detail2'>
                {data &&
                  data.map((item, index) => {
                    return (
                      <table className='table table-bordered' align='center'>
                        <thead></thead>
                        <tbody>
                          <tr>
                            <td className='td1'>Name</td>
                            <td className='td2'>{item.Name}</td>
                          </tr>
                          <tr>
                            <td className='td1'>Package_Type</td>
                            <td className='td2'>{item.Package_Type}</td>
                          </tr>
                          <tr>
                            <td className='td1'>Start_Date</td>
                            <td>
                              {item.Start_Date.getDate() +
                                '/' +
                                parseInt(item.Start_Date.getMonth() + 1) +
                                '/' +
                                item.Start_Date.getFullYear()}
                            </td>
                          </tr>
                          <tr>
                            <td className='td1'>Package_Plane</td>
                            <td className='td2'>{item.Package_Plane}</td>
                          </tr>
                          <tr>
                            <td className='td1'>Price</td>
                            <td className='td2'>{item.Price}</td>
                          </tr>
                          <tr>
                            <td className='td1'>Status</td>
                            <td className='td2'>{item.Status}</td>
                          </tr>
                        </tbody>
                      </table>
                    )
                  })}
              </div>
            </div>
          </div>
        )
      default:
        return <h1>OOps,Page is Not Found...</h1>
    }
  }
  return <div className='main'>{pageList()}</div>
}
