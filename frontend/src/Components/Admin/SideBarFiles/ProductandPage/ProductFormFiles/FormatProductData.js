const formatProductData = (product) => {
  return {
    title: product.basicInfo.title,
    description: product.basicInfo.description,
    category: product.basicInfo.category,
    brand: product.basicInfo.brand,
    price: parseFloat(product.pricing.price),
    stock: parseInt(product.pricing.stock),
    sku: product.identifiers.sku,
    tags: product.identifiers.tags.split(",").map((t) => t.trim()),
    dimensions: {
      width: parseFloat(product.dimensions.width),
      height: parseFloat(product.dimensions.height),
      depth: parseFloat(product.dimensions.depth),
    },
    meta: {
      barcode: product.metadata.barcode,
      qrCode: product.metadata.qrCode,
    },
    reviews: product.reviews.map((r) => ({
      rating: parseFloat(r.rating),
      comment: r.comment,
      reviewerName: r.reviewerName,
      reviewerEmail: r.reviewerEmail,
    })),
    images: product.media.images
      ? product.media.images.split(",").map((url) => url.trim())
      : [],
    thumbnail: product.media.thumbnail,
    rating: product.reviews.length
      ? parseFloat(
          (
            product.reviews.reduce(
              (sum, r) => sum + parseFloat(r.rating || 0),
              0
            ) / product.reviews.length
          ).toFixed(2)
        )
      : 0.0,
    discountPercentage: 0.0,
    discountAppliedAt: null,
  };
};

export default formatProductData;
