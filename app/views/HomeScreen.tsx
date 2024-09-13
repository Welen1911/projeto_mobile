import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";

const categories = ["Frutas", "Laticínios", "Bebidas", "Limpeza"];
const products = [
  {
    id: "1",
    name: "Apple",
    price: 1.2,
    image: "https://via.placeholder.com/100", // Exemplo de imagem
  },
  {
    id: "2",
    name: "Milk",
    price: 0.99,
    image: "https://via.placeholder.com/100",
  },
  {
    id: "3",
    name: "Orange Juice",
    price: 3.5,
    image: "https://via.placeholder.com/100",
  },
  {
    id: "4",
    name: "Detergente",
    price: 2.5,
    image: "https://via.placeholder.com/100",
  },
];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Cabeçalho de Boas-Vindas */}
      <Text style={styles.header}>Bem-vindo ao Supermercado!</Text>

      {/* Categorias de Produtos */}
      <Text style={styles.sectionTitle}>Categorias</Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />

      {/* Lista Vertical de Produtos */}
      <Text style={styles.sectionTitle}>Produtos em Destaque</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>Adicionar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginRight: 10,
  },
  categoryText: {
    color: "#fff",
    fontSize: 14,
  },
  productCard: {
    backgroundColor: "#fff",
    flexDirection: "row", // Para alinhar a imagem ao lado da descrição
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16, // Espaço entre a imagem e o texto
  },
  productInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: "#888",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  addButton: {
    backgroundColor: "#28a745",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  editButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default HomeScreen;
