// Generate SEO-friendly slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove special characters
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

// Generate unique slug by appending number if slug already exists
export const generateUniqueSlug = async (
  title: string,
  model: { findOne: (query: { slug: string }) => Promise<unknown> }
): Promise<string> => {
  const slug = generateSlug(title);
  let counter = 1;
  let uniqueSlug = slug;

  while (await model.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};
