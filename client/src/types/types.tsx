
export type Request = {
  id: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

export type Service = {
  id: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}



// Examples for me 
// export type PriceLevel = "PRICE_LEVEL_FREE" | "PRICE_LEVEL_INEXPENSIVE" | "PRICE_LEVEL_MODERATE" | "PRICE_LEVEL_EXPENSIVE" | "PRICE_LEVEL_VERY_EXPENSIVE" | "PRICE_LEVEL_UNSPECIFIED";

// export type  Place = {
//   displayName?: { text: string };
//   location?: { latitude: number; longitude: number };
//   photos?: { name: string }[];
//   rating?: number;
//   priceLevel: PriceLevel;
//   formattedAddress?: string;
//   userRatingCount?: number;
//   editorialSummary?: { text: string };
// }
