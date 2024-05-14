// src/stores/cart.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: JSON.parse(localStorage.getItem('cartItems')) || [],
    }),
    getters: {
        totalItems: state => state.items.reduce((total, item) => total + item.quantity, 0),
        totalPrice: state => state.items.reduce((total, item) => total + item.quantity * item.price, 0),
    },
    actions: {
        addToCart(product, quantity = 1) {
            const item = this.items.find(item => item.id === product.id);
            if (item) {
                item.quantity += quantity;
            } else {
                this.items.push({...product, quantity});
            }
            this.saveCart();
        },
        removeFromCart(productId) {
            this.items = this.items.filter(item => item.id !== productId);
            this.saveCart();
        },
        updateQuantity(productId, quantity) {
            const item = this.items.find(item => item.id === productId);
            if (item && quantity > 0) {
                item.quantity = quantity;
            } else {
                this.removeFromCart(productId);
            }
            this.saveCart();
        },
        clearCart() {
            this.items = [];
            this.saveCart();
        },
        saveCart() {
            localStorage.setItem('cartItems', JSON.stringify(this.items));
        }
    }
});
