import React from 'react'
import './styles.css'
import SubscriberForm from './components/SubscriberForm'

export default async function HomePage() {
  return (
    <div className="home">
      <div className="content">
        <h1 className="pb-8">Astoria Horror Club</h1>
        <SubscriberForm />
      </div>
    </div>
  )
}
