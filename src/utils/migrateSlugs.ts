import { Product } from "../models/Product";
import { generateUniqueSlug } from "./slug";

export const migrateExistingProductsToSlugs = async () => {
  try {
    console.log("Starting slug migration for existing products...");

    // Get all products that don't have slugs
    const productsWithoutSlugs = await Product.find({
      slug: { $exists: false },
    });

    console.log(`Found ${productsWithoutSlugs.length} products without slugs`);

    for (const product of productsWithoutSlugs) {
      try {
        // Generate unique slug for each product
        const slug = await generateUniqueSlug(product.title, Product);

        // Update the product with the new slug
        await Product.findByIdAndUpdate(product._id, { slug });

        console.log(`Updated product "${product.title}" with slug: ${slug}`);
      } catch (error) {
        console.error(`Error updating product "${product.title}":`, error);
      }
    }

    console.log("Slug migration completed!");
  } catch (error) {
    console.error("Error during slug migration:", error);
  }
};
