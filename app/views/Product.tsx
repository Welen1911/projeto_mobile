// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Button,
//   Alert,
// } from "react-native";

// const ProductFormScreen = ({ product }) => {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState("");

//   // Se estivermos editando, o produto será passado como parâmetro via `route`
//   // const { product } = route.params || {};

//   useEffect(() => {
//     if (product) {
//       setName(product.name);
//       setPrice(product.price.toString());
//       setImage(product.image);
//     }
//   }, [product]);

//   const handleSave = () => {
//     if (name === "" || price === "" || image === "") {
//       Alert.alert("Erro", "Por favor, preencha todos os campos.");
//       return;
//     }

//     // Aqui você pode enviar os dados para a API ou backend para salvar o produto
//     if (product) {
//       // Editar produto
//       console.log("Produto atualizado:", { name, price, image });
//     } else {
//       // Cadastrar novo produto
//       console.log("Novo produto criado:", { name, price, image });
//     }

//     // Redirecionar de volta para a lista de produtos após salvar
//     // navigation.goBack();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         {product ? "Editar Produto" : "Cadastrar Produto"}
//       </Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Nome do Produto"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Preço do Produto"
//         value={price}
//         onChangeText={setPrice}
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="URL da Imagem"
//         value={image}
//         onChangeText={setImage}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleSave}>
//         <Text style={styles.buttonText}>
//           {product ? "Atualizar Produto" : "Cadastrar Produto"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: "center",
//     backgroundColor: "#fff",
//     width: "100%"
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//   },
//   input: {
//     height: 40,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 12,
//   },
//   button: {
//     backgroundColor: "#28a745",
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 16,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default ProductFormScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

const ProductFormScreen = ({ product }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // Armazenar o caminho da imagem

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price.toString());
      setImage(product.image);
    }
  }, [product]);

  const handleSave = () => {
    if (name === "" || price === "" || !image) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (product) {
      console.log("Produto atualizado:", { name, price, image });
    } else {
      console.log("Novo produto criado:", { name, price, image });
    }

    // navigation.goBack();
  };

  // Função para abrir a galeria de imagens
  const pickImage = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      Alert.alert(
        "Permissão necessária",
        "Permissão para acessar a galeria é necessária!"
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled && pickerResult.assets.length > 0) {
      setImage(pickerResult.assets[0].uri); // Armazena o URI da imagem selecionada
    }
  };

  // Função para tirar uma foto
  const takePhoto = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();

    if (cameraPermission.granted === false) {
      Alert.alert("Permissão necessária", "Permissão para usar a câmera é necessária!");
      return;
    }

    if (mediaLibraryPermission.granted === false) {
      Alert.alert("Permissão necessária", "Permissão para salvar na galeria é necessária!");
      return;
    }

    const photoResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!photoResult.canceled && photoResult.assets.length > 0) {
      const asset = await MediaLibrary.createAssetAsync(photoResult.assets[0].uri);
      setImage(asset.uri); // Usa a foto tirada e salva na galeria automaticamente
      Alert.alert("Foto tirada com sucesso", "A foto foi salva na galeria.");
    }
  };

  // Função para escolher entre Galeria ou Câmera
  const chooseImageSource = () => {
    Alert.alert(
      "Selecionar Imagem",
      "Escolha de onde você quer pegar a imagem",
      [
        {
          text: "Galeria",
          onPress: pickImage,
        },
        {
          text: "Câmera",
          onPress: takePhoto,
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {product ? "Editar Produto" : "Cadastrar Produto"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço do Produto"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.imageButton} onPress={chooseImageSource}>
        <Text style={styles.buttonText}>Selecionar Imagem</Text>
      </TouchableOpacity>

      {image && (
        <Image source={{ uri: image }} style={styles.imagePreview} />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>
          {product ? "Atualizar Produto" : "Cadastrar Produto"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    resizeMode: "cover",
  },
});

export default ProductFormScreen;



