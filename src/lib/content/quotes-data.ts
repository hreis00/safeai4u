/**
 * Quotes Data
 *
 * Company and founder quotes used across the SAFE AI [4U] website
 */

export interface Quote {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization?: string;
}

export const quotes: Quote[] = [
  {
    id: "founder-conscience",
    quote: "We should stop playing with AI and use it with conscience.",
    author: "David Belo",
    role: "Founder & CEO",
    organization: "SAFE AI [4U]",
  },
];

// Helper to get specific quotes
export const getQuoteById = (id: string): Quote | undefined => {
  return quotes.find((quote) => quote.id === id);
};

// Commonly used quotes
export const founderQuote = quotes[0]; // Primary founder quote

