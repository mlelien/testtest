import React from 'react'

const AddParlor = () => (
  <div className='container'>
    <h1>ADD PARLOR</h1>
    <h4 className='font-weight-bold text-dark-gray'>REQUIRED</h4>
    <form>
      <div className="form-group">
        <label htmlFor="parlor-name">
          Parlor&#39;s Name
          <input
            type="text"
            className='form-control'
            id='parlor-name'
            aria-describedby='enter parlor name'
            placeholder="Enter parlor's name"
          />
        </label>
      </div>
    </form>
  </div>
)

export default AddParlor
