import { ICategoryChipListProps } from '@interfaces/dashboard'

// Список категорий фильтров
export const filteredListData: ICategoryChipListProps[] = [
  {
    category: 'packaging',
    categoryItems: [
      {
        categoryItem: 'Cosmetics',
        colorChip: '#e65b5b',
        disabled: false,
      },
      {
        categoryItem: 'Drinks',
        colorChip: '#e65b5b',
        disabled: false,
      },
      {
        categoryItem: 'Food',
        colorChip: '#e65b5b',
        disabled: false,
      },
    ],
  },
  {
    category: 'clothes',
    categoryItems: [
      {
        categoryItem: 'T-Shirts',
        colorChip: '#4bb74b',
        disabled: false,
      },
      {
        categoryItem: 'Caps',
        colorChip: '#4bb74b',
        disabled: false,
      },
      {
        categoryItem: 'Face Masks',
        colorChip: '#4bb74b',
        disabled: false,
      },
    ],
  },
  {
    category: 'devices',
    categoryItems: [
      {
        categoryItem: 'Smartphones',
        colorChip: '#748bfd',
        disabled: false,
      },
      {
        categoryItem: 'Laptopes',
        colorChip: '#748bfd',
        disabled: false,
      },
      {
        categoryItem: 'Clocks',
        colorChip: '#748bfd',
        disabled: false,
      },
    ],
  },
]
