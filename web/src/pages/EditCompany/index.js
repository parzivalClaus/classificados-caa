import React, { useState } from 'react';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import SideMenu from '~/components/SideMenu';

import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import PhoneInput from '~/components/PhoneInput';
import InputMask from 'react-input-mask';
import history from '~services/history';

import api from '~/services/api';

import LogoInput from './LogoInput';

import {
  Container,
  StyledButton,
  Content,
  Header,
  CustomAsyncSelect,
} from './styles';

function EditCompany({ history: navigation }) {
  const { company } = navigation.location.state;
  const [phone, setPhone] = useState(company && company.phone);
  const [whatsapp, setWhatsapp] = useState(company && company.whatsapp);
  const [category, setCategory] = useState(company && company.category);
  const [loading, setLoading] = useState(false);
  const [zipCode, setZipCode] = useState(company && company.zipcode);

  async function loadCategories(q) {
    const res = await api.get(`categories`);

    return new Promise((resolve) => {
      resolve(
        res.data.rows.map((st) => {
          return {
            value: st.id,
            label: st.name,
            ...st,
          };
        })
      );
    });
  }

  async function handleSubmit(data) {
    let errors = 0;

    if (category === null || category === '') {
      toast.error('A categoria precisa ser selecionada.');
      errors += 1;
    }

    if (errors >= 1) return;

    try {
      setLoading(true);
      await api.put(`/company/${company.id}`, {
        active: true,
        category,
        name: data.name,
        phone,
        whatsapp,
        email: data.email,
        website: data.website,
        instagram: data.instagram,
        facebook: data.facebook,
        number: data.number,
        street: data.street,
        district: data.district,
        city: data.city,
        state: data.state,
        zipcode: zipCode,
        description: data.description,
        discount: data.discount,
        logo_id: data.logo_id,
      });

      setLoading(false);
      toast.success('A empresa foi editada e ativada com sucesso!');
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container>
      <SideMenu />
      <Content>
        <Form initialData={company} onSubmit={handleSubmit}>
          <Header>
            <p>Editar Empresa</p>
            <div className="headerButtons">
              <StyledButton
                onClick={() => history.push('/pending-companies')}
                type="button"
              >
                <MdKeyboardArrowLeft size={20} color="#fff" />
                VOLTAR
              </StyledButton>
              <StyledButton type="submit">
                <MdCheck size={20} color="#fff" />
                {loading ? 'SALVANDO...' : 'SALVAR'}
              </StyledButton>
            </div>
          </Header>
          <Content>
            <div className="logo">
              <LogoInput name="logo_id" />
            </div>
            <div class="company-data">
              <div className="column-company">
                <h3>Dados da Empresa</h3>
                <div className="data">
                  <span>Nome</span>
                  <Input name="name" type="text" placeholder="John Doe" />
                </div>

                <div>
                  <span>Categoria</span>
                  <CustomAsyncSelect
                    isSearchable
                    defaultOptions
                    loadOptions={(e) => loadCategories(e)}
                    defaultValue={{
                      label: company ? company.category : '',
                      value: company ? company.category : '',
                    }}
                    onChange={(e) => setCategory(e)}
                    placeholder=""
                    name="category"
                  />
                </div>

                <div className="data">
                  <span>Telefone</span>
                  <PhoneInput
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="data">
                  <span>Celular / Whatsapp</span>
                  <PhoneInput
                    name="whatsapp"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                  />
                </div>

                <div className="data">
                  <span>E-mail</span>
                  <Input
                    name="email"
                    type="email"
                    placeholder="exemplo@fastfeet.com"
                  />
                </div>

                <div className="data">
                  <span>Site</span>
                  <Input
                    name="website"
                    placeholder="www.clubearamacan.com.br"
                  />
                </div>

                <div className="data">
                  <span>Instagram</span>
                  <Input name="instagram" placeholder="@aramacan" />
                </div>

                <div className="data">
                  <span>Facebook</span>
                  <Input name="facebook" placeholder="/aramacan" />
                </div>

                <div className="data">
                  <span>Descrição</span>
                  <Input
                    multiline
                    rows={4}
                    name="description"
                    placeholder="Descrição da empresa..."
                  />
                </div>

                <div className="data">
                  <span>Desconto</span>
                  <Input name="discount" placeholder="Desconto" />
                </div>
              </div>

              <div className="column-company">
                <h3>Endereço</h3>
                <div className="data">
                  <span>Rua</span>
                  <Input
                    name="street"
                    type="text"
                    placeholder="Rua São Pedro"
                  />
                </div>

                <div className="data">
                  <span>Número</span>
                  <Input name="number" placeholder="160" />
                </div>

                <div className="data">
                  <span>Bairro</span>
                  <Input name="district" placeholder="Silveira" />
                </div>

                <div className="data">
                  <span>Cidade</span>
                  <Input name="city" placeholder="Santo André" />
                </div>

                <div className="data">
                  <span>Estado</span>
                  <Input name="state" placeholder="SP" />
                </div>

                <div className="data">
                  <span>CEP</span>
                  <InputMask
                    name="cep"
                    placeholder="09131-390"
                    mask="99999-999"
                    maskChar=" "
                    alwaysShowMask={false}
                    value={zipCode}
                    onChange={(e) => [setZipCode(e.target.value)]}
                  />
                </div>
              </div>
            </div>
          </Content>
        </Form>
      </Content>
    </Container>
  );
}

export default EditCompany;
