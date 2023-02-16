import React from 'react'

const Picture = ({ photo }) => {
  return (
    <div className='picture'>
      <p>{photo.photographer}</p>
      <div className='imageContainer'>
        <img src={photo.src.large} alt={photo.photographer} />
      </div>
      <p><a target="_blank" href={photo.src.large} rel="noreferrer">點此下載圖片</a></p>
    </div>
  )
}

export default Picture