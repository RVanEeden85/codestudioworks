// src/lib/addons.js

const addonsByCategory = {
  global: [
    { id: "analytics", label: "Google Analytics Setup", price: 50 },
    { id: "seo-basic", label: "Basic SEO Setup", price: 90 },
  ],

  branding: [
    { id: "brand-guidelines", label: "Extended Brand Guidelines", price: 150 },
    { id: "social-templates", label: "Social Media Templates", price: 120 },
  ],

  development: [
    { id: "cms", label: "CMS Integration", price: 180 },
    { id: "performance", label: "Performance Optimisation", price: 130 },
    { id: "contactform", label: "Contact Form Integration", price: 70 },
  ],

  marketing: [
    { id: "social-setup", label: "Social Media Account Setup", price: 100 },
    { id: "ads-setup", label: "Google Ads Setup", price: 250 },
  ],

  maintenance: [
    { id: "hosting", label: "Hosting Setup", price: 25 },
    { id: "maintenance", label: "Maintenance Plan", price: 120 },
  ],
};

export default addonsByCategory;
