<template>
  <div class="all">
    <h2>Liste des produits</h2>

    <div class="criteres">
      <select v-model="selectedCategory" @change="filterProducts">
        <option value="">Toutes les catégories</option>
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>

      <div class="pagination-controls ctrl-pages-all">
        <button @click="prevPage" :disabled="currentPage <= 1">Précédent</button>
        <span>Page {{ currentPage }} sur {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages">Suivant</button>
      </div>
    </div>
    
    <div class="row products-l">
      <div class="col-md-3" v-for="product in paginatedProducts" :key="product.id">
        <div class="card mb-4 card-ele">
          <!-- Thumbnail du produit comme un lien vers la page de détail du produit -->
          <router-link :to="{ name: 'product', params: { id: product.id } }">
            <img :src="product.thumbnail" class="card-img-top thumbnail-img" alt="Product Thumbnail">
          </router-link>
          <div class="card-body card-ele-i">
            <div class="txt">
              <h5 class="card-title">{{ product.title }}</h5>
              <p class="card-text">Description : {{ product.description }}</p>
              <p class="card-text price">{{ product.price }}€</p>
            </div>
            <div class="btn-all">
              <router-link :to="{ name: 'product', params: { id: product.id } }" class="voir">Voir +</router-link>
              <button @click="addToCart(product)" class="ajt-panier">+ Ajouter au panier</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contrôles de pagination -->
    <div class="pagination-controls ctrl-pages-all">
      <button @click="prevPage" :disabled="currentPage <= 1">Précédent</button>
      <span>Page {{ currentPage }} sur {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">Suivant</button>
    </div>

    <!-- Popup Panier -->
    <div v-if="showCartPopup" class="cart-popup">
      <button @click="showCartPopup = false" class="close-btn">&times;</button>
      <h3>Récapitulatif du Panier</h3>
      <div v-for="item in cart.items" :key="item.id">
        <p>{{ item.title }} - Quantité: {{ item.quantity }}</p>
      </div>
      <p>Total : {{ cart.totalPrice }}€</p>
      <button @click="goToCartPage" class="btn btn-primary">Voir le panier</button>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import { useCartStore } from '@/stores/cart';

export default {
  data() {
    return {
      products: [],
      categories: [],
      selectedCategory: '',
      showCartPopup: false,
      currentPage: 1,
      pageSize: 9
    };
  },
  computed: {
    filteredProducts() {
      return this.selectedCategory ? this.products.filter(product => product.category === this.selectedCategory) : this.products;
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.pageSize);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.filteredProducts.slice(start, start + this.pageSize);
    },
    cart() {
      return useCartStore();
    }
  },
  methods: {
    fetchProducts() {
      axios.get(`https://dummyjson.com/products`)
        .then(response => {
          this.products = response.data.products;
          this.categories = [...new Set(this.products.map(product => product.category))];
        })
        .catch(error => console.error('Erreur lors de la récupération des produits:', error));
    },
    addToCart(product) {
      this.cart.addToCart(product, 1);
      this.showCartPopup = true;
    },
    goToCartPage() {
      this.$router.push('/cart');
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>


<style scoped>
.all{
  gap:20px;
  display: flex;
  flex-direction: column;
  padding: 25px;
}

.criteres{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

select{
  width: 250px;
}
.cart-popup {
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background-color: rgb(17, 17, 17);
  box-shadow: -2px 0 8px rgba(0,0,0,0.1);
  padding: 20px;
  z-index: 100;
  color: #fff;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
  background-color: #242424;
}

.btn-all {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-ele {
  margin: 0 10px;
  min-height: 570px;
}
.card-ele-i{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.thumbnail-img{
  height: 300px;
  object-fit: cover;
}

.card-body {
  color: black;
}

.products-l{
  margin: 0 !important;
  margin-top: 25px !important;
  margin-bottom: 20px !important;
}

.voir{
  background-color: #828080;
  color: white;
  /* padding: 5px 10px; */
  height: 40px;
  width: 100px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: 0.25s all ease-in-out;
}
.voir:hover{
  background-color: #5e5e5e;
}

.ajt-panier{
  background-color: #25cd28;
  color: white;
  padding: 10px 25px;
  border-radius: 105px;
  text-decoration: none;
  border:none;
}

.price{
  color:red;
  font-size: 45px;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
  margin-top:-15px;
}

/* Ctrl pages */
.ctrl-pages-all{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: 350px;
}
.ctrl-pages-all button{
  padding: 10px 20px;
  background-color: #2584cd;
  color: white;
  border-radius: 105px;
  border:none;
}

.ctrl-pages-all span{
  color: black;
  font-weight: bold;
  margin-top: 10px;
}
</style>
