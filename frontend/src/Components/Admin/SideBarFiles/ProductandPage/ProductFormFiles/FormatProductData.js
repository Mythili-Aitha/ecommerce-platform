const formatProductFormData = (data) => {
  return {
    basicInfo: {
      title: data.title || "",
      description: data.description || "",
      category: data.category || "",
      brand: data.brand || "",
    },
    pricing: {
      price: data.price?.toString() || "",
      stock: data.stock?.toString() || "",
    },
    identifiers: {
      sku: data.sku || "",
      tags: data.tags?.join(", ") || "",
    },
    dimensions: {
      width: data.dimensions?.width?.toString() || "",
      height: data.dimensions?.height?.toString() || "",
      depth: data.dimensions?.depth?.toString() || "",
    },
    metadata: {
      barcode: data.meta?.barcode || "",
      qrCode: data.meta?.qrCode || "",
    },
    media: {
      images: data.images?.join(", ") || "",
      thumbnail: data.thumbnail || "",
    },
    reviews: data.reviews || [],
    id: data.id,
  };
};

export default formatProductFormData;
