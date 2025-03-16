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
import { AHC_DISCORD_INVITE_URL, AHC_SITE_URL } from '@/app/constants'

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
          <link
            href="https://fonts.googleapis.com/css2?family=Creepster&display=swap"
            rel="stylesheet"
          />
          <style>
            {`
              button:hover {
                cursor: pointer;
              }
              @media only screen and (max-width: 600px) {
                .mobile-stack {
                  display: block !important;
                  width: 100% !important;
                }
              }
            `}
          </style>
        </Head>
        <Body className="bg-stone-900 text-stone-200">
          <Container className="flex justify-center">
            <Section className="mt-[32px] text-center">
              <Row>
                <Heading
                  className="m-0 text-[40px] font-creepster leading-[36px] text-stone-50"
                  as="h1"
                >
                  ASTORIA HORROR CLUB
                </Heading>
                <Heading
                  className="my-[16px] text-[24px] font-semibold leading-[28px] text-stone-200"
                  as="h2"
                >
                  {title}
                </Heading>
              </Row>
            </Section>
            <Section className="mt-[12px]">
              <Row>
                <Column
                  className="mobile-stack box-border w-full md:w-[50%] md:pr-[8px]"
                  style={{
                    width: '50%',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                  }}
                >
                  {image && (
                    <Img
                      alt={title}
                      className="rounded-[12px] object-contain border border-stone-200"
                      src={image}
                      style={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: '100%',
                        display: 'block',
                      }}
                    />
                  )}
                </Column>
                <Column
                  className="mobile-stack box-border w-full md:w-[50%] md:pl-[8px]"
                  style={{
                    width: '50%',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                  }}
                >
                  {datetime && (
                    <Text className="mb-2">
                      <strong>Date:</strong> {formatDatetime(datetime)}
                    </Text>
                  )}
                  {location && (
                    <Text className="mb-2">
                      <strong>Location:</strong> {location}
                    </Text>
                  )}
                  {price && (
                    <Text className="mb-2">
                      <strong>Price:</strong> {price}
                    </Text>
                  )}
                  <Markdown>{content}</Markdown>
                  <div className="flex sm:jsutify-center">
                    {linkUrl && (
                      <Button
                        className="my-[16px] rounded-[8px] bg-white hover:bg-stone-100 px-[40px] py-[12px] font-semibold text-stone-900 text-center w-3/4"
                        href={linkUrl}
                      >
                        {linkText ?? 'Read more'}
                      </Button>
                    )}
                  </div>
                </Column>
              </Row>
            </Section>
            <Hr className="my-[24px] border-t-2 border-red-800" />
            <Section className="m-[16px] text-center border border-stone-50">
              <Row>
                <Column>
                  <Link
                    href={AHC_SITE_URL}
                    className="text-[24px] text-red-700 underline font-creepster"
                  >
                    astoriahorrorclub.com
                  </Link>
                  <Text className="text-[24px] flex justify-center">
                    <Img
                      className="mr-3"
                      height={24}
                      src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e3d80db9971f10a9757c99_Symbol.svg"
                    />
                    Join our
                    <Link className="text-red-600 ml-2" href={AHC_DISCORD_INVITE_URL}>
                      Discord
                    </Link>
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
