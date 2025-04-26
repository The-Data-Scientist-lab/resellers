export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currencySymbol: string;
  features: string[];
  popular?: boolean;
  theme?: string;
  duration?: string;
  bonusPhotos?: number;
}

export interface ModelProfile {
  id: string;
  name: string;
  slug: string;
  image: string;
  gallery: string[];
  description: string;
  stats: {
    rating: number;
    recentOrders: number;
    successRate: number;
  };
  pricingPlans: PricingPlan[];
  specialTheme?: string;
  featured?: boolean;
}

export const models: ModelProfile[] = [
  {
    id: "lucky-rajor",
    name: "Lucky Rajor",
    slug: "lucky-rajor",
    image: "/images/models/luckyrajor.jpg",
    gallery: [
      "/images/models/luckyrajor.jpg",
      "/images/models/luckyrajor_gallery1.jpg",
      "/images/models/luckyrajor_gallery2.jpg"
    ],
    description: "🔥 RESELLER DEAL: Lucky Rajor's private collection! Original Price on her channel: ₹16,500 for 30-min video. Our Special Reseller Price: Just ₹449! 🎯 Get her full nude videos in crystal clear 4K quality. Her sexy body and naughty moves in these uncensored videos are worth every penny. Grab her XXX-rated content at this crazy reseller price! 💋",
    stats: {
      rating: 4.9,
      recentOrders: 346,
      successRate: 100
    },
    specialTheme: "Exclusive Red Lingerie Collection",
    pricingPlans: [
      {
        id: "lucky-basic",
        name: "Basic Plan",
        price: 449,
        currencySymbol: "₹",
        features: [
          "30 Minutes Nude Video",
          "4K quality",
          "Basic collection access",
          "Google Drive Links"
        ]
      },
      {
        id: "lucky-premium",
        name: "Premium Plan",
        price: 590,
        currencySymbol: "₹",
        popular: true,
        features: [
          "2 Nude videos (45 mins each)",
          "4K quality",
          "Premium collection",
          "15 Nude photos Bonus",
          "Google Drive Links"
        ],
        bonusPhotos: 15
      },
      {
        id: "lucky-vip",
        name: "VIP Plan",
        price: 780,
        currencySymbol: "₹",
        features: [
          "4 Nude videos (45 mins each)",
          "Exclusive Red Lingerie theme",
          "VIP collection",
          "25 Nude Photos Bonus",
          "Google Drive Links"
        ],
        theme: "Exclusive Red Lingerie",
        bonusPhotos: 25
      },
      {
        id: "lucky-full",
        name: "Full Package",
        price: 1399,
        currencySymbol: "₹",
        features: [
          "10+ Nude videos (30-45 Minutes Each)",
          "Complete collection",
          "150+ bonus photos",
          "Google Drive Links",
          "All premium content"
        ],
        bonusPhotos: 150
      }
    ],
    featured: true
  },
  {
    id: "miss-pinky",
    name: "Miss Pinky (Sana)",
    slug: "miss-pinky",
    image: "/images/models/Miss Pinky.jpg",
    gallery: [
      "/images/models/Miss Pinky.jpg",
      "/images/models/sana_gallery 2.jpg",
      "/images/models/sana_gallery1.jpg"
    ],
    description: "🔥 RESELLER OFFER: Miss Pinky's premium collection! Original Price: ₹13,000 for 30-min video. Our Reseller Price: Just ₹449! 🎯 Watch her strip out of her Black & Red Saree in full 4K quality. Her sexy curves and naughty shows will blow your mind! Get her uncensored XXX content at wholesale price! 💋",
    stats: {
      rating: 5.0,
      recentOrders: 287,
      successRate: 100
    },
    specialTheme: "Black and Red Saree videos",
    pricingPlans: [
      {
        id: "pinky-basic",
        name: "Basic Plan",
        price: 449,
        currencySymbol: "₹",
        features: [
          "30 Minutes Nude Video",
          "4K quality",
          "Basic collection access",
          "Google Drive Links"
        ]
      },
      {
        id: "pinky-premium",
        name: "Premium Plan",
        price: 590,
        currencySymbol: "₹",
        popular: true,
        features: [
          "2 Nude videos (45 mins each)",
          "4K quality",
          "Premium collection",
          "15 Nude photos Bonus",
          "Google Drive Links"
        ],
        bonusPhotos: 15
      },
      {
        id: "pinky-vip",
        name: "VIP Plan",
        price: 780,
        currencySymbol: "₹",
        features: [
          "4 Nude videos (45 mins each)",
          "Black and Red Saree theme",
          "VIP collection",
          "25 Nude Photos Bonus",
          "Google Drive Links"
        ],
        theme: "Black and Red Saree",
        bonusPhotos: 25
      },
      {
        id: "pinky-full",
        name: "Full Package",
        price: 1399,
        currencySymbol: "₹",
        features: [
          "10+ Nude videos (30-45 Minutes Each)",
          "Complete collection",
          "150+ bonus photos",
          "Google Drive Links",
          "All premium content"
        ],
        bonusPhotos: 150
      }
    ],
    featured: true
  },
  {
    id: "shanaya-katiyan",
    name: "Shanaya Katiyan",
    slug: "shanaya-katiyan",
    image: "/images/models/shanaya_katiyan.jpg",
    gallery: [
      "/images/models/shanaya_katiyan.jpg",
      "/images/models/shanaya_katiyan_gallery1.jpg",
      "/images/models/shanaya_katiyaan_gallery2.jpg"
    ],
    description: "🔥 WHOLESALE PRICE: Shanaya Katiyan's private collection! Original Price: ₹18,500 for 30-min video. Our Reseller Price: Just ₹449! 🎯 See why she's our top model as she shows off everything in 4K quality. Her sexy short dresses and naughty stripteases at incredible reseller rates! 💋",
    stats: {
      rating: 5.0,
      recentOrders: 529,
      successRate: 100
    },
    specialTheme: "Sexy and Hot Dresses",
    pricingPlans: [
      {
        id: "shanaya-basic",
        name: "Basic Plan",
        price: 449,
        currencySymbol: "₹",
        features: [
          "30 Minutes Nude Video",
          "4K quality",
          "Basic collection access",
          "Google Drive Links"
        ]
      },
      {
        id: "shanaya-premium",
        name: "Premium Plan",
        price: 590,
        currencySymbol: "₹",
        popular: true,
        features: [
          "2 Nude videos (45 mins each)",
          "4K quality",
          "Premium collection",
          "15 Nude photos Bonus",
          "Google Drive Links"
        ],
        bonusPhotos: 15
      },
      {
        id: "shanaya-vip",
        name: "VIP Plan",
        price: 780,
        currencySymbol: "₹",
        features: [
          "4 Nude videos (45 mins each)",
          "Sexy Short Dress theme",
          "VIP collection",
          "25 Nude Photos Bonus",
          "Google Drive Links"
        ],
        theme: "Sexy Short Dress",
        bonusPhotos: 25
      },
      {
        id: "shanaya-full",
        name: "Full Package",
        price: 1399,
        currencySymbol: "₹",
        features: [
          "10+ Nude videos (30-45 Minutes Each)",
          "Complete collection",
          "150+ bonus photos",
          "Google Drive Links",
          "All premium content"
        ],
        bonusPhotos: 150
      }
    ],
    featured: true
  },
  {
    id: "sassy-poonam",
    name: "Sassy Poonam",
    slug: "sassy-poonam",
    image: "/images/models/poonam.jpg",
    gallery: [
      "/images/models/poonam.jpg",
      "/images/models/sassypoonam2 gallery.jpg",
      "/images/models/sassypoonam1 gallery.jpg"
    ],
    description: "🔥 BULK DEAL: Sassy Poonam's exclusive collection! Original Price: ₹23,000 for 30-min video. Our Reseller Price: Just ₹449! 🎯 Get 3 full hours of her stripping in hot tops and mini skirts in 4K quality. Completely nude and wild videos at wholesale rates! 💋",
    stats: {
      rating: 4.8,
      recentOrders: 412,
      successRate: 100
    },
    specialTheme: "2 different Hot tops and Dresses",
    pricingPlans: [
      {
        id: "poonam-basic",
        name: "Basic Plan",
        price: 449,
        currencySymbol: "₹",
        features: [
          "30 Minutes Nude Video",
          "4K quality",
          "Basic collection access",
          "Google Drive Links"
        ]
      },
      {
        id: "poonam-premium",
        name: "Premium Plan",
        price: 590,
        currencySymbol: "₹",
        popular: true,
        features: [
          "2 Nude videos (45 mins each)",
          "4K quality",
          "Premium collection",
          "15 Nude photos Bonus",
          "Google Drive Links"
        ],
        bonusPhotos: 15
      },
      {
        id: "poonam-vip",
        name: "VIP Plan",
        price: 780,
        currencySymbol: "₹",
        features: [
          "4 Nude videos (45 mins each)",
          "Hot Tops and Mini Skirt theme",
          "VIP collection",
          "25 Nude Photos Bonus",
          "Google Drive Links"
        ],
        theme: "Hot Tops and Mini Skirt",
        bonusPhotos: 25
      },
      {
        id: "poonam-full",
        name: "Full Package",
        price: 1399,
        currencySymbol: "₹",
        features: [
          "10+ Nude videos (30-45 Minutes Each)",
          "Complete collection",
          "150+ bonus photos",
          "Google Drive Links",
          "All premium content"
        ],
        bonusPhotos: 150
      }
    ],
    featured: true
  }
];

export const getFeaturedModels = (): ModelProfile[] => {
  return models.filter(model => model.featured);
};

export const getAllModels = (): ModelProfile[] => {
  return models;
};

export const getModelBySlug = (slug: string): ModelProfile | undefined => {
  return models.find(model => model.slug === slug);
};
