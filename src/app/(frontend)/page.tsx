import React from 'react'
import './globals.css'
import SubscriberForm from './components/SubscriberForm'
import { SocialLinks } from './components/SocialLinks'

export default async function HomePage() {
  return (
    <div className="home">
      <div className="content">
        <SubscriberForm />
        <SocialLinks />
      </div>
    </div>
  )
}
