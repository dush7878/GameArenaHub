import React from 'react'
import ContestList from '../components/HomeComponent/ContestList'
import LiveContest from '../components/HomeComponent/LiveContest'

function Contests() {
  return (
    <div className='bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800'>
    <LiveContest />
    <ContestList />
    </div>

  )
}

export default Contests