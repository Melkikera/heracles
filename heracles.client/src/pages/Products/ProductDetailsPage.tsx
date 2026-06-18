// src/pages/Products/ProductDetailsPage.tsx
import { useParams } from 'react-router-dom';
import { useProduct } from '../../services/useProducts';
import { ProductImagesGallery } from '../../components/products/ProductImagesGallery';
import { ProductTagsList } from '../../components/products/ProductTagsList';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useProduct(Number(id));

  if (isLoading) return <div>Chargement...</div>;
  if (!data) return <div>Produit introuvable</div>;

  return (
    <div className="product-details-page">
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <ProductImagesGallery images={data.images ?? []} />
      <ProductTagsList tags={data.tags ?? []} />
    </div>
  );
}