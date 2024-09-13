// src/screens/CartScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const cartItems = [
  { id: '1', name: 'Apple', price: 1.2, quantity: 2 },
  { id: '2', name: 'Milk', price: 0.99, quantity: 1 },
];

const CartScreen = () => {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu Carrinho</Text>
      
      {/* Lista de Itens */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQuantity}>Qtd: {item.quantity}</Text>
            <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
          </View>
        )}
      />
      
      {/* Total Geral */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalAmount}>R$ {totalPrice.toFixed(2)}</Text>
      </View>

      {/* Botão Finalizar Compra */}
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
      </TouchableOpacity>

      {/* Botão Continuar Comprando */}
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continuar Comprando</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
    // backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemName: {
    fontSize: 18,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#888',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CartScreen;
