import ProductGrid from "./ProductGrid";
import GlobalFilters from "./Filters/GlobalFilters";

const Home = () => (
  <section style={{ padding: "2rem" }}>
    <GlobalFilters />
    <ProductGrid />
  </section>
);

export default Home;
