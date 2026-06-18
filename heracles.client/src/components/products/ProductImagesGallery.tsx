// src/components/products/ProductImagesGallery.tsx
import type { ProductImage } from '../../types/product';

export function ProductImagesGallery({ images }: { images: ProductImage[] }) {
  if (!images.length) return <div>Aucune image</div>;
  return (
    <div className="product-gallery">
      {images.sort((a, b) => a.order - b.order).map((img) => (
        <img key={img.id} src={img.url} alt={img.altText ?? 'Produit'} />
      ))}
    </div>
  );
}