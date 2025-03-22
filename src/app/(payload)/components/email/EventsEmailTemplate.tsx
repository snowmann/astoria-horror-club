import { formatDatetime } from '@/utils/formatDatetime'

import {
  Tailwind,
  Section,
  Img,
  Text,
  Heading,
  Button,
  Markdown,
  Container,
  Row,
  Column,
  Html,
  Head,
  Body,
} from '@react-email/components'
import { tailwindToCSS } from './utils/utils'
import EmailFooter from './EmailFooter'

type Props = {
  title: string
  datetime: string
  image: string
  location: string
  price: string
  content: string
  linkUrl?: string
  linkText?: string
}

function EventsEmailTemplate({
  title,
  datetime,
  image,
  location,
  price,
  content,
  linkUrl,
  linkText,
}: Props) {
  return (
    <Html lang="en">
      <Tailwind
        config={{
          theme: {
            fontFamily: {
              creepster: ['Creepster', 'system-ui'],
              mono: ['Roboto Mono', 'monospace'],
            },
          },
        }}
      >
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Creepster&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Body
          style={{
            backgroundColor: tailwindToCSS.stone900,
            color: tailwindToCSS.stone200,
            maxWidth: 'none',
          }}
        >
          <Section style={{ marginTop: 32, textAlign: 'center' }}>
            <Row>
              <Heading
                style={{
                  margin: 0,
                  fontSize: 40,
                  fontFamily: 'creepster',
                  color: tailwindToCSS.stone100,
                }}
                as="h1"
              >
                ASTORIA HORROR CLUB
              </Heading>
              <Heading
                style={{
                  marginBlock: 24,
                  fontSize: 24,
                  fontWeight: 600,
                  color: tailwindToCSS.stone200,
                }}
                as="h2"
              >
                {title}
              </Heading>
            </Row>
          </Section>
          <Container width={'95%'} style={{ marginBottom: '2.5rem' }} className="mb-10">
            <Section>
              <Row>
                <Column
                  align="center"
                  style={{
                    boxSizing: 'border-box',
                    width: '50%',
                    marginBlock: 'auto',
                  }}
                >
                  {image && (
                    <Img
                      alt={title}
                      style={{
                        borderRadius: 12,
                        height: '30rem',
                        objectFit: 'contain',
                        marginBottom: 18,
                      }}
                      src={image}
                    />
                  )}
                </Column>
              </Row>
              <Row>
                <Column style={{ width: '100%', boxSizing: 'border-box' }}>
                  <Markdown markdownContainerStyles={{ marginBottom: '2em' }}>{content}</Markdown>
                  {datetime && (
                    <Text style={{ marginBottom: 2, fontSize: 14 }}>
                      <strong>Date:</strong> {formatDatetime(datetime)}
                    </Text>
                  )}
                  {location && (
                    <Text style={{ marginBottom: 2, fontSize: 14 }}>
                      <strong>Location:</strong> {location}
                    </Text>
                  )}
                  {price && (
                    <Text style={{ marginBottom: 2, fontSize: 14 }}>
                      <strong>Price:</strong> {`$${price}`}
                    </Text>
                  )}
                </Column>
              </Row>
              <Row>
                <Column align="center">
                  {linkUrl && (
                    <Button
                      style={{
                        marginBlock: 15,
                        borderRadius: 8,
                        backgroundColor: tailwindToCSS.stone100,
                        paddingInline: 40,
                        paddingBlock: 12,
                        fontWeight: 600,
                        color: tailwindToCSS.stone900,
                        textAlign: 'center',
                        width: '50%',
                      }}
                      href={linkUrl}
                    >
                      {linkText ?? 'Read more'}
                    </Button>
                  )}
                </Column>
              </Row>
            </Section>
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default EventsEmailTemplate
