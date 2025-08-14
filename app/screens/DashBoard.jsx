import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const DashBoard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/pexels-karolina-grabowska-4021775.jpg")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to Inventra</Text>
      <Text style={styles.subtitle}>Your intelligent inventory assistant</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E0F7FA", // Light cyan background
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 30,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#00BCD4",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#00796B", // Teal
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "#B2DFDB",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: "#004D40",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default DashBoard;
