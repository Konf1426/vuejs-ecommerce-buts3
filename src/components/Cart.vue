<template>
    <div>
      <h1>Votre Panier</h1>
      <div v-if="cart.totalItems > 0">
        <div class="info-item" v-for="item in cart.items" :key="item.id">
          <h3>{{ item.title }} - {{ item.quantity }} x {{ item.price }}€</h3>
          <div class="btn-all">
              <button @click="promptRemoveItem(item.id)">Retirer</button>
              <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
              <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
          </div>
        </div>
        <p>Total articles: {{ cart.totalItems }}</p>
        <p>Total prix: {{ cart.totalPrice }}€</p>
        <button @click="clearCart">Vider le panier</button>
      </div>
      <div v-else>
        <p>Votre panier est vide.</p>
      </div>
  
      <!-- Modal -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h4>Confirmation</h4>
          <p>Voulez-vous vraiment retirer cet article du panier ?</p>
          <button @click="removeFromCart(pendingRemoveId)">Confirmer</button>
          <button @click="showModal = false">Annuler</button>
        </div>
      </div>
    </div>
  </template>
  

  <script>
  import { ref } from 'vue';
  import { useCartStore } from '@/stores/cart';
  
  export default {
    setup() {
      const cart = useCartStore();
      const showModal = ref(false);
      const pendingRemoveId = ref(null);
  
      function promptRemoveItem(itemId) {
        pendingRemoveId.value = itemId;
        showModal.value = true;
      }
  
      function removeFromCart() {
        if (pendingRemoveId.value !== null) {
          cart.removeFromCart(pendingRemoveId.value);
          showModal.value = false;
          pendingRemoveId.value = null;
        }
      }
  
      return {
        cart,
        removeFromCart,
        updateQuantity: cart.updateQuantity,
        clearCart: cart.clearCart,
        showModal,
        promptRemoveItem
      };
    }
  };
  </script>
  

<!-- Style scss -->
<style lang="scss">
.btn-all {
  display: flex;
  justify-content: space-around;
  button {
    padding: 5px 10px;
    margin: 5px;
  }
}
.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px 0;
}

/* Styles pour le modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  text-align: center;
}

button {
  cursor: pointer;
  margin-top: 10px;
}
</style>