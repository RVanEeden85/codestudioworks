  let periods = {

    month: "monthly",
    once: "once-off",
    hour: "per hour"

  };



const pricing = {




  branding: {
    title: "Branding & Identity",
    items: [
      { id: "logo", name: "Logo Design", price: 250, period: "once-off", description: ["Includes 2 Revisions"] },
      { id: "brandkit", name: "Brand Kit", price: 400, period: "once-off", description: ["Includes 2 Revisions"] },
      { id: "businesscard", name: "Business Card Design", price: 80, period: "once-off", description: ["Includes 2 Revisions"] },
      { id: "socialmedia", name: "Social Media Design", price: 80, period: "once-off", description: ["Includes 2 Revisions"] }
    ]
  },

  development: {
    title: "Website & App Development",
    items: [
      { id: "wordpress", name: "WordPress Website", price: 800, prefix: "From", period: "once-off", description: ["Includes 2 Revisions"] },
      { id: "custom", name: "Custom Coded Website (Next.js)", price: 1200, prefix: "From", period: "once-off", description: ["Includes 2 Revisions"]  },
      { id: "ecommerce", name: "E-commerce Store", price: 1500, prefix: "From", period: "once-off", description: ["Includes 2 Revisions"]  }
    ]
  },

  marketing: {
    title: "Digital Marketing",
    items: [
      { id: "seo", name: "SEO Setup", price: 300, period: periods.once, description: ["Up to 5 pages"] },
      { id: "googleads", name: "Google Ads Setup", price: 250, period: periods.once, description: ["1 Campaign Setup", "Keyword Research", "Excludes Spending Budget"] },
      { id: "facebookads", name: "Facebook Ads Setup", price: 250, period: periods.once, description: ["1 Campaign Setup", "Creative Design", "Excludes Spending Budget"] },
      { id: "socialmedia", name: "Social Media Management", price: 400, period: periods.month, description: ["1 Social Network Included", "Up to 10 Posts", "Virtual Meetings"] }
    ]
  },

  maintenance: {
    title: "Web Maintenance",
    items: [
      { id: "hosting", name: "Web Hosting & Security", price: 45, period: "monthly", prefix: "From" },
      { id: "maintenanceplan", name: "Web Maintenance Plan", price: 120, period: "monthly" },
      { id: "hourlymaintenance", name: "Web Maintenance Hourly", price: 40, period: periods.hour },
      { id: "contentupdates", name: "Web Content Updates", price: 40, period: "per hour" },

    ]
  },

  itsupport : {
    title: "IT Support",
    items: [
      {id: "itsupport", name: "Remote IT Support", price: 45, period: periods.hour, description: ["Requires Teamviewer", "Requires Internet Connection"]},
    ]
  }

};

export default pricing;
