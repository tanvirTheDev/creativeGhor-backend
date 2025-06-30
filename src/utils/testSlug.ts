import { generateSlug, generateUniqueSlug } from "./slug";

// Test slug generation
const testSlugGeneration = () => {
  const testCases = [
    "iPhone 14 Pro Max",
    "Samsung Galaxy S23 Ultra",
    "MacBook Pro 16-inch",
    "Nike Air Max 270",
    "Adidas Ultraboost 22",
    "Product with Special Characters!@#$%",
    "Product with Multiple   Spaces",
    "Product-with-hyphens",
    "Product with Numbers 123",
  ];

  console.log("Testing slug generation:");
  testCases.forEach((title) => {
    const slug = generateSlug(title);
    console.log(`"${title}" -> "${slug}"`);
  });
};

// Test unique slug generation
const testUniqueSlugGeneration = async () => {
  console.log("\nTesting unique slug generation:");

  // Mock model for testing
  const mockModel = {
    findOne: async (query: { slug: string }) => {
      // Simulate that "iphone-14-pro-max" already exists
      if (query.slug === "iphone-14-pro-max") {
        return { _id: "existing" };
      }
      return null;
    },
  };

  const slug1 = await generateUniqueSlug("iPhone 14 Pro Max", mockModel);
  console.log(`"iPhone 14 Pro Max" -> "${slug1}"`);

  const slug2 = await generateUniqueSlug("iPhone 14 Pro Max", mockModel);
  console.log(`"iPhone 14 Pro Max" (duplicate) -> "${slug2}"`);
};

// Run tests
if (require.main === module) {
  testSlugGeneration();
  testUniqueSlugGeneration().catch(console.error);
}

export { testSlugGeneration, testUniqueSlugGeneration };
