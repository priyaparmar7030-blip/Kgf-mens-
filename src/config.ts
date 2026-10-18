export interface StoreConfig {
  name: string;
  headerTitle: string;
  headerSubtitle: string;
  phone: string;
  phoneDisplay: string;
  whatsappUrl: string;
  googleReviewUrl: string;
  googleMapsUrl: string;
  address: string;
  instagramUrl: string;
  instagramUsername: string;
}

export const STORE_CONFIG: StoreConfig = {
  name: 'KGF Mens Fashion Club',
  headerTitle: 'KGF MENS FASHION CLUB',
  headerSubtitle: 'YOUR EXPERIENCE MATTERS',
  phone: '+918459147775',
  phoneDisplay: '+91 84591 47775',
  whatsappUrl: 'https://wa.me/918459147775',
  googleReviewUrl: 'https://g.page/r/CdTtJA87_AdSEBI/review',
  googleMapsUrl: 'https://maps.app.goo.gl/26z2JJZ3w7sELg7C9?g_st=ac',
  address: 'Shriram Tower, Ratnlal Plot Chowk, Akola, Maharashtra',
  // Official Instagram URL & username
  instagramUrl: 'https://www.instagram.com/kgf_nx/',
  instagramUsername: '@kgf_nx',
};

export const INSTAGRAM_STORAGE_KEY = 'kgf_custom_instagram_url';

/**
 * Returns the verified official Instagram profile URL: https://www.instagram.com/kgf_nx/
 * Cleanses any stale placeholder values (like https://instagram.com/ or empty)
 */
export function getInstagramProfileUrl(): string {
  try {
    const saved = localStorage.getItem(INSTAGRAM_STORAGE_KEY);
    if (!saved || saved.trim() === '' || saved === 'https://instagram.com/' || saved === 'https://instagram.com') {
      localStorage.setItem(INSTAGRAM_STORAGE_KEY, STORE_CONFIG.instagramUrl);
      return STORE_CONFIG.instagramUrl;
    }
    return saved;
  } catch {
    return STORE_CONFIG.instagramUrl;
  }
}

export function saveInstagramUrl(url: string): void {
  try {
    const cleanUrl = url.trim() || STORE_CONFIG.instagramUrl;
    localStorage.setItem(INSTAGRAM_STORAGE_KEY, cleanUrl);
  } catch (err) {
    console.error('Failed to save Instagram URL:', err);
  }
}

export const STANDOUT_HIGHLIGHTS = [
  'Fabric & Material Quality',
  'Fitting & Tailoring Precision',
  'Customer Service & Hospitality',
  'Wedding & Festive Sherwani Collection',
  'Suits & Blazer Variety',
  'Formal Shirts & Trousers',
  'Casual & Streetwear Collection',
  'Pricing & Value',
  'Store Ambiance',
];

/**
 * Generates an honest, truthful review draft based on the selected star rating and optional user-selected highlights.
 * Never invents fake personal stories or details.
 */
export function generateReviewDraft(rating: number, selectedHighlights: string[], customComment: string): string {
  const highlightsPhrase = selectedHighlights.length > 0 
    ? `Particularly appreciated their ${selectedHighlights.join(', ')}. ` 
    : '';
  const customPhrase = customComment.trim() ? `Note: ${customComment.trim()} ` : '';

  switch (rating) {
    case 5:
      return `Outstanding experience at KGF Mens Fashion Club in Akola! The menswear collection is truly top-tier. ${highlightsPhrase}${customPhrase}Highly recommended to anyone looking for premium suits, wedding wear, and stylish men's clothing at Shriram Tower, Ratnlal Plot Chowk.`;
    case 4:
      return `Very good experience shopping at KGF Mens Fashion Club, Akola. The collection and quality are impressive. ${highlightsPhrase}${customPhrase}A solid recommendation for quality men's fashion and wedding wear in the city.`;
    case 3:
      return `Decent experience at KGF Mens Fashion Club, Akola. ${highlightsPhrase}${customPhrase}Good collection overall, with some areas that could be even better in terms of stock variety or service pace.`;
    case 2:
      return `My recent visit to KGF Mens Fashion Club, Akola had a few shortcomings. ${highlightsPhrase}${customPhrase}Sharing this honest feedback so the team can look into stock availability and service improvements.`;
    case 1:
      return `Was not satisfied with my experience at KGF Mens Fashion Club, Akola. ${highlightsPhrase}${customPhrase}Sharing this feedback so the management can address the service and customer experience.`;
    default:
      return `Visited KGF Mens Fashion Club at Shriram Tower, Ratnlal Plot Chowk, Akola. ${highlightsPhrase}${customPhrase}`;
  }
}
