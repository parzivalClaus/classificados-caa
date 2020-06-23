module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'categories',
      [
        {
          logo_id: 1,
          name: 'Presentes',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 2,
          name: 'Advocacia',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 3,
          name: 'Alimentação',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 4,
          name: 'Artes, Foto e Vídeo',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 5,
          name: 'Assistência e Manutenção',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 6,
          name: 'Automotivo',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 7,
          name: 'Consultorias, Coachings e Palestrantes',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 8,
          name: 'Educação e Ensino',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 9,
          name: 'Estética e Beleza',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 10,
          name: 'Imobiliário',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 11,
          name: 'Limpeza',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 12,
          name: 'Materiais Esportivos',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 13,
          name: 'Medicina e Saúde',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 14,
          name: 'Mercado',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 15,
          name: 'Moda, Roupas e Acessórios',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 16,
          name: 'Pets',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 17,
          name: 'Serviços',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          logo_id: 18,
          name: 'Viagens e Turismo',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('categories', null, {});
  },
};
