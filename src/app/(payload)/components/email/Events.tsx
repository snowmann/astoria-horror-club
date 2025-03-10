import * as React from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Img,
  Markdown,
  Tailwind,
} from '@react-email/components'
import { formatDate } from '../../../../utils/formatDate'

interface EventProps {
  title: string
  subtitle: string
  date: string
  image: string
  location: string
  price: string
  content: string
  url: string
}

export function Events(props: EventProps) {
  const { title, subtitle, date, image, location, price, content } = props

  return (
    <Html lang="en">
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#007291',
              },
            },
          },
        }}
      >
        <Head />
        <Body className="bg-black text-white font-sans">
          <Container className="max-w-2xl mx-auto p-5 bg-black text-white">
            <div className="text-center py-5">
              <Heading as="h1" className="text-3xl font-bold">
                {title}
              </Heading>
              <Heading as="h2" className="text-xl">
                {subtitle}
              </Heading>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="w-full md:w-1/3 pb-4 md:pb-0">
                <Img
                  src={image}
                  alt={title}
                  className="w-full h-48 md:h-64 object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
                />
              </div>
              <div className="pl-3 w-full md:w-2/3">
                <Text className="mb-2">
                  <strong>Date:</strong> {formatDate(date)}
                </Text>
                <Text className="mb-2">
                  <strong>Location:</strong> {location}
                </Text>
                <Text className="mb-2">
                  <strong>Price:</strong> {price}
                </Text>
                <Markdown markdownContainerStyles={{ color: 'white' }}>{content}</Markdown>
              </div>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default Events
