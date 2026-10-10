import type { Category } from '@/types'
import { assetUrls } from './assets'

/**
 * Master category list. Category slugs are stable and used across routes,
 * product records and filtering. Item counts are derived in the service layer.
 */
export const categories: Category[] = [
  {
    slug: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    image: assetUrls.categories['fruits-vegetables'],
    alt: 'A bowl of fresh mixed vegetables',
    description: 'Fresh fruits and vegetables for daily nutrition.',
  },
  {
    slug: 'dairy-eggs',
    name: 'Dairy & Eggs',
    image: assetUrls.categories['dairy-eggs'],
    alt: 'Bottles of fresh milk',
    description: 'Milk, curd, paneer, butter, cheese and eggs.',
  },
  {
    slug: 'atta-rice-dal',
    name: 'Atta, Rice & Dal',
    image: assetUrls.categories['atta-rice-dal'],
    alt: 'Wheat flour, rice and lentils',
    description: 'Staples for every Indian kitchen.',
  },
  {
    slug: 'snacks-namkeen',
    name: 'Snacks & Namkeen',
    image: assetUrls.categories['snacks-namkeen'],
    alt: 'Packaged chips and namkeen',
    description: 'Biscuits, namkeen, chips and more.',
  },
  {
    slug: 'cold-drinks',
    name: 'Cold Drinks',
    image: assetUrls.categories['cold-drinks'],
    alt: 'Chilled bottles of soft drinks',
    description: 'Soft drinks, juices and chilled beverages.',
  },
  {
    slug: 'bakery',
    name: 'Bakery',
    image: assetUrls.categories.bakery,
    alt: 'Freshly baked bread loaves',
    description: 'Bread, buns, cakes and bakery treats.',
  },
  {
    slug: 'masala-oil',
    name: 'Masala & Oil',
    image: assetUrls.categories['masala-oil'],
    alt: 'Cooking oils and spices',
    description: 'Cooking oils, whole spices and ground masalas.',
  },
  {
    slug: 'personal-care',
    name: 'Personal Care',
    image: assetUrls.categories['personal-care'],
    alt: 'Personal care and skincare products',
    description: 'Skincare, grooming and daily personal care.',
  },
  {
    slug: 'home-cleaning',
    name: 'Home Cleaning',
    image: assetUrls.categories['home-cleaning'],
    alt: 'Bottles of cleaning supplies',
    description: 'Cleaning, laundry and home care products.',
  },
  {
    slug: 'baby-care',
    name: 'Baby Care',
    image: assetUrls.categories['baby-care'],
    alt: 'Baby care essentials',
    description: 'Gentle care essentials for baby and toddler.',
  },
  {
    slug: 'tea-coffee',
    name: 'Tea & Coffee',
    image: assetUrls.categories['tea-coffee'],
    alt: 'A cup of hot tea',
    description: 'Tea, coffee and hot beverages.',
  },
  {
    slug: 'biscuits-packaged',
    name: 'Biscuits & Packaged Foods',
    image: assetUrls.categories['biscuits-packaged'],
    alt: 'Packaged biscuits and cookies',
    description: 'Biscuits, cookies and packaged foods.',
  },
  {
    slug: 'sauces-spreads',
    name: 'Sauces & Spreads',
    image: assetUrls.categories['sauces-spreads'],
    alt: 'Jars of sauce and spread',
    description: 'Ketchups, sauces, spreads and dips.',
  },
  {
    slug: 'organic-healthy',
    name: 'Organic & Healthy Living',
    image: assetUrls.categories['organic-healthy'],
    alt: 'A fresh healthy salad bowl',
    description: 'Health foods, millets and diet essentials.',
  },
  {
    slug: 'pet-care',
    name: 'Pet Care',
    image: assetUrls.categories['pet-care'],
    alt: 'A happy pet dog',
    description: 'Pet food and everyday pet essentials.',
  },
  {
    slug: 'pharma-wellness',
    name: 'Pharma & Wellness',
    image: assetUrls.categories['pharma-wellness'],
    alt: 'Everyday wellness products',
    description: 'Everyday wellness and healthcare essentials.',
  },
]