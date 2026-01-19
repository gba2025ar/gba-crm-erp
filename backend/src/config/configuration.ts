export const appConfig = () => ({
  app: {
    name: 'GBA CRM-ERP',
    version: '0.1.0',
  },
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    url: process.env.DATABASE_URL ?? '',
  },
});
