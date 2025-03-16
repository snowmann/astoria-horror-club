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
  Link,
  Hr,
} from '@react-email/components'
import {
  AHC_DISCORD_INVITE_URL,
  AHC_INSTAGRAM_URL,
  AHC_SITE_URL,
  DISCORD_ICON_SVG_URL,
  INSTAGRAM_ICON_SVG_URL,
} from '@/app/constants'
import { useState } from 'react'

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

const tailwindToCSS = {
  red700: '#c10007',
  stone100: '#f5f5f4',
  stone200: '#e7e5e4',
  stone300: '#d6d3d1',
  stone900: '#1c1917',
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
  const [buttonHover, setButtonHover] = useState(false)

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
        <Body style={{ backgroundColor: tailwindToCSS.stone900, color: tailwindToCSS.stone200 }}>
          <Container width={'95%'} style={{ marginBottom: '2.5rem' }} className="mb-10">
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
            <Hr style={{ marginBlock: 24, borderTopColor: tailwindToCSS.stone300 }} />
            <Section style={{ marginBottom: 5 }}>
              <Row style={{ margin: 'auto', verticalAlign: 'middle', width: '60%' }}>
                <Column style={{ padding: 10 }}>
                  <Link
                    href={AHC_SITE_URL}
                    style={{
                      fontSize: 24,
                      color: tailwindToCSS.red700,
                      textDecorationLine: 'underline',
                      fontFamily: 'creepster',
                    }}
                  >
                    astoriahorrorclub.com
                  </Link>
                </Column>
                <Column style={{ padding: 10 }}>
                  <Link href={AHC_DISCORD_INVITE_URL}>
                    <Img height={24} src={DISCORD_ICON_SVG_URL} />
                  </Link>
                </Column>
                <Column style={{ padding: 10 }}>
                  <Link href={AHC_INSTAGRAM_URL}>
                    <Img height={24} src={INSTAGRAM_ICON_SVG_URL} />
                  </Link>
                </Column>
              </Row>
            </Section>
            <Section>
              <Row>
                <Column align="center">
                  <Text style={{ fontSize: 14, margin: 0, color: tailwindToCSS.stone300 }}>
                    © 2021 Astoria Horror Club
                  </Text>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default EventsEmailTemplate
