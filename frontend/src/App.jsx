import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Calendar, DateRangePicker } from 'react-date-range';
import Tables from './components/Table';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const formArray = [1, 2, 3, 4, 5];
  const [formNo, setFormNo] = useState(formArray[0])

  const [typeOfVehicle, setTypeOfVehicle] = useState([])
  const [vehicleModel, setVehicleModel] = useState([])
  const [success, setSuccess] = useState(false)
  const [table, setTable] = useState(false)


  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    type: '',
    typeId: '',
    modelName: '',
    bookingStart: '',
    bookingEnd: ''
  })

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }

  const handleSelect = (date) => {
    console.log(date.selection.startDate); // native Date objectZ
    // state.bookingStart = date.selection.startDate
    // state.bookingEnd = date.selection.endDate
    setState(prevState => ({
      ...prevState,
      bookingStart: date.selection.startDate,
      bookingEnd: date.selection.endDate
    }));
  }

  const convertTime = (dateString) => {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    console.log(formattedDate);
    return formattedDate
  }

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })

    if (e.target.name === "type") {
      const url = 'http://localhost:8080/vehicles/type';
      const payload = {
        type: e.target.value
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data received:', data);
          setTypeOfVehicle(data)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

    if (e.target.name === "typeId") {
      const url = 'http://localhost:8080/vehicles';
      const payload = {
        typeId: e.target.value,
        vehicle: state.type
      };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data received:', data);
          setVehicleModel(data)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }

  const next = () => {
    if (formNo === 1 && state.firstName && state.lastName) {
      setFormNo(formNo + 1)
    }
    else if (formNo === 2 && state.type) {
      setFormNo(formNo + 1)
    } else if (formNo === 3 && state.typeId) {
      setFormNo(formNo + 1)
    } else if (formNo === 4 && state.modelName) {
      setFormNo(formNo + 1)
    } else {
      toast.error('Please fillup all input field')
    }
  }

  const pre = () => {
    setFormNo(formNo - 1)
  }

  const finalSubmit = () => {
    if (state.bookingStart && state.bookingEnd) {
      toast.success('form submit success')

      const url = 'http://localhost:8080/booking';

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(state)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Data received:', data);
          setSuccess(true)
          setInterval(() => {
            window.location.reload()
          }, 3000);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

    } else {
      toast.error('Please fillup all input field')
    }
  }

  return (
    <div className="w-screen h-screen bg-slate-300 flex justify-center items-center">
      <ToastContainer />
      {
        table === true ?
          <div>
            <Tables />
            {
              table ?
                <button className="absolute top-0 right-0 m-4 px-3 py-2 text-lg rounded-md bg-blue-500 text-white" onClick={() => setTable(false)}>Form</button>
                :
                <button className="absolute top-0 right-0 m-4 px-3 py-2 text-lg rounded-md bg-blue-500 text-white" onClick={() => setTable(true)}>Table</button>
            }
          </div>
          :
          <div className="card w-[550px] rounded-md shadow-md bg-white p-5">
            {
              table ?
                <button className="absolute top-0 right-0 m-4 px-3 py-2 text-lg rounded-md bg-blue-500 text-white" onClick={() => setTable(false)}>Form</button>
                :
                <button className="absolute top-0 right-0 m-4 px-3 py-2 text-lg rounded-md bg-blue-500 text-white" onClick={() => setTable(true)}>Table</button>
            }
            {/* <button className="absolute top-0 right-0 m-4 px-3 py-2 text-lg rounded-md bg-blue-500 text-white">Table</button> */}
            {
              success ? <h1 className='text-3xl'>Successfully Submitted !!!</h1>
                :
                <div>
                  <div className='flex justify-center items-center'>
                    {
                      formArray.map((v, i) => <><div className={`w-[35px] my-3 text-white rounded-full ${formNo - 1 === i || formNo - 1 === i + 1 || formNo - 1 === i + 2 || formNo - 1 === i + 3 || formNo === formArray.length ? 'bg-blue-500' : 'bg-slate-400'} h-[35px] flex justify-center items-center`}>
                        {v}
                      </div>
                        {
                          i !== formArray.length - 1 && <div className={`w-[85px] h-[2px] ${formNo === i + 2 || formNo === formArray.length ? 'bg-blue-500' : 'bg-slate-400'}`}></div>
                        }
                      </>)
                    }
                  </div>
                  {
                    formNo === 1 && <div>
                      <div className='text-3xl'>What is your name?</div>
                      <br />
                      <div className='flex flex-col mb-2'>
                        <label htmlFor="firstName">First Name</label>
                        <input value={state.firstName} onChange={inputHandle} className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md' type="text" name='firstName' placeholder='First Name' id='firstName' />
                      </div>
                      <div className='flex flex-col mb-2'>
                        <label htmlFor="lastName">lastName</label>
                        <input value={state.lastName} onChange={inputHandle} className='p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md' type="text" name='lastName' placeholder='Last Name' id='lastName' />
                      </div>
                      <div className='mt-4 flex justify-center items-center'>
                        <button onClick={next} className='px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500'>Next</button>
                      </div>
                    </div>
                  }
                  {
                    formNo === 2 && <div>
                      <div className="flex flex-col mb-2">
                        <div className='text-3xl'>Number of wheels</div>
                        <div className="mt-1">
                          <label className="inline-flex items-center m-2">
                            <input
                              type="radio"
                              className="form-radio text-blue-500 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                              name="type"
                              value="cartype"
                              checked={state.type === 'cartype'}
                              onChange={inputHandle}
                            />
                            <span className="ml-2">4 Wheeler</span>
                          </label>
                          <label className="inline-flex items-center m-2">
                            <input
                              type="radio"
                              className="form-radio text-blue-500 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                              name="type"
                              value="biketype"
                              checked={state.type === 'biketype'}
                              onChange={inputHandle}
                            />
                            <span className="ml-2">2 Wheeler</span>
                          </label>
                        </div>
                      </div>
                      <div className="mt-4 gap-3 flex justify-center items-center">
                        <button onClick={pre} className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500">
                          Previous
                        </button>
                        <button onClick={next} className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500">
                          Next
                        </button>
                      </div>
                    </div>
                  }
                  {
                    formNo === 3 && <div>
                      <div className="flex flex-col mb-2">
                        <div className='text-3xl'>Type of vehicle</div>
                        <div className="mt-1">
                          {
                            typeOfVehicle && typeOfVehicle.map((item) => {
                              return <label className="inline-flex items-center m-2">
                                <input
                                  type="radio"
                                  className="form-radio text-blue-500 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                  name="typeId"
                                  value={item.id}
                                  checked={state.typeId == item.id}
                                  onChange={inputHandle}
                                />
                                <span className="ml-2">{item.name}</span>
                              </label>
                            })
                          }
                        </div>
                      </div>
                      <div className="mt-4 gap-3 flex justify-center items-center">
                        <button onClick={pre} className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500">
                          Previous
                        </button>
                        <button onClick={next} className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500">
                          Next
                        </button>
                      </div>
                    </div>
                  }
                  {
                    formNo === 4 && <div>
                      <div className="flex flex-col mb-2">
                        <div className='text-3xl'>Specific Model</div>
                        <div className="mt-1">
                          {
                            vehicleModel && vehicleModel.map((item) => {
                              console.log(item);
                              return <label className="inline-flex items-center m-2">
                                {
                                  item.availability === false ?
                                    state.modelName = ""
                                    :
                                    ""
                                }
                                {
                                  item.availability === false ?
                                    <input
                                      type="radio"
                                      className="form-radio text-blue-500 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                      name="modelName"
                                      value={item.name}
                                      disabled
                                      onChange={inputHandle}
                                    />
                                    :
                                    <input
                                      type="radio"
                                      className="form-radio text-blue-500 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                      name="modelName"
                                      value={item.name}
                                      checked={state.modelName == item.name}
                                      onChange={inputHandle}
                                    />
                                }
                                <span className="ml-2">{item.name}</span>
                              </label>
                            })
                          }
                        </div>
                      </div>
                      <div className="mt-4 gap-3 flex justify-center items-center">
                        <button onClick={pre} className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500">
                          Previous
                        </button>
                        <button onClick={next} className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500">
                          Next
                        </button>
                      </div>
                    </div>
                  }
                  {
                    formNo === 5 && <div>
                      <div className="flex flex-col mb-2">
                        <div className='text-3xl'>Date range picker</div>
                        <DateRangePicker
                          ranges={[selectionRange]}
                          onChange={handleSelect}
                        />
                      </div>
                      <div>
                        {
                          state.bookingStart && state.bookingEnd ?
                            <div className='text-3xl flex justify-between items-center'>
                              <div>
                                {convertTime(state.bookingStart)}
                              </div>
                              to
                              <div>
                                {convertTime(state.bookingEnd)}
                              </div>
                            </div>
                            :
                            <div>hello</div>
                        }
                      </div>
                      <div className="mt-4 gap-3 flex justify-center items-center">
                        <button onClick={pre} className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500">
                          Previous
                        </button>
                        <button onClick={finalSubmit} className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500">
                          Submit
                        </button>
                      </div>
                    </div>
                  }
                </div>
            }
          </div>
      }
    </div>
  );
}

export default App;
