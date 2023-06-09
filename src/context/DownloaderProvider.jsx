import React, { createContext, useContext, useState, useRef } from 'react'


const DownloaderContext = createContext()

export function useDownloader() {
    return useContext(DownloaderContext)
}


export function DownloaderProvider({ children }) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState({message : '', visible : false})
    const inputFieldRef = useRef()

    function showToast(message){
        setToast({message : message, visible : true})
        setTimeout(() => {
            setToast({message : '', visible : false})
        }, 2000);
    }

    async function fetchDataFromUrl(url){
      setLoading(true)
      let response = await fetch("https://downloadxapi-cely.onrender.com/youtube/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "query": url
        }
      });
      let responseData = await response.json()
  
      return responseData
    }

    async function handleSubmit(e){
        e.preventDefault()
        if(window.navigator.onLine){
          setLoading(true)
          const responseData = await fetchDataFromUrl(inputFieldRef.current.value)
          if (responseData.success === true) {
            setData(responseData.data)
            setLoading(false)
          } else {
           showToast(responseData.message)
           setLoading(false)
          }
        }else{
          showToast("You are offline")
        }
    }

    const value = {
        data,
        inputFieldRef,
        loading,
        toast,
        showToast,
        handleSubmit
    }
    return (
        <DownloaderContext.Provider value={value}>
            {children}
        </DownloaderContext.Provider>
    )
}

