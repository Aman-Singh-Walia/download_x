import React from 'react'

export default function Toast({message, visible}) {
  return (
    <div className={`w-50 border rounded p-2 text-center mx-auto fixed-bottom my-4 bg-dark text-light ${visible? 'd-block' : 'd-none'}`} >{message}</div>
  )
}
