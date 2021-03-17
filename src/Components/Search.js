import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';

 export default function Search(props) {
    const nameEl = React.useRef(null);
  
    const handleSubmit = e => {
      e.preventDefault();
      alert(nameEl.current.value);
    };
  
    return (
       <form>
            <TextField onChange={handleSubmit} id="standard-basic" label="Standard" />
    
       </form>
     );
  }

  /* <label>Name:
  <input type="text" ref={nameEl} />
  </label>
  <input type="submit" name="Submit" /> 
  */