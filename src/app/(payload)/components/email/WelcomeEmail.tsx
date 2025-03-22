import {
  Body,
  Head,
  Heading,
  Html,
  Section,
  Tailwind,
  Container,
  Column,
  Row,
  Text,
} from '@react-email/components'
import { tailwindToCSS } from './utils/utils'
import EmailFooter from './EmailFooter'

function WelcomeEmail() {
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
            backgroundColor: tailwindToCSS.stone950,
            color: tailwindToCSS.stone200,
            maxWidth: 'none',
          }}
        >
          <Container>
            <Section style={{ marginTop: 32, textAlign: 'center' }}>
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
            </Section>
            <Section style={{ padding: '2em' }}>
              <Container style={{ backgroundColor: tailwindToCSS.stone600, padding: '1em' }}>
                <Row>
                  <Column align="center">
                    <Text>
                      Thank you for joining the Astoria Horror Club newsletter. We&apos;re happy
                      you&apos;ve decided to be a part of our community. You&apos;ll now get emails
                      for all of our events like club meetings, 16mm film screenings, parties, and
                      more.
                    </Text>
                  </Column>
                </Row>
                <Row>
                  <Column align="center">
                    <Text>
                      We love the horror genre and believe everything from the latest A24
                      blockbuster to obscure indie found-footage horror is art worth appreciating.
                    </Text>
                  </Column>
                </Row>
                <Row>
                  <Column align="center">
                    <Text>
                      Join our Discord where you can talk horror movies or anything else with
                      friendly people in our community.
                    </Text>
                  </Column>
                </Row>
              </Container>
            </Section>
            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default WelcomeEmail
