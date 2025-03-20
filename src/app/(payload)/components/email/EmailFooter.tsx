import { Container, Column, Hr, Img, Link, Row, Section, Text } from '@react-email/components'
import type { ContainerProps, LinkProps, TextProps } from '@react-email/components'
import { tailwindToCSS } from './utils/utils'
import {
  AHC_SITE_URL,
  AHC_DISCORD_INVITE_URL,
  DISCORD_ICON_PNG_URL,
  AHC_INSTAGRAM_URL,
  INSTAGRAM_ICON_PNG_URL,
} from '@/app/constants'

type Props = {
  containerStyles?: ContainerProps['style']
  linkStyle?: LinkProps['style']
  textStyle?: TextProps['style']
}

function EmailFooter({
  containerStyles,
  linkStyle = {
    fontSize: 24,
    color: tailwindToCSS.red700,
    textDecorationLine: 'underline',
    fontFamily: 'creepster',
  },
}: Props) {
  return (
    <Container style={containerStyles}>
      <Hr style={{ marginBlock: 24, borderTopColor: tailwindToCSS.stone300 }} />
      <Section style={{ marginBottom: 5 }}>
        <Row style={{ margin: 'auto', verticalAlign: 'middle', width: '60%' }}>
          <Column style={{ padding: 10 }}>
            <Link href={AHC_SITE_URL} style={linkStyle}>
              astoriahorrorclub.com
            </Link>
          </Column>
          <Column style={{ padding: 10 }}>
            <Link href={AHC_DISCORD_INVITE_URL}>
              <Img height={24} src={DISCORD_ICON_PNG_URL} />
            </Link>
          </Column>
          <Column style={{ padding: 10 }}>
            <Link href={AHC_INSTAGRAM_URL}>
              <Img height={24} src={INSTAGRAM_ICON_PNG_URL} />
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
  )
}

export default EmailFooter
