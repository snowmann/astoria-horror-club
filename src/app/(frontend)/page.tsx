import React from 'react'
import './styles.css'
import SubscriberForm from './components/SubscriberForm'
import Header from './components/Header'

export default async function HomePage() {
  return (
    <div className="home">
      <Header />
      <div className="content">
        <SubscriberForm />
      </div>
    </div>
  )
}
