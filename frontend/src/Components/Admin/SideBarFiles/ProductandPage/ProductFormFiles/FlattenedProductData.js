const flattenProductData = (data) => {
  return {
    id: data.id,
    title: data.basicInfo?.title,
    description: data.basicInfo?.description,
    category: data.basicInfo?.category,
    brand: data.basicInfo?.brand,
    price: data.pricing?.price ? parseFloat(data.pricing.price) : null,
    stock: data.pricing?.stock ? parseInt(data.pricing.stock, 10) : null,
    sku: data.identifiers?.sku,
    tags: data.identifiers?.tags
      ? data.identifiers.tags.split(",").map((t) => t.trim())
      : [],
    dimensions: {
      width: data.dimensions?.width ? parseFloat(data.dimensions.width) : null,
      height: data.dimensions?.height
        ? parseFloat(data.dimensions.height)
        : null,
      depth: data.dimensions?.depth ? parseFloat(data.dimensions.depth) : null,
    },
    meta: {
      barcode: data.metadata?.barcode,
      qrCode: data.metadata?.qrCode,
    },
    images: data.media?.images
      ? data.media.images.split(",").map((img) => img.trim())
      : [],
    thumbnail: data.media?.thumbnail,
    reviews: data.reviews || [],
  };
};

export default flattenProductData;
