import React from 'react'
import './loading.css'

const Loading = () => {
  return (
   <>
  <div className="container spinclass">
  <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
   </>
  )
}

export default Loading