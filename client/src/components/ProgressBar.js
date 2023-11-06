import React from 'react'
const colors=[
  'rgb(255,214,161)',
  'rgb(255,175,161)',
  'rgb(55,14,91)',
  'rgb(145,181,161)',
]
const randomColor=colors[Math.floor(Math.random()*colors.length)]
const ProgressBar = ({progress}) => {

  return (
    <div className="outer-bar">
      <div className="inner-bar"
       style={{ width:`${progress} px`,backgroundColor:randomColor}}>
</div>
    </div>
  )
}

export default ProgressBar