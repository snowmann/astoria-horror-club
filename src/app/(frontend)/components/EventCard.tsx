import React from 'react'
import Image from 'next/image'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin } from 'lucide-react'

interface Event {
  id: string
  title: string
  description: string
  date: string
  image: string
  location: string
  price: string
  link: string
}

interface EventCardProps {
  event: Event
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { title, description, date, image, location, price, link } = event

  return (
    <div className="flex justify-center">
      <Card className="mb-4 max-w-2xl w-full">
        <CardHeader className="pb-1">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 pb-4 md:pb-0">
            <Image
              src={image}
              alt={title}
              width={320}
              height={160}
              className="w-full h-16 md:h-auto object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
            />
          </div>
          <div className="pl-3 w-full md:w-2/3">
            <CardDescription className="mb-2">{description}</CardDescription>
            <p className="text-gray-600 m-0">
              <strong>Date:</strong> {new Date(date).toLocaleString()}
            </p>
            <p className="text-gray-600 flex items-center">
              <strong>Location:</strong>
              {location}
            </p>
            <p className="text-gray-600">
              <strong>Price:</strong> {price}
            </p>
          </div>
        </CardContent>
        <CardFooter className="self-end">
          <a href={link} className="text-blue-500 hover:underline">
            Learn More
          </a>
        </CardFooter>
      </Card>
    </div>
  )
}

export default EventCard
