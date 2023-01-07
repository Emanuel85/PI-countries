import React, { useState } from 'react';
import { postActivity, getActivities } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import validate from './validators';
import { useNavigate } from 'react-router-dom';
import { FaFileImage } from "react-icons/fa";
import './AddActivity.css';
import Buttom from '../Buttom/Buttom';


const AddActivity = () => {
  const dispatch = useDispatch();
  const arrayCountries = useSelector(state => state.countries);
  const navigate = useNavigate();

  let countriesList = arrayCountries.map(country => {
    return ({
      name: country.name,
      img: country.img
    })
  });


  const [selected, setSelected] = useState("");
  const [imgFetch, setimgFetch] = useState(false);
  const [previewImage, setpreviewImage] = useState('');

  const [errors, setErrors] = useState({ firstTry: true });
  const [activity, setActivity] = useState({
    name: '',
    difficulty: '',
    duration: '',
    season: '',
    image: '',
    countries: []
  });


  const handleChange = (e) => {
    setActivity({
      ...activity,
      [e.target.name]: e.target.value
    });
    if (!errors.firstTry) {
      setErrors(validate({
        ...activity,
        [e.target.name]: e.target.value
      }))
    }
  }

  const handleSeasons = (e) => {
    if (e.target.value !== 'Select' && !activity.season.includes(e.target.value)) {
      setActivity({
        ...activity,
        season: e.target.value
      })
      if (!errors.firstTry) {
        setErrors(validate({
          ...activity,
          season: e.target.value
        }))
      }
    }
  }

  const handleCountries = (e) => {
    if (e.target.value !== 'Select' && !activity.countries.includes(e.target.value)) {
      setActivity({
        ...activity,
        countries: [...activity.countries, e.target.value]
      })
      if (!errors.firstTry) {
        setErrors(validate({
          ...activity,
          countries: [...activity.countries, e.target.value]
        }))
      }
    }
  }

  const deleteCountry = (e) => {
    setActivity({
      ...activity,
      countries: activity.countries.filter(country => country !== e.target.value)
    })
    if (!errors.firstTry) {
      setErrors(validate({
        ...activity,
        countries: activity.countries.filter(country => country !== e.target.value)
      }))
    }
  }

  const handleCheckErrors = (e) => {
    e.preventDefault();
    setErrors(validate({
      ...activity,
      [e.target.name]: e.target.value,
      countries: [...activity.countries, e.target.value]
    }))
    handleSubmit(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activity.name && activity.difficulty && activity.duration && activity.season && activity.countries.length >= 1) {
      dispatch(postActivity(activity));
      alert('The activity has been created successfully');
      setActivity({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        image: '',
        countries: []
      });
      errors.firstTry = false
      navigate('/home')
    }
    if (errors.firstTry) {
      alert('Complete the required fields')
    }
  }



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
        }) // Or Error in console
    }
  }


  //https://script.google.com/macros/s/AKfycbwtnD0gLZBLe2ebL37zNHbo4AgPmmZzPpO3BK3PnXeF4xnzeb2bKlfSsmaM-BFgz6COSA/exec


  return (
    <div className='activity-page-container'>
      <div className='activity-page'>

        <div className='formContent'>

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
                  placeholder='Activity Name'
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
                  placeholder='Difficulty min:1 to max:5'
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
              {errors.name ||
                errors.activity ||
                errors.duration ||
                errors.season ||
                errors.countries ||
                imgFetch ?
                <button disabled className='btnAddActivity' >Add Activity</button>
                : <button className='btnAddActivity' onClick={e => handleCheckErrors(e)}>Add Activity</button>}
            </div>

            <div className="image-container">
              <div className="input-image">
                <label className={previewImage.length > 0 ? 'noCustom-file-upload' : 'custom-file-upload'}
                >
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