import React from 'react'
import { Link } from 'react-router-dom'

const Page404 = () => {
    return (
        <div className='container-fluid'>
            <div className='row mt-5 justify-content-center'>
                <div className='col-auto'>
                    <div id="cardMain" className="card p-4 border-danger shadow-lg text-center">
                        <div className="card-body " style={{ minWidth: 380 }}>
                            <p>404 Page Not Found.</p>
                            <p>Click <b><Link to="/home">here</Link></b> to go to Home.  </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page404