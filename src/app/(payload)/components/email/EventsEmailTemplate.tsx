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
        <Body className="bg-stone-900 text-stone-200">
          <Container width={'95%'}>
            <Section className="mt-[32px] text-center">
              <Row>
                <Heading
                  className="m-0 text-[40px] font-creepster leading-[36px] text-stone-100"
                  as="h1"
                  style={{ fontFamily: 'creepster' }}
                >
                  ASTORIA HORROR CLUB
                </Heading>
                <Heading
                  className="my-[24px] text-[24px] font-semibold leading-[28px] text-stone-200"
                  as="h2"
                >
                  {title}
                </Heading>
              </Row>
            </Section>
            <Section>
              <Row>
                <Column align="center" className="box-border w-1/2 margin-y-auto">
                  {image && (
                    <Img
                      alt={title}
                      className="rounded-[12px] object-contain border border-stone-200 h-[30rem]"
                      src={image}
                    />
                  )}
                </Column>
              </Row>
              <Row>
                <Column className="box-border w-full">
                  <Markdown markdownContainerStyles={{ marginBottom: '2em' }}>{content}</Markdown>
                  {datetime && (
                    <Text className="mb-2 text-[14px]">
                      <strong>Date:</strong> {formatDatetime(datetime)}
                    </Text>
                  )}
                  {location && (
                    <Text className="mb-2 text-[14px]">
                      <strong>Location:</strong> {location}
                    </Text>
                  )}
                  {price && (
                    <Text className="mb-2 text-[14px]">
                      <strong>Price:</strong> {`$${price}`}
                    </Text>
                  )}
                  <div>
                    {linkUrl && (
                      <Button
                        className="my-[16px] rounded-[8px] bg-stone-100 hover:bg-stone-100 px-[40px] py-[12px] font-semibold text-stone-900 text-center w-3/4"
                        href={linkUrl}
                      >
                        {linkText ?? 'Read more'}
                      </Button>
                    )}
                  </div>
                </Column>
              </Row>
            </Section>
            <Hr className="my-[24px] border-t-2" />
            <Section className="border mb-10">
              <Row className="m-auto align-middle w-3/5">
                <Column className="p-[10px]">
                  <Link
                    href={AHC_SITE_URL}
                    className="text-[24px] text-red-700 underline font-creepster"
                  >
                    astoriahorrorclub.com
                  </Link>
                </Column>
                <Column className="p-[10px]">
                  <Link href={AHC_DISCORD_INVITE_URL}>
                    <Img height={24} src={DISCORD_ICON_SVG_URL} />
                  </Link>
                </Column>
                <Column className="p-[10px]">
                  <Link href={AHC_INSTAGRAM_URL}>
                    <Img height={24} src={INSTAGRAM_ICON_SVG_URL} />
                  </Link>
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
