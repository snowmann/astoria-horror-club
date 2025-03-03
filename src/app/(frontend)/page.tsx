import React from 'react'

import './styles.css'

import Subscribe from './components/Subscribe'
export default async function HomePage() {
  return (
    <div className="home">
      <div className="content">
        <h1 className="pb-8">Astoria Horror Club</h1>
        <Subscribe />
      </div>
    </div>
  )
}
