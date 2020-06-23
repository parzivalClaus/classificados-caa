module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'files',
      [
        {
          name: 'presentes.png',
          path: 'presentes.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'advocacia.png',
          path: 'advocacia.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'alimentacao.png',
          path: 'alimentacao.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'artes_foto_video.png',
          path: 'artes_foto_video.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'assistencia_manutencao.png',
          path: 'assistencia_manutencao.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'automotivo.png',
          path: 'automotivo.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'consultorias_coaching.png',
          path: 'consultorias_coaching.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'educacao.png',
          path: 'educacao.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'estetica_beleza.png',
          path: 'estetica_beleza.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'imobiliario.png',
          path: 'imobiliario.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'limpeza.png',
          path: 'limpeza.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'materiais_esportivos.png',
          path: 'materiais_esportivos.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'medicina_saude.png',
          path: 'medicina_saude.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'mercado.png',
          path: 'mercado.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'moda_roupas.png',
          path: 'moda_roupas.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'pets.png',
          path: 'pets.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'servicos.png',
          path: 'servicos.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'viagens_turismo.png',
          path: 'viagens_turismo.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('files', null, {});
  },
};
