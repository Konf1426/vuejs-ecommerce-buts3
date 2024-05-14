<template>
  <div>
      <h2>Détails du produit</h2>
      <div class="prod" v-if="product">
          <!-- Image + desc et infos -->
          <div class="left">
            <div class="product-display">
              <!-- Miniatures des images -->
              <div class="thumbnails">
                  <img
                      v-for="(image, index) in product.images"
                      :key="index"
                      :src="image"
                      alt="Product Thumbnail"
                      class="thumbnail"
                      @click="selectImage(image)"
                      :class="{ selected: image === selectedImage }"
                  />
              </div>
              <!-- Image principale sélectionnée -->
              <div class="main-image">
                  <img :src="selectedImage" alt="Selected Product Image" />
              </div>
            </div>
            <div class="info-product">
              <h3>{{ product.title }}</h3>
              <!-- Informations sur le produit -->
              <p>Description : {{ product.description }}</p>
              <p>Évaluation : {{ product.rating }}</p>
              <p>Stock : {{ product.stock }}</p>
              <p>Marque : {{ product.brand }}</p>
              <p>Catégorie : {{ product.category }}</p>
            </div>
          </div>
          <!-- Prix + qtt + btn ajt panier -->
          <div class="right">
            <p class="price">{{ product.price }}€</p>
            <p>Remise : {{ product.discountPercentage }}</p>
            <button @click="addToCart">Ajouter au Panier</button>
          </div>
          
          
      </div>
      <div v-else>
          <p>Chargement du produit...</p>
      </div>
  </div>
</template>


<script>
import axios from 'axios';
import { useCartStore } from '@/stores/cart'; // Assurez-vous que le chemin est correct

export default {
    data() {
        return {
            product: null,
            selectedImage: ''
        };
    },
    mounted() {
        this.fetchProduct();
    },
    methods: {
        addToCart() {
            const cart = useCartStore();
            cart.addToCart(this.product, 1); // Ajoutez 1 quantité du produit actuel
            this.$router.push('/cart'); // Rediriger vers la page du panier
        },
        fetchProduct() {
            const productId = this.$route.params.id;
            axios.get(`https://dummyjson.com/product/${productId}`)
                .then(response => {
                    this.product = response.data;
                    this.selectedImage = this.product.images[0]; // Définir l'image principale initiale
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération du produit:', error);
                });
        },
        selectImage(image) {
            this.selectedImage = image; // Mettre à jour l'image principale
        }
    },
};
</script>


<style scoped>
.prod {
    display: flex;
    justify-content: center;
    /* margin: 0 10px; */
    padding: 20px;
    width: 100%;
    gap:20px;
}
.product-display {
    display: flex;
    margin-top: 20px;
}
.thumbnails {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
}
.thumbnail {
    width: 100px;
    height: auto;
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.3s;
}
.thumbnail:hover, .thumbnail.selected {
    opacity: 1;
}
.main-image img {
    width: auto;
    max-width: 300px;
    max-height: 500px;
    display: block;
    background-color: #ECECEC;
}
.info-product {
    margin-left: 20px;
}
button {
    padding: 10px 20px;
    background-color: #2bb310;
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 100px;
    cursor: pointer;
    margin-top: 10px;
    transition: all 0.3s ease-in-out;
}
button:hover {
    background-color: #046a19;
}

/* Mise en page  */
.left{
  background-color: rgb(223, 223, 223);
  width: 66%;
  display: flex;
  padding: 25px;
  border-radius: 20px;
}
.right{
  background-color: rgb(223, 223, 223);
  width: 33%;
  padding: 25px;
  border-radius: 20px;
}

.price{
  color:red;
  font-size: 45px;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: bold;
}
</style>
