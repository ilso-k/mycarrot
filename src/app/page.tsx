import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ProductCard from '@/components/ProductCard/ProductCard';
import { productService } from '@/service/productService';
import styles from './page.module.css';

export default async function Home({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const { search } = await searchParams;

  const filteredProducts = search
    ? await productService.search(search)
    : await productService.getAll();

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1>당신 근처의 당근</h1>
          <p>중고 거래부터 동네 정보까지, 이웃과 함께해요.</p>
        </div>

        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {filteredProducts.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
