import React from 'react'
import NavBar from '../components/NavBar'
import { useDownloader } from '../context/DownloaderProvider'
import Toast from '../components/Toast'

export default function HomePage() {
    const { inputFieldRef, loading, data, toast, handleSubmit } = useDownloader()

    return (
        <>
            <Toast message={toast.message} visible={toast.visible}></Toast>
            <NavBar title={"Download-X"}></NavBar>
            <div className="container">
                <div className="row justify-content-center py-3">

                    <div className="col col-lg-6">
                        <form className='d-grid gap-2' onSubmit={handleSubmit}>
                            <input ref={inputFieldRef} required={true} disabled={loading} type="url" className='form-control' placeholder='Paste link here...' />
                            <button type='submit' className='btn btn-primary' disabled={loading}>{loading ? "Loading..." : "Search"}</button>
                        </form>

                        {
                            data === null ? <div className='muted text-center mt-2 border rounded p-3 fw-light text-danger'>
                                Download-X is under developement so for now you can download only YouTube video in 360p and 720p formats. Other platforms and YouTube resolutions will be added soon.
                            </div> : <div className='d-grid gap-2 my-3'>
                                <div className='d-grid gap-2 border rounded p-2'>
                                    <img src={data.thumbnailStreams[data.thumbnailStreams.length - 1].url} alt="" className='w-100 rounded' loading='lazy'/>
                                    <small className='fw-semibold'>{data.videoDetails.channelName}</small>
                                    <h4>{data.videoDetails.title}</h4>
                                </div>

                                
                                    <div className="list-group">
                                        <div type="button" className="list-group-item" disabled><h5>Video</h5></div>
                                        {
                                            data.videoStreams.map((e, index) => {
                                                return (
                                                    <a href={e.url} target='_blank' rel='noreferrer' key={index} type="button" className="list-group-item list-group-item-action">
                                                        <h6>{e.resolution}</h6>
                                                        <span>{e.fileSize}</span>
                                                    </a>
                                                )
                                            })
                                        }

                                    </div>
                                
                                
                                    <div className="list-group">
                                        <div type="button" className="list-group-item" disabled><h5>Audio</h5></div>
                                        {
                                            data.audioStreams.map((e, index) => {
                                                return (
                                                    <a href={e.url} target='_blank' rel='noreferrer' key={index} type="button" className="list-group-item list-group-item-action">
                                                        <h6>{e.audioQuality}</h6>
                                                        <span>{e.fileSize}</span>
                                                    </a>
                                                )
                                            })
                                        }
                                    </div>
                                

                            </div>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}
