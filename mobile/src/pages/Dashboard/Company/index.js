import React, { useState, useEffect } from 'react';

import ExternalLink from '../../../components/ExternalLink';

import background from '../../../assets/background-gray.png';

import {
  BackgroundContainer,
  BackgroundImage,
} from '../../../components/Background';

import {
  Container,
  CompanyBox,
  CategoryImage,
  CompanyImage,
  CompanyName,
  PhoneTitle,
  PhoneText,
  WhatsappTitle,
  WhatsappText,
  EmailTitle,
  EmailText,
  FacebookTitle,
  FacebookText,
  InstagramTitle,
  InstagramText,
  SiteTitle,
  SiteLink,
  AddressTitle,
  AddressText,
  DescriptionTitle,
  DescriptionText,
  DiscountTitle,
  DiscountText,
} from './styles';

export default function Company({ route, navigation }) {
  const { item, cat } = route.params;
  console.tron.log(cat);
  const [company, setCompany] = useState({});

  useEffect(() => {
    setCompany(item);
    navigation.setOptions({ title: `${item.name}` });
  }, []);

  return (
    <BackgroundContainer>
      <BackgroundImage source={background} />
      <Container>
        <CompanyBox>
          {item.logo ? (
            <CompanyImage
              source={{
                uri: `http://192.168.0.13:3333/files/${item.logo.path}`,
              }}
            />
          ) : (
            <>
              <CategoryImage
                source={{
                  uri: `http://192.168.0.13:3333/files/${cat.logo.path}`,
                }}
              />
              <CompanyName>{item.name}</CompanyName>
            </>
          )}
          {company.phone ? (
            <>
              <PhoneTitle>Telefone:</PhoneTitle>
              <PhoneText>{company.phone}</PhoneText>
            </>
          ) : null}
          {company.whatsapp ? (
            <>
              <WhatsappTitle>Whatsapp:</WhatsappTitle>
              <WhatsappText>{company.whatsapp}</WhatsappText>
            </>
          ) : null}
          {company.email ? (
            <>
              <EmailTitle>E-mail:</EmailTitle>
              <EmailText>{company.email}</EmailText>
            </>
          ) : null}
          {company.facebook ? (
            <>
              <FacebookTitle>Facebook:</FacebookTitle>
              <FacebookText>{company.facebook}</FacebookText>
            </>
          ) : null}
          {company.instagram ? (
            <>
              <InstagramTitle>Instagram:</InstagramTitle>
              <InstagramText>{company.instagram}</InstagramText>
            </>
          ) : null}
          {company.website ? (
            <>
              <SiteTitle>Site:</SiteTitle>
              <SiteLink>
                <ExternalLink url={`http://${company.website}`}>
                  {company.website}
                </ExternalLink>
              </SiteLink>
            </>
          ) : null}

          {company.street === !null &&
          company.number === !null &&
          company.district === !null &&
          company.city === !null &&
          company.state === !null ? (
            <>
              <AddressTitle>Endereço:</AddressTitle>
              <AddressText>
                {company.street ? `${company.street}` : null}
                {''}
                {company.number ? ` - ${company.number}` : null}
                {''}
                {company.district ? ` - ${company.district}` : null}
                {''}
                {company.city ? ` - ${company.city}` : null}
                {''}
                {company.state ? ` - ${company.state}` : null}
              </AddressText>
            </>
          ) : null}

          <DescriptionTitle>Descrição:</DescriptionTitle>
          <DescriptionText>{company.description}</DescriptionText>
          {company.discount ? (
            <>
              <DiscountTitle>Desconto para Associados:</DiscountTitle>
              <DiscountText>{company.discount}</DiscountText>
            </>
          ) : null}
        </CompanyBox>
      </Container>
    </BackgroundContainer>
  );
}
