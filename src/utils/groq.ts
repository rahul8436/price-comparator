import Groq from 'groq-sdk';
import Fuse from 'fuse.js';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// --- Hybrid Filtering Logic ---

// Local filtering: deduplicate, fuzzy match, price sort, top N
export function localFilterProducts(
  products: any[],
  query: string,
  topN: number = 10
): any[] {
  // 1. Deduplicate by normalized name + price
  const seen = new Set();
  const deduped = products.filter((p) => {
    const key = `${normalizeName(p.productName)}|${normalizePrice(p.price)}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // 2. Enhanced fuzzy match to query using fuse.js
  const fuse = new Fuse(deduped, {
    keys: ['productName'],
    threshold: 0.6, // More lenient threshold for better matching
    ignoreLocation: true,
    minMatchCharLength: 2,
    includeScore: true,
  });

  const fuzzyResults = fuse.search(query).map((r) => r.item);

  // 3. If fuzzy search returns too few results, try broader search
  if (fuzzyResults.length < Math.min(5, topN)) {
    const broaderFuse = new Fuse(deduped, {
      keys: ['productName'],
      threshold: 0.8, // Very lenient for fallback
      ignoreLocation: true,
      minMatchCharLength: 1,
    });
    const broaderResults = broaderFuse.search(query).map((r) => r.item);
    if (broaderResults.length > fuzzyResults.length) {
      return broaderResults.slice(0, topN);
    }
  }

  // 4. Price sort (ascending)
  const sorted = fuzzyResults.sort((a, b) => {
    const priceA = parseFloat((a.price || '').replace(/[^\d.]/g, '')) || 0;
    const priceB = parseFloat((b.price || '').replace(/[^\d.]/g, '')) || 0;
    return priceA - priceB;
  });

  // 5. Top N
  return sorted.slice(0, topN);
}

function normalizeName(name: string = ''): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}
function normalizePrice(price: string = ''): string {
  return price.replace(/[^\d.]/g, '');
}

export async function callGroqLLM(prompt: string): Promise<string> {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY not set');
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant for product matching and filtering. Return only valid JSON arrays.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
      max_tokens: 1024, // Reduced from 2048
      top_p: 1,
      stream: false,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Groq API error:', error);
    throw new Error(
      `Groq API error: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

// Helper to strip unnecessary fields for LLM
function minimalProductFields(products: any[]): any[] {
  return products.map((p) => ({
    name: p.productName?.substring(0, 100), // Truncate long names
    price: p.price,
    link: p.link,
    source: p.source,
  }));
}

// Hybrid: local filter, then LLM for top N, fallback to local if LLM fails or returns too few
export async function filterProductsWithLLM(
  products: any[],
  query: string,
  options?: { topN?: number; useLLM?: boolean }
): Promise<any[]> {
  const topN = options?.topN ?? 20;
  const useLLM = options?.useLLM !== false; // default true

  // 1. Local filtering
  const localFiltered = localFilterProducts(products, query, topN);

  // 2. If LLM disabled, return local
  if (!useLLM) return localFiltered;

  // 3. Try LLM on top N (minimal fields)
  try {
    const minimalProducts = minimalProductFields(localFiltered);
    // Simplified prompt to reduce token usage
    const prompt = `Filter products for query "${query}". Return JSON array sorted by price (lowest first). Include relevant matches.

Products: ${JSON.stringify(minimalProducts)}

JSON array only:`;

    const response = await callGroqLLM(prompt);
    try {
      const parsed = JSON.parse(response);
      if (Array.isArray(parsed)) {
        // Map LLM output back to full product objects using 'link' as unique key
        const localMap = new Map(localFiltered.map((p) => [p.link, p]));
        const merged = parsed.map((llmProd: any) => {
          const full = localMap.get(llmProd.link);
          return full ? full : llmProd;
        });
        // If LLM returns too few products or rate limited, fallback to local
        if (merged.length < 3) {
          console.log('LLM returned too few products, using local filtering');
          return localFiltered;
        }
        return sortProductsByPrice(merged);
      }
    } catch (parseError) {
      console.error('Failed to parse LLM response as JSON:', parseError);
    }
    // Fallback to local
    return localFiltered;
  } catch (error) {
    console.error('LLM filtering failed:', error);
    // Check if it's a rate limit error
    if (error instanceof Error && error.message.includes('rate_limit')) {
      console.log('Rate limit detected, using local filtering only');
    }
    return localFiltered;
  }
}

// Helper function to sort products by price ascending
function sortProductsByPrice(products: any[]): any[] {
  return products.sort((a, b) => {
    const priceA = parseFloat(a.price?.replace(/[^\d.]/g, '') || '0');
    const priceB = parseFloat(b.price?.replace(/[^\d.]/g, '') || '0');
    return priceA - priceB;
  });
}
