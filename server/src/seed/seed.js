require('dotenv').config();
const mongoose = require('mongoose');
const Template = require('../models/Template');

const img = (seed) => `https://picsum.photos/seed/${seed}/600/400`;

const templates = [
  { name: 'SaaS Landing Page', description: 'Conversion-focused landing page with hero, pricing and testimonials.', thumbnail_url: img('saas-landing'), category: 'Landing Page' },
  { name: 'Admin Dashboard', description: 'Responsive admin panel with charts, tables and dark mode.', thumbnail_url: img('admin-dash'), category: 'Dashboard' },
  { name: 'Developer Portfolio', description: 'Minimal portfolio to showcase projects, skills and contact info.', thumbnail_url: img('dev-portfolio'), category: 'Portfolio' },
  { name: 'E-commerce Storefront', description: 'Product grid, cart drawer and checkout flow ready to customise.', thumbnail_url: img('ecommerce'), category: 'E-commerce' },
  { name: 'Blog / Magazine', description: 'Clean typography-first blog layout with categories and search.', thumbnail_url: img('blog-mag'), category: 'Blog' },
  { name: 'Analytics Dashboard', description: 'KPI cards, funnel charts and real-time activity widgets.', thumbnail_url: img('analytics'), category: 'Dashboard' },
  { name: 'Startup Pitch Page', description: 'One-page pitch layout with team, roadmap and investor CTA.', thumbnail_url: img('pitch'), category: 'Landing Page' },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Template.deleteMany({});
    await Template.insertMany(templates);
    console.log(`Seeded ${templates.length} templates`);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
