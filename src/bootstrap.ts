export default {
  register(/*{ strapi }*/) {},

  bootstrap: async ({ strapi }) => {
    if (process.env.NODE_ENV === 'development') {
      try {
        console.log('Starting seeding process...');

        // Companies
        console.log('Attempting to create companies...');
        const companies = [];
        for (const companyData of [
          { name: 'Van der Meer & Zonen B.V.', address: 'Amsterdamseweg 143, 1182 GS Amstelveen' },
          { name: 'De Jong Automatisering', address: 'Stationsplein 45, 3013 AK Rotterdam' },
          { name: 'Bakker & Dekker Consultancy', address: 'Utrechtseweg 267, 3818 EJ Amersfoort' },
          { name: 'Visser Transport', address: 'Industrieweg 78, 2382 NW Zoeterwoude' }
        ]) {
          try {
            const company = await strapi.db.query('api::company.company').create({ data: companyData });
            companies.push(company);
            console.log(`Created company: ${company.name}`);
          } catch (error) {
            console.error(`Error creating company ${companyData.name}:`, error);
          }
        }

        if (companies.length > 0) {
          console.log('Companies created successfully:', companies);

          // Jobs creation code...
        } else {
          console.log('No companies were created, skipping job creation');
        }

        console.log('Seeding completed');
      } catch (error) {
        console.error('Detailed seeding error:', error);
      }
    } else {
      console.log('Not in development environment, skipping seeding');
    }
  },
};