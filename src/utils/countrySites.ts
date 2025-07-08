export interface SiteConfig {
  name: string;
  url: string;
  scraperClass: string;
  enabled: boolean;
  priority: number; // Lower number = higher priority
  categories?: string[]; // Product categories this site specializes in
}

export interface CountryConfig {
  name: string;
  code: string;
  currency: string;
  sites: SiteConfig[];
}

export const countryConfigs: CountryConfig[] = [
  {
    name: 'United States',
    code: 'US',
    currency: 'USD',
    sites: [
      { name: 'Amazon US', url: 'https://www.amazon.com', scraperClass: 'AmazonScraper', enabled: true, priority: 1 },
      { name: 'BestBuy', url: 'https://www.bestbuy.com', scraperClass: 'BestBuyScraper', enabled: true, priority: 2 },
      { name: 'eBay', url: 'https://www.ebay.com', scraperClass: 'EbayScraper', enabled: true, priority: 3 },
      { name: 'Walmart', url: 'https://www.walmart.com', scraperClass: 'WalmartScraper', enabled: true, priority: 4 },
      { name: 'Newegg', url: 'https://www.newegg.com', scraperClass: 'NeweggScraper', enabled: true, priority: 5, categories: ['electronics', 'computers'] },
      { name: 'Target', url: 'https://www.target.com', scraperClass: 'TargetScraper', enabled: false, priority: 6 },
      { name: 'Home Depot', url: 'https://www.homedepot.com', scraperClass: 'HomeDepotScraper', enabled: false, priority: 7, categories: ['home', 'tools'] },
    ]
  },
  {
    name: 'India',
    code: 'IN',
    currency: 'INR',
    sites: [
      { name: 'Amazon IN', url: 'https://www.amazon.in', scraperClass: 'AmazonScraper', enabled: true, priority: 1 },
      { name: 'Flipkart', url: 'https://www.flipkart.com', scraperClass: 'FlipkartScraper', enabled: true, priority: 2 },
      { name: 'Myntra', url: 'https://www.myntra.com', scraperClass: 'MyntraScraper', enabled: false, priority: 3, categories: ['fashion', 'clothing'] },
      { name: 'Nykaa', url: 'https://www.nykaa.com', scraperClass: 'NykaaScraper', enabled: false, priority: 4, categories: ['beauty', 'cosmetics'] },
      { name: 'Croma', url: 'https://www.croma.com', scraperClass: 'CromaScraper', enabled: false, priority: 5, categories: ['electronics'] },
    ]
  },
  {
    name: 'United Kingdom',
    code: 'UK',
    currency: 'GBP',
    sites: [
      { name: 'Amazon UK', url: 'https://www.amazon.co.uk', scraperClass: 'AmazonScraper', enabled: true, priority: 1 },
      { name: 'Argos', url: 'https://www.argos.co.uk', scraperClass: 'ArgosScraper', enabled: true, priority: 2 },
      { name: 'Currys', url: 'https://www.currys.co.uk', scraperClass: 'CurrysScraper', enabled: true, priority: 3, categories: ['electronics'] },
      { name: 'John Lewis', url: 'https://www.johnlewis.com', scraperClass: 'JohnLewisScraper', enabled: false, priority: 4 },
      { name: 'Tesco', url: 'https://www.tesco.com', scraperClass: 'TescoScraper', enabled: false, priority: 5 },
    ]
  },
  {
    name: 'Germany',
    code: 'DE',
    currency: 'EUR',
    sites: [
      { name: 'Amazon DE', url: 'https://www.amazon.de', scraperClass: 'AmazonScraper', enabled: true, priority: 1 },
      { name: 'MediaMarkt', url: 'https://www.mediamarkt.de', scraperClass: 'MediaMarktScraper', enabled: true, priority: 2 },
      { name: 'Saturn', url: 'https://www.saturn.de', scraperClass: 'SaturnScraper', enabled: false, priority: 3, categories: ['electronics'] },
      { name: 'Otto', url: 'https://www.otto.de', scraperClass: 'OttoScraper', enabled: false, priority: 4 },
    ]
  },
  {
    name: 'Canada',
    code: 'CA',
    currency: 'CAD',
    sites: [
      { name: 'Amazon CA', url: 'https://www.amazon.ca', scraperClass: 'AmazonScraper', enabled: true, priority: 1 },
      { name: 'BestBuy CA', url: 'https://www.bestbuy.ca', scraperClass: 'BestBuyCAScraper', enabled: false, priority: 2 },
      { name: 'Walmart CA', url: 'https://www.walmart.ca', scraperClass: 'WalmartCAScraper', enabled: false, priority: 3 },
      { name: 'Canadian Tire', url: 'https://www.canadiantire.ca', scraperClass: 'CanadianTireScraper', enabled: false, priority: 4 },
    ]
  },
  {
    name: 'Australia',
    code: 'AU',
    currency: 'AUD',
    sites: [
      { name: 'Amazon AU', url: 'https://www.amazon.com.au', scraperClass: 'AmazonScraper', enabled: true, priority: 1 },
      { name: 'JB Hi-Fi', url: 'https://www.jbhifi.com.au', scraperClass: 'JBHiFiScraper', enabled: true, priority: 2 },
      { name: 'Harvey Norman', url: 'https://www.harveynorman.com.au', scraperClass: 'HarveyNormanScraper', enabled: false, priority: 3 },
      { name: 'The Good Guys', url: 'https://www.thegoodguys.com.au', scraperClass: 'GoodGuysScraper', enabled: false, priority: 4 },
    ]
  },
  {
    name: 'Brazil',
    code: 'BR',
    currency: 'BRL',
    sites: [
      { name: 'Amazon BR', url: 'https://www.amazon.com.br', scraperClass: 'AmazonScraper', enabled: true, priority: 1 },
      { name: 'Americanas', url: 'https://www.americanas.com.br', scraperClass: 'AmericanasScraper', enabled: true, priority: 2 },
      { name: 'Mercado Livre', url: 'https://www.mercadolivre.com.br', scraperClass: 'MercadoLivreScraper', enabled: true, priority: 3 },
      { name: 'Magazine Luiza', url: 'https://www.magazineluiza.com.br', scraperClass: 'MagazineLuizaScraper', enabled: false, priority: 4 },
    ]
  },
  {
    name: 'Mexico',
    code: 'MX',
    currency: 'MXN',
    sites: [
      { name: 'Amazon MX', url: 'https://www.amazon.com.mx', scraperClass: 'AmazonScraper', enabled: true, priority: 1 },
      { name: 'Mercado Libre MX', url: 'https://www.mercadolibre.com.mx', scraperClass: 'MercadoLivreScraper', enabled: true, priority: 2 },
      { name: 'Liverpool', url: 'https://www.liverpool.com.mx', scraperClass: 'LiverpoolScraper', enabled: true, priority: 3 },
    ]
  },
  {
    name: 'France',
    code: 'FR',
    currency: 'EUR',
    sites: [
      { name: 'Amazon FR', url: 'https://www.amazon.fr', scraperClass: 'AmazonScraper', enabled: true, priority: 1 },
      { name: 'Fnac', url: 'https://www.fnac.com', scraperClass: 'FnacScraper', enabled: true, priority: 2, categories: ['electronics', 'books'] },
      { name: 'Darty', url: 'https://www.darty.com', scraperClass: 'DartyScraper', enabled: true, priority: 3, categories: ['electronics'] },
    ]
  },
  {
    name: 'Italy',
    code: 'IT',
    currency: 'EUR',
    sites: [
      { name: 'Amazon IT', url: 'https://www.amazon.it', scraperClass: 'AmazonScraper', enabled: true, priority: 1 },
      { name: 'Unieuro', url: 'https://www.unieuro.it', scraperClass: 'UnieuroScraper', enabled: true, priority: 2, categories: ['electronics'] },
    ]
  },
  {
    name: 'Spain',
    code: 'ES',
    currency: 'EUR',
    sites: [
      { name: 'Amazon ES', url: 'https://www.amazon.es', scraperClass: 'AmazonScraper', enabled: true, priority: 1 },
      { name: 'PcComponentes', url: 'https://www.pccomponentes.com', scraperClass: 'PcComponentesScraper', enabled: true, priority: 2, categories: ['electronics', 'computers'] },
    ]
  },
  {
    name: 'Netherlands',
    code: 'NL',
    currency: 'EUR',
    sites: [
      { name: 'Amazon NL', url: 'https://www.amazon.nl', scraperClass: 'AmazonScraper', enabled: true, priority: 1 },
      { name: 'Coolblue', url: 'https://www.coolblue.nl', scraperClass: 'CoolblueScraper', enabled: true, priority: 2, categories: ['electronics'] },
    ]
  },
  {
    name: 'Japan',
    code: 'JP',
    currency: 'JPY',
    sites: [
      { name: 'Amazon JP', url: 'https://www.amazon.co.jp', scraperClass: 'AmazonScraper', enabled: true, priority: 1 },
      { name: 'Rakuten', url: 'https://www.rakuten.co.jp', scraperClass: 'RakutenScraper', enabled: true, priority: 2 },
      { name: 'Yodobashi', url: 'https://www.yodobashi.com', scraperClass: 'YodobashiScraper', enabled: true, priority: 3, categories: ['electronics'] },
    ]
  },
  {
    name: 'South Korea',
    code: 'KR',
    currency: 'KRW',
    sites: [
      { name: 'Coupang', url: 'https://www.coupang.com', scraperClass: 'CoupangScraper', enabled: false, priority: 1 },
      { name: 'Gmarket', url: 'https://www.gmarket.co.kr', scraperClass: 'GmarketScraper', enabled: false, priority: 2 },
    ]
  },
  {
    name: 'Singapore',
    code: 'SG',
    currency: 'SGD',
    sites: [
      { name: 'Lazada', url: 'https://www.lazada.sg', scraperClass: 'LazadaScraper', enabled: true, priority: 1 },
      { name: 'Shopee', url: 'https://shopee.sg', scraperClass: 'ShopeeScraper', enabled: true, priority: 2 },
      { name: 'Qoo10', url: 'https://www.qoo10.sg', scraperClass: 'Qoo10Scraper', enabled: true, priority: 3 },
    ]
  },
  {
    name: 'Malaysia',
    code: 'MY',
    currency: 'MYR',
    sites: [
      { name: 'Lazada MY', url: 'https://www.lazada.com.my', scraperClass: 'LazadaScraper', enabled: true, priority: 1 },
      { name: 'Shopee MY', url: 'https://shopee.com.my', scraperClass: 'ShopeeScraper', enabled: true, priority: 2 },
    ]
  },
  {
    name: 'Thailand',
    code: 'TH',
    currency: 'THB',
    sites: [
      { name: 'Lazada TH', url: 'https://www.lazada.co.th', scraperClass: 'LazadaScraper', enabled: true, priority: 1 },
      { name: 'Shopee TH', url: 'https://shopee.co.th', scraperClass: 'ShopeeScraper', enabled: true, priority: 2 },
    ]
  },
  {
    name: 'Philippines',
    code: 'PH',
    currency: 'PHP',
    sites: [
      { name: 'Lazada PH', url: 'https://www.lazada.com.ph', scraperClass: 'LazadaScraper', enabled: true, priority: 1 },
      { name: 'Shopee PH', url: 'https://shopee.ph', scraperClass: 'ShopeeScraper', enabled: true, priority: 2 },
    ]
  },
  {
    name: 'Indonesia',
    code: 'ID',
    currency: 'IDR',
    sites: [
      { name: 'Tokopedia', url: 'https://www.tokopedia.com', scraperClass: 'TokopediaScraper', enabled: true, priority: 1 },
      { name: 'Shopee ID', url: 'https://shopee.co.id', scraperClass: 'ShopeeScraper', enabled: true, priority: 2 },
      { name: 'Lazada ID', url: 'https://www.lazada.co.id', scraperClass: 'LazadaScraper', enabled: true, priority: 3 },
    ]
  },
  {
    name: 'Vietnam',
    code: 'VN',
    currency: 'VND',
    sites: [
      { name: 'Shopee VN', url: 'https://shopee.vn', scraperClass: 'ShopeeScraper', enabled: true, priority: 1 },
      { name: 'Lazada VN', url: 'https://www.lazada.vn', scraperClass: 'LazadaScraper', enabled: true, priority: 2 },
    ]
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    currency: 'AED',
    sites: [
      { name: 'Noon', url: 'https://www.noon.com', scraperClass: 'NoonScraper', enabled: true, priority: 1 },
      { name: 'Amazon AE', url: 'https://www.amazon.ae', scraperClass: 'AmazonScraper', enabled: true, priority: 2 },
      { name: 'Carrefour UAE', url: 'https://www.carrefouruae.com', scraperClass: 'CarrefourUAEScraper', enabled: true, priority: 3 },
    ]
  },
  {
    name: 'Saudi Arabia',
    code: 'SA',
    currency: 'SAR',
    sites: [
      { name: 'Noon SA', url: 'https://www.noon.com/saudi-arabia', scraperClass: 'NoonScraper', enabled: true, priority: 1 },
      { name: 'Amazon SA', url: 'https://www.amazon.sa', scraperClass: 'AmazonScraper', enabled: true, priority: 2 },
    ]
  },
  {
    name: 'South Africa',
    code: 'ZA',
    currency: 'ZAR',
    sites: [
      { name: 'Takealot', url: 'https://www.takealot.com', scraperClass: 'TakealotScraper', enabled: true, priority: 1 },
      { name: 'Makro', url: 'https://www.makro.co.za', scraperClass: 'MakroScraper', enabled: true, priority: 2 },
    ]
  },
  {
    name: 'Egypt',
    code: 'EG',
    currency: 'EGP',
    sites: [
      { name: 'Jumia EG', url: 'https://www.jumia.com.eg', scraperClass: 'JumiaScraper', enabled: true, priority: 1 },
      { name: 'Souq', url: 'https://egypt.souq.com', scraperClass: 'SouqScraper', enabled: true, priority: 2 },
    ]
  },
  {
    name: 'Nigeria',
    code: 'NG',
    currency: 'NGN',
    sites: [
      { name: 'Jumia NG', url: 'https://www.jumia.com.ng', scraperClass: 'JumiaScraper', enabled: true, priority: 1 },
      { name: 'Konga', url: 'https://www.konga.com', scraperClass: 'KongaScraper', enabled: true, priority: 2 },
    ]
  },
  {
    name: 'Kenya',
    code: 'KE',
    currency: 'KES',
    sites: [
      { name: 'Jumia KE', url: 'https://www.jumia.co.ke', scraperClass: 'JumiaScraper', enabled: true, priority: 1 },
      { name: 'Kilimall', url: 'https://www.kilimall.co.ke', scraperClass: 'KilimallScraper', enabled: true, priority: 2 },
    ]
  },
  {
    name: 'Turkey',
    code: 'TR',
    currency: 'TRY',
    sites: [
      { name: 'Trendyol', url: 'https://www.trendyol.com', scraperClass: 'TrendyolScraper', enabled: true, priority: 1 },
      { name: 'Hepsiburada', url: 'https://www.hepsiburada.com', scraperClass: 'HepsiburadaScraper', enabled: true, priority: 2 },
    ]
  },
  {
    name: 'Poland',
    code: 'PL',
    currency: 'PLN',
    sites: [
      { name: 'Allegro', url: 'https://allegro.pl', scraperClass: 'AllegroScraper', enabled: true, priority: 1 },
      { name: 'Media Expert', url: 'https://www.mediaexpert.pl', scraperClass: 'MediaExpertScraper', enabled: true, priority: 2, categories: ['electronics'] },
    ]
  },
  {
    name: 'Czech Republic',
    code: 'CZ',
    currency: 'CZK',
    sites: [
      { name: 'Alza', url: 'https://www.alza.cz', scraperClass: 'AlzaScraper', enabled: true, priority: 1, categories: ['electronics'] },
      { name: 'Mall.cz', url: 'https://www.mall.cz', scraperClass: 'MallScraper', enabled: false, priority: 2 },
    ]
  },
  {
    name: 'Hungary',
    code: 'HU',
    currency: 'HUF',
    sites: [
      { name: 'eMAG', url: 'https://www.emag.hu', scraperClass: 'EmagScraper', enabled: false, priority: 1 },
      { name: 'Extreme Digital', url: 'https://www.extreme-digital.hu', scraperClass: 'ExtremeDigitalScraper', enabled: false, priority: 2, categories: ['electronics'] },
    ]
  },
  {
    name: 'Romania',
    code: 'RO',
    currency: 'RON',
    sites: [
      { name: 'eMAG RO', url: 'https://www.emag.ro', scraperClass: 'EmagScraper', enabled: false, priority: 1 },
      { name: 'Altex', url: 'https://www.altex.ro', scraperClass: 'AltexScraper', enabled: false, priority: 2, categories: ['electronics'] },
    ]
  },
  {
    name: 'Bulgaria',
    code: 'BG',
    currency: 'BGN',
    sites: [
      { name: 'eMAG BG', url: 'https://www.emag.bg', scraperClass: 'EmagScraper', enabled: false, priority: 1 },
    ]
  },
  {
    name: 'Croatia',
    code: 'HR',
    currency: 'HRK',
    sites: [
      { name: 'Links', url: 'https://www.links.hr', scraperClass: 'LinksScraper', enabled: false, priority: 1, categories: ['electronics'] },
    ]
  },
  {
    name: 'Slovenia',
    code: 'SI',
    currency: 'EUR',
    sites: [
      { name: 'Big Bang', url: 'https://www.bigbang.si', scraperClass: 'BigBangScraper', enabled: false, priority: 1, categories: ['electronics'] },
    ]
  },
  {
    name: 'Slovakia',
    code: 'SK',
    currency: 'EUR',
    sites: [
      { name: 'Alza SK', url: 'https://www.alza.sk', scraperClass: 'AlzaScraper', enabled: false, priority: 1, categories: ['electronics'] },
    ]
  },
  {
    name: 'Estonia',
    code: 'EE',
    currency: 'EUR',
    sites: [
      { name: 'Hinnavaatlus', url: 'https://www.hinnavaatlus.ee', scraperClass: 'HinnavaatlusScraper', enabled: false, priority: 1 },
    ]
  },
  {
    name: 'Latvia',
    code: 'LV',
    currency: 'EUR',
    sites: [
      { name: '220.lv', url: 'https://www.220.lv', scraperClass: 'TwoTwentyScraper', enabled: false, priority: 1, categories: ['electronics'] },
    ]
  },
  {
    name: 'Lithuania',
    code: 'LT',
    currency: 'EUR',
    sites: [
      { name: 'Pigu.lt', url: 'https://www.pigu.lt', scraperClass: 'PiguScraper', enabled: false, priority: 1 },
    ]
  },
  {
    name: 'Sweden',
    code: 'SE',
    currency: 'SEK',
    sites: [
      { name: 'Amazon SE', url: 'https://www.amazon.se', scraperClass: 'AmazonScraper', enabled: false, priority: 1 },
      { name: 'Elgiganten', url: 'https://www.elgiganten.se', scraperClass: 'ElgigantenScraper', enabled: false, priority: 2, categories: ['electronics'] },
    ]
  },
  {
    name: 'Norway',
    code: 'NO',
    currency: 'NOK',
    sites: [
      { name: 'Amazon NO', url: 'https://www.amazon.no', scraperClass: 'AmazonScraper', enabled: false, priority: 1 },
      { name: 'Elkjøp', url: 'https://www.elkjop.no', scraperClass: 'ElkjøpScraper', enabled: false, priority: 2, categories: ['electronics'] },
    ]
  },
  {
    name: 'Denmark',
    code: 'DK',
    currency: 'DKK',
    sites: [
      { name: 'Amazon DK', url: 'https://www.amazon.dk', scraperClass: 'AmazonScraper', enabled: false, priority: 1 },
      { name: 'Elgiganten DK', url: 'https://www.elgiganten.dk', scraperClass: 'ElgigantenScraper', enabled: false, priority: 2, categories: ['electronics'] },
    ]
  },
  {
    name: 'Finland',
    code: 'FI',
    currency: 'EUR',
    sites: [
      { name: 'Amazon FI', url: 'https://www.amazon.fi', scraperClass: 'AmazonScraper', enabled: false, priority: 1 },
      { name: 'Gigantti', url: 'https://www.gigantti.fi', scraperClass: 'GiganttiScraper', enabled: false, priority: 2, categories: ['electronics'] },
    ]
  },
  {
    name: 'Switzerland',
    code: 'CH',
    currency: 'CHF',
    sites: [
      { name: 'Amazon CH', url: 'https://www.amazon.ch', scraperClass: 'AmazonScraper', enabled: false, priority: 1 },
      { name: 'Digitec', url: 'https://www.digitec.ch', scraperClass: 'DigitecScraper', enabled: false, priority: 2, categories: ['electronics'] },
    ]
  },
  {
    name: 'Austria',
    code: 'AT',
    currency: 'EUR',
    sites: [
      { name: 'Amazon AT', url: 'https://www.amazon.at', scraperClass: 'AmazonScraper', enabled: false, priority: 1 },
      { name: 'MediaMarkt AT', url: 'https://www.mediamarkt.at', scraperClass: 'MediaMarktScraper', enabled: false, priority: 2 },
    ]
  },
  {
    name: 'Belgium',
    code: 'BE',
    currency: 'EUR',
    sites: [
      { name: 'Amazon BE', url: 'https://www.amazon.com.be', scraperClass: 'AmazonScraper', enabled: false, priority: 1 },
      { name: 'Coolblue BE', url: 'https://www.coolblue.be', scraperClass: 'CoolblueScraper', enabled: false, priority: 2, categories: ['electronics'] },
    ]
  },
  {
    name: 'Ireland',
    code: 'IE',
    currency: 'EUR',
    sites: [
      { name: 'Amazon IE', url: 'https://www.amazon.ie', scraperClass: 'AmazonScraper', enabled: false, priority: 1 },
      { name: 'Harvey Norman IE', url: 'https://www.harveynorman.ie', scraperClass: 'HarveyNormanIEScraper', enabled: false, priority: 2 },
    ]
  },
  {
    name: 'New Zealand',
    code: 'NZ',
    currency: 'NZD',
    sites: [
      { name: 'Amazon NZ', url: 'https://www.amazon.com.au', scraperClass: 'AmazonScraper', enabled: false, priority: 1 },
      { name: 'Noel Leeming', url: 'https://www.noelleeming.co.nz', scraperClass: 'NoelLeemingScraper', enabled: false, priority: 2 },
    ]
  },
  {
    name: 'Chile',
    code: 'CL',
    currency: 'CLP',
    sites: [
      { name: 'Falabella', url: 'https://www.falabella.com', scraperClass: 'FalabellaScraper', enabled: false, priority: 1 },
      { name: 'Ripley', url: 'https://www.ripley.cl', scraperClass: 'RipleyScraper', enabled: false, priority: 2 },
    ]
  },
  {
    name: 'Argentina',
    code: 'AR',
    currency: 'ARS',
    sites: [
      { name: 'Mercado Libre AR', url: 'https://www.mercadolibre.com.ar', scraperClass: 'MercadoLivreScraper', enabled: false, priority: 1 },
      { name: 'Falabella AR', url: 'https://www.falabella.com.ar', scraperClass: 'FalabellaScraper', enabled: false, priority: 2 },
    ]
  },
  {
    name: 'Colombia',
    code: 'CO',
    currency: 'COP',
    sites: [
      { name: 'Mercado Libre CO', url: 'https://www.mercadolibre.com.co', scraperClass: 'MercadoLivreScraper', enabled: false, priority: 1 },
      { name: 'Falabella CO', url: 'https://www.falabella.com.co', scraperClass: 'FalabellaScraper', enabled: false, priority: 2 },
    ]
  },
  {
    name: 'Peru',
    code: 'PE',
    currency: 'PEN',
    sites: [
      { name: 'Mercado Libre PE', url: 'https://www.mercadolibre.com.pe', scraperClass: 'MercadoLivreScraper', enabled: false, priority: 1 },
      { name: 'Falabella PE', url: 'https://www.falabella.com.pe', scraperClass: 'FalabellaScraper', enabled: false, priority: 2 },
    ]
  },
  {
    name: 'Uruguay',
    code: 'UY',
    currency: 'UYU',
    sites: [
      { name: 'Mercado Libre UY', url: 'https://www.mercadolibre.com.uy', scraperClass: 'MercadoLivreScraper', enabled: false, priority: 1 },
    ]
  },
  {
    name: 'Paraguay',
    code: 'PY',
    currency: 'PYG',
    sites: [
      { name: 'Mercado Libre PY', url: 'https://www.mercadolibre.com.py', scraperClass: 'MercadoLivreScraper', enabled: false, priority: 1 },
    ]
  },
  {
    name: 'Ecuador',
    code: 'EC',
    currency: 'USD',
    sites: [
      { name: 'Mercado Libre EC', url: 'https://www.mercadolibre.com.ec', scraperClass: 'MercadoLivreScraper', enabled: false, priority: 1 },
    ]
  },
  {
    name: 'Bolivia',
    code: 'BO',
    currency: 'BOB',
    sites: [
      { name: 'Mercado Libre BO', url: 'https://www.mercadolibre.com.bo', scraperClass: 'MercadoLivreScraper', enabled: false, priority: 1 },
    ]
  },
  {
    name: 'Venezuela',
    code: 'VE',
    currency: 'VES',
    sites: [
      { name: 'Mercado Libre VE', url: 'https://www.mercadolibre.com.ve', scraperClass: 'MercadoLivreScraper', enabled: false, priority: 1 },
    ]
  },
  {
    name: 'Guyana',
    code: 'GY',
    currency: 'GYD',
    sites: [
      { name: 'Amazon GY', url: 'https://www.amazon.com', scraperClass: 'AmazonScraper', enabled: false, priority: 1 },
    ]
  },
  {
    name: 'Suriname',
    code: 'SR',
    currency: 'SRD',
    sites: [
      { name: 'Amazon SR', url: 'https://www.amazon.com', scraperClass: 'AmazonScraper', enabled: false, priority: 1 },
    ]
  },
  {
    name: 'French Guiana',
    code: 'GF',
    currency: 'EUR',
    sites: [
      { name: 'Amazon GF', url: 'https://www.amazon.fr', scraperClass: 'AmazonScraper', enabled: false, priority: 1 },
    ]
  }
];

// Helper function to get enabled sites for a country
export function getEnabledSites(countryCode: string): SiteConfig[] {
  const country = countryConfigs.find(c => c.code === countryCode);
  if (!country) return [];
  
  return country.sites
    .filter(site => site.enabled)
    .sort((a, b) => a.priority - b.priority);
}

// Helper function to get all supported countries
export function getSupportedCountries(): { code: string; name: string; currency: string }[] {
  return countryConfigs.map(country => ({
    code: country.code,
    name: country.name,
    currency: country.currency
  }));
}

// Helper function to get countries with enabled sites
export function getCountriesWithEnabledSites(): { code: string; name: string; currency: string }[] {
  return countryConfigs
    .filter(country => country.sites.some(site => site.enabled))
    .map(country => ({
      code: country.code,
      name: country.name,
      currency: country.currency
    }));
}

// Legacy export for backward compatibility
export const countrySites: Record<string, { name: string; url: string }[]> = {};
countryConfigs.forEach(country => {
  countrySites[country.code] = country.sites
    .filter(site => site.enabled)
    .map(site => ({ name: site.name, url: site.url }));
}); 