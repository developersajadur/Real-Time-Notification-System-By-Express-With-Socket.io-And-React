// constants/category.constant.ts
export const CATEGORY_CREATOR = {
  SYSTEM: 'SYSTEM',
  ADMIN: 'ADMIN',
} as const;
export type TCategoryCreator = typeof CATEGORY_CREATOR[keyof typeof CATEGORY_CREATOR];