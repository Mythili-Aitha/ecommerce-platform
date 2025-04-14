// FormatProductData.js
const formatProductData = (data) => {
  return {
    id: data.id,
    basicInfo: {
      title: data.title || "",
      description: data.description || "",
      category: data.category || "",
      brand: data.brand || "",
    },
    pricing: {
      price: data.price ? data.price.toString() : "",
      stock: data.stock ? data.stock.toString() : "",
    },
    identifiers: {
      sku: data.sku || "",
      tags: data.tags ? data.tags.join(", ") : "", // if tags is an array
    },
    dimensions: {
      width: data.dimensions?.width ? data.dimensions.width.toString() : "",
      height: data.dimensions?.height ? data.dimensions.height.toString() : "",
      depth: data.dimensions?.depth ? data.dimensions.depth.toString() : "",
    },
    metadata: {
      barcode: data.meta?.barcode || "",
      qrCode: data.meta?.qrCode || "",
    },
    media: {
      images: data.images ? data.images.join(", ") : "",
      thumbnail: data.thumbnail || "",
    },
    reviews: data.reviews || [],
  };
};

export default formatProductData;
