import React, { useEffect, useState } from 'react';
import { postActivity } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions/index'
import validate from './validators';
import { FaFileImage } from "react-icons/fa";
import './AddActivity.css';
import Buttom from '../Buttom/Buttom';
import Modal from '../Modal/Modal';
import { useNavigate } from 'react-router-dom';


const AddActivity = () => {
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);

  let orderCountries = countries.sort(function (a, b) {
    return ('' + a.name).localeCompare(b.name);
  })

  let countriesList = orderCountries.map(country => {
    return ({
      name: country.name
    })
  });

  useEffect(() => {
    dispatch(actions.getAxiosCountries())
  }, [])

  //let orderCountries = countries.sort(function (a, b) {('' + a.name).localeCompare(b.name)}).map(country => {return ({ name: country.name  })});
  //HASTA ACA CTRL Z
  const [selected, setSelected] = useState("");
  const [imgFetch, setimgFetch] = useState(false);
  const [previewImage, setpreviewImage] = useState('');
  const [modal, setModal] = useState()
  const [errors, setErrors] = useState({});
  const [modified, setModified] = useState(false)
  const [activity, setActivity] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    image: '',
    countries: []
  });

  const navigate = useNavigate()


  const validate = (activity) => {
    let errors = {}

    if (!activity.name) {
      errors.name = 'Name is required'
    }
    else if (!activity.difficulty) {
      errors.difficulty = 'Difficulty is required'
    }

    else if (!activity.duration) {
      errors.duration = 'Duration is required'
    }

    else if (activity.duration > 24 || activity.duration < 1) {
      errors.duration = 'Maximum duration from 1 to 24 hours'
    }

    else if (activity.difficulty > 5 || activity.difficulty < 1) {
      errors.difficulty = 'Maximum difficulty from 1 to 5'
    }

    else if (!activity.season) {
      errors.season = 'You must select at least one season'
    }

    else if (!activity.countries.length) {
      errors.countries = 'You must select at least one country'
    }
    return errors;
  };



  const handleChange = (e) => {
    setModified(true);
    setActivity({
      ...activity,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...activity,
      [e.target.name]: e.target.value
    }))
  }


  const handleSeasons = (e) => {
    setModified(true)
    if (e.target.value !== 'Select' && !activity.season.includes(e.target.value)) {
      setActivity({
        ...activity,
        season: e.target.value
      })
    }

    setErrors(validate({
      ...activity,
      season: e.target.value
    }))

  }

  // const handleFilter = (e) =>{
  // countriesList.filter(country=> country.name !== e.target.value)
  // console.log('filtrado',countriesList)
  // return countriesList
  // }


  const handleCountries = (e) => {
    setModified(true)
    if (e.target.value !== 'Select' && !activity.countries.includes(e.target.value)) {
      setActivity({
        ...activity,
        countries: [...activity.countries, e.target.value]
      })
    }
    setErrors(validate({
      ...activity,
      countries: [...activity.countries, e.target.value]
    }))


  }

  const deleteCountry = (e) => {
    setModified(true)
    setActivity({
      ...activity,
      countries: activity.countries.filter(country => country !== e.target.value)
    })
    setErrors(validate({
      ...activity,
      countries: activity.countries.filter(country => country !== e.target.value)
    }))
  }

  // const handleCheckErrors = (e) => {
  //   e.preventDefault();
  //   setErrors(validate({
  //     ...activity,
  //     [e.target.name]: e.target.value,
  //     countries: [...activity.countries, e.target.value]
  //   }))
  //   handleSubmit(e)
  // }

//  const handleNavigate = () =>
//   {setTimeout(() => {
//   navigate("/create");
// }, 2000);}

  const handleImage = (file) => {
    setimgFetch(true)
    var reader = new FileReader() //this for convert to Base64 
    reader.readAsDataURL(file) //start conversion...
    reader.onload = function (e) {
      setpreviewImage(URL.createObjectURL(file)) //.. once finished..
      var rawLog = reader.result.split(',')[1]; //extract only thee file data part
      var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
      fetch('https://script.google.com/macros/s/AKfycbxU47iTlWQkocTIWS_Wr_fO_U7zqLuQE3jF7QTMeChKn-d2KrNdOLrCsFerZeS50W_2Ow/exec', //your AppsScript URL
        { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
        .then(res => res.json()).then((a) => {
          setActivity({
            ...activity,
            image: a.url,
          })
          setimgFetch(false)
        }).catch(e => {
          setimgFetch(false)
        })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postActivity(activity));
    setpreviewImage('')
    setActivity({
      name: '',
      difficulty: '',
      duration: '',
      season: '',
      image: '',
      countries: []
    });        
  }


  return (
    <div className='activity-page-container'>
      <div className='activity-page'>

        <div className='formContent'>

          {/* {modal === true ?
            <Modal
              modalType='exitoso'
              titleAlert='Success'
              textAlert='The activity was created successfully'
              linkTo='/create'
              nameButton='ACEPT'
            /> : modal === false ?
              <Modal
                modalType='fallida'
                titleAlert='Alert'
                textAlert='Complete the required fields'
                linkTo='/create'
                nameButton='TRY AGAIN'
              /> : ''}  */}


          <form className='form' onSubmit={e => handleSubmit(e)}>
            <h1 className='title-activity'>Would you like add an activity?</h1>

            <div className='divForm'>
              <div className='divLabel'>
                <input
                  type='text'
                  name='name'
                  value={activity.name}
                  onChange={e => handleChange(e)}
                  autoComplete='off'
                  placeholder='Activity Name...'
                />
              </div>
              {errors.name && (<p className='errorMessage'>{errors.name}</p>)}
            </div>

            <div className='divForm'>
              <div className='divLabel'>
                <input
                  type='text'
                  name='difficulty'
                  value={activity.difficulty}
                  onChange={e => handleChange(e)}
                  autoComplete='off'
                  placeholder='Difficulty 1 to 5'
                />
              </div>
              {errors.difficulty && (<p className='errorMessage'>{errors.difficulty}</p>)}
            </div>

            <div className='divForm'>
              <div className='divLabel'>
                <input
                  type='text'
                  name='duration'
                  value={activity.duration}
                  onChange={e => handleChange(e)}
                  autoComplete='off'
                  placeholder='Duration Format: max 24hs'
                />
              </div>
              {errors.duration && (<p className='errorMessage'>{errors.duration}</p>)}
            </div>

            <div className='divForm'>
              <div className='divLabel'>
                <select onChange={e => handleSeasons(e)}>
                  <option>Select Season</option>
                  <option value='Spring'>Spring</option>
                  <option value='Summer'>Summer</option>
                  <option value='Autumn'>Autumn</option>
                  <option value='Winter'>Winter</option>
                </select>
              </div>
              {errors.season && (<p className='errorMessage'>{errors.season}</p>)}
            </div>

            <div>
              <div className='divForm'>
                <div className='divLabel'>
                  <select value={selected} onChange={e => [handleCountries(e), setSelected(e)]}>
                    <option>Select Countries</option>
                    {countriesList?.map(country => {
                      return (
                        <option key={country.name}>
                          {country.name}
                        </option>
                      )
                    })}
                  </select>

                </div>
                {errors.countries && (<p className='errorMessage'>{errors.countries}</p>)}
              </div>

              <div className="displayCountries">
                {activity.countries.map((country) => {
                  return (
                    <div className="countryDiv" key={country}>
                      <p className="countryName">{country}</p>
                      <button className="closeButton" onClick={e => { deleteCountry(e) }} value={country}>X</button>
                    </div>
                  )
                })}
              </div>

            </div>

            <div>
              <button type='submit' disabled={Object.keys(errors).length !== 0 || !modified} >Add Activity</button>
            </div>

            <div className="image-container">
              <div className="input-image">

                <label className={previewImage.length > 0 ? 'noCustom-file-upload' : 'custom-file-upload'}>
                  <h3>Cargar Imagen...</h3>
                  <input
                    type="file"
                    accept="image/*"
                    id="customFile"
                    hidden={previewImage.length > 0}
                    onChange={(e) => handleImage(e.target.files[0])} /> <FaFileImage />
                </label>

              </div>
              <img className={previewImage.length > 0 ? 'previewImage' : 'NopreviewImage'} src={previewImage} />
            </div>

          </form>

          <Buttom
            nameClass='buttom-addActivity'
            description='HOME'
            linkTo='/home'
          />

        </div>

      </div>
    </div>
  )
}

export default AddActivity

//btnAddActivity