import React, { useRef, useState } from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'
import { Select, Input } from 'antd';
import {options} from '../data/Data'

function Form(props) {

  let[value, setValue] = useState('');
  let search = useRef('');
  let locationSearch = useRef('');
  let jobTypeSearch = useRef('');

  function submitHandle(e){
    e.prevetDefault();
  }

  function clickHandle(){
    props.setSearch(search.current.input.value);
    props.setLocationSearch(value);
    props.setJobTypeSearch(jobTypeSearch.current.input.value);
    search = '';
    locationSearch = '';
    jobTypeSearch = '';
    console.log('potrazi');
  }
  const onSearch = (value) => {
    setValue(value);
  };
  return (
    <div >
    <form className='flex' onSubmit={submitHandle}>
    <div className='box'>
      <span>Lokacija</span>
      <Select
      ref={locationSearch}
      showSearch
    style={{
      width: 180,
    }}
    onSelect={onSearch}
    placeholder="Lokacija"
    optionFilterProp="children"
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={options}
  />
    </div>
    <div className='box'>
      <span>Oblast posla</span>
      <Input
      ref={jobTypeSearch}
      style={{
          width: '100%',
        }}
        placeholder='Oblast rada'
        />
    </div>
    <div className='box'>
      <span>Pretraži poslodavca</span>
      <Input
      ref={search}
      style={{
          width: '100%',
        }}
        placeholder='Poslodavac'
        />
    </div>
    <div className='box'>
      <h4>Advance Filter</h4>
    </div>
    <Link to='/prakse'>
      <button className='btn1' onClick={clickHandle}>
          <i className='fa fa-search'></i>
      </button>
    </Link>
  </form>
        </div>
  )
}

export default Form
