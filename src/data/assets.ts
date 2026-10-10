/**
 * Central asset map for SKIMART imagery.
 *
 * Photography is served from Unsplash (free to use) as demonstration placeholders
 * until the store provides real product photographs. Swap any URL below for a
 * local asset (e.g. "/images/store/amul-milk.jpg") without touching components.
 *
 * Every remote URL in this file has been validated to resolve.
 */

const img = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const assetUrls = {
  placeholderProduct: '/images/placeholder-product.svg',
  logo: '/favicon.svg',

  heroGroceryBasket: img('photo-1542838132-92c53300491e', 1200),
  heroFallback: '/images/hero-fallback.svg',
  storeInterior: img('photo-1578916171728-46686eac8d58', 900),
  deliveryBoxes: img('photo-1530982011887-3cc11cc85693', 900),

  promo: {
    freshProduce: img('photo-1540420773420-3366772f4999', 700),
    household: img('photo-1563453392212-326f5e854473', 700),
    snacks: img('photo-1551504734-5ee1c4a1479b', 700),
  },

  categories: {
    'fruits-vegetables': img('photo-1528825871115-3581a5387919'),
    'dairy-eggs': img('photo-1550583724-b2692b85b150'),
    'atta-rice-dal': img('photo-1586201375761-83865001e31c'),
    'snacks-namkeen': img('photo-1506003094589-53954a26283f'),
    'cold-drinks': img('photo-1544145945-f90425340c7e'),
    bakery: img('photo-1509440159596-0249088772ff'),
    'masala-oil': img('photo-1587049352846-4a222e784d38'),
    'personal-care': img('photo-1522337660859-02fbefca4702'),
    'home-cleaning': img('photo-1606923829579-0cb981a83e2e'),
    'baby-care': img('photo-1555252333-9f8e92e65df9'),
    'tea-coffee': img('photo-1594631252845-29fc4cc8cde9'),
    'biscuits-packaged': img('photo-1621939514649-280e2ee25f60'),
    'sauces-spreads': img('photo-1499636136210-6f4ee915583e'),
    'organic-healthy': img('photo-1512621776951-a57141f2eefd'),
    'pet-care': img('photo-1548199973-03cce0bbc87b'),
    'pharma-wellness': img('photo-1587854692152-cbe660dbde88'),
  },

  products: {
    milk: img('photo-1550583724-b2692b85b150'),
    milkBottle: img('photo-1486297678162-eb2a19b0a32d'),
    eggs: img('photo-1628088062854-d1870b4553da'),
    butter: img('photo-1571781926291-c477ebfd024b'),
    cheese: img('photo-1571781926291-c477ebfd024b'),
    atta: img('photo-1586201375761-83865001e31c'),
    rice: img('photo-1516684732162-798a0062be99'),
    dal: img('photo-1607344645866-009c320b63e0'),
    pantry: img('photo-1556742502-ec7c0e9f34b1'),
    oil: img('photo-1620706857370-e1b9770e8bb1'),
    oilOlive: img('photo-1474979266404-7eaacbcd87c5'),
    biscuits: img('photo-1621939514649-280e2ee25f60'),
    instantNoodles: img('photo-1551504734-5ee1c4a1479b'),
    tea: img('photo-1594631252845-29fc4cc8cde9'),
    coffee: img('photo-1495474472287-4d71bcdd2085'),
    bread: img('photo-1509440159596-0249088772ff'),
    breadLoaf: img('photo-1558961363-fa8fdf82db35'),
    ketchup: img('photo-1474979266404-7eaacbcd87c5'),
    banana: img('photo-1481349518771-20055b2a7b24'),
    tomato: img('photo-1566385101042-1a0aa0c1268c'),
    onion: img('photo-1518977676601-b53f82aba655'),
    potato: img('photo-1595855759920-86582396756a'),
    coriander: img('photo-1597362925123-77861d3fbac7'),
    chips: img('photo-1603046891744-1f76eb10aec7'),
    namkeen: img('photo-1506003094589-53954a26283f'),
    soda: img('photo-1523362628745-0c100150b504'),
    juice: img('photo-1599490659213-e2b9527bd087'),
    juiceBottles: img('photo-1613478223719-2ab802602423'),
    cosmetics: img('photo-1522337660859-02fbefca4702'),
    skincare: img('photo-1556228578-8c89e6adf883'),
    facewash: img('photo-1570172619644-dfd03ed5d881'),
    cleaning: img('photo-1563453392212-326f5e854473'),
    cleaningSpray: img('photo-1620916297397-a4a5402a3c6c'),
    laundry: img('photo-1585421514738-01798e348b17'),
    baby: img('photo-1555252333-9f8e92e65df9'),
    babyToy: img('photo-1502784444187-359ac186c5bb'),
    babies: img('photo-1515488042361-ee00e0ddd4e4'),
    pet: img('photo-1548199973-03cce0bbc87b'),
    petFood: img('photo-1601758228041-f3b2795255f1'),
    pharma: img('photo-1587854692152-cbe660dbde88'),
    wellness: img('photo-1576091160399-112ba8d25d1d'),
    spices: img('photo-1596040033229-a9821ebd058d'),
    masala: img('photo-1544787219-7f47ccb76574'),
    healthyBowl: img('photo-1512621776951-a57141f2eefd'),
    oats: img('photo-1577705998148-6da4f3963bc8'),
    honey: img('photo-1499636136210-6f4ee915583e'),
    breakfast: img('photo-1498837167922-ddd27525d352'),
    vegetables: img('photo-1518843875459-f738682238a6'),
    fruitBasket: img('photo-1619566636858-adf3ef46400b'),
    groceries: img('photo-1542838132-92c53300491e'),
  },
} as const

export type AssetKey = keyof typeof assetUrls