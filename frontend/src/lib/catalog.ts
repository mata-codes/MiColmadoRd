export const ALL_CATEGORIES_LABEL = "Todos"

export function normalizeCatalogText(value: string) {
  return value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
}

export function getCategoryOptions(items: { category: string }[]) {
  const categories = items.reduce<string[]>((acc, item) => {
    const category = item.category.trim()

    if (
      category &&
      !acc.some(
        (current) =>
          normalizeCatalogText(current) === normalizeCatalogText(category)
      )
    ) {
      acc.push(category)
    }

    return acc
  }, [])

  return [ALL_CATEGORIES_LABEL, ...categories]
}

export function matchesCategory(
  selectedCategory: string,
  productCategory: string
) {
  return (
    selectedCategory === ALL_CATEGORIES_LABEL ||
    normalizeCatalogText(productCategory) ===
      normalizeCatalogText(selectedCategory)
  )
}
