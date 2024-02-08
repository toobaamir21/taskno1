import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
const ProgressBar = ({progress}) => {
  return (
    <div>
        <LinearProgress color='inherit' variant="determinate" value={progress}  sx={{ height: '2vh', color: 'gray'}} 
      />
    </div>
  )
}

export default ProgressBar