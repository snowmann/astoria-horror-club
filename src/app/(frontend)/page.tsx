import React from 'react'
import './globals.css'
import SubscriberForm from './components/SubscriberForm'

export default async function HomePage() {
  return (
    <div className="home">
      <div className="content">
        <SubscriberForm />
      </div>
    </div>
  )
}
