import * as React from 'react'
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Img,
  Markdown,
} from '@react-email/components'

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
      <Head>
        <style>
          {`
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
            }
            .header {
              text-align: center;
              padding: 20px 0;
            }
            .image {
              width: 100%;
              height: auto;
            }
            .details {
              margin: 20px 0;
            }
            .details p {
              margin: 5px 0;
            }
            .content {
              margin: 20px 0;
            }
            .button {
              text-align: center;
              margin: 20px 0;
            }
          `}
        </style>
      </Head>
      <Body>
        <Container className="container">
          <Section className="header">
            <Heading as="h1">{title}</Heading>
            <Heading as="h2">{subtitle}</Heading>
          </Section>
          <Section>
            <Img src={image} alt={title} className="image" />
          </Section>
          <Section className="details">
            <Text>
              <strong>Date:</strong> {date}
            </Text>
            <Text>
              <strong>Location:</strong> {location}
            </Text>
            <Text>
              <strong>Price:</strong> {price}
            </Text>
          </Section>
          <Section className="content">
            <Markdown>{content}</Markdown>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default Events
