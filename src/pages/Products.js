import styles from "../../styles/Home.module.css";
import "../../src/app/globals.css";
import Header from "@/app/components/Header";

function Products() {
  return (
    <div>
      <Header />
      <div>
      <div className={styles.imageBackground}></div>
        <p>PAGE Products </p>
      </div>
    </div>
  )
}

export default Products;
