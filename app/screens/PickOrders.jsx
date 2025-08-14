import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const PickOrders = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Stock Levels</Text>

      {/* Table Header */}
      <View style={[styles.row, styles.headerRow]}>
        <Text style={[styles.cell, styles.headerText]}>Code</Text>
        <Text style={[styles.cell, styles.headerText]}>Product</Text>
        <Text style={[styles.cell, styles.headerText]}>Available</Text>
        <Text style={[styles.cell, styles.headerText]}>Base Unit</Text>
        <Text style={[styles.cell, styles.headerText]}>Action</Text>
      </View>

      {/* Hardcoded Rows */}
      <View style={styles.row}>
        <Text style={styles.cell}>43120</Text>
        <Text style={styles.cell}>Paracetamol</Text>
        <Text style={styles.cell}>5</Text>
        <Text style={styles.cell}>Pack</Text>
        <Text style={styles.cell}>Remove</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.cell}>23110</Text>
        <Text style={styles.cell}>Vasemol</Text>

        <Text style={styles.cell}>10</Text>
        <Text style={styles.cell}>Palette</Text>

        <Text style={styles.cell}>Remove</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.cell}>83920</Text>
        <Text style={styles.cell}>Ubisol</Text>

        <Text style={styles.cell}>9</Text>
        <Text style={styles.cell}>Pack</Text>

        <Text style={styles.cell}>Remove</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.cell}>93420</Text>
        <Text style={styles.cell}>Cold Chest</Text>

        <Text style={styles.cell}>7</Text>
        <Text style={styles.cell}>Pallete</Text>

        <Text style={styles.cell}>Remove</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#fff",
  },
  headerRow: {
    backgroundColor: "#e0e0e0",
  },
  cell: {
    flex: 1,
    padding: 12,
    fontSize: 10,
    color: "#333",
  },
  headerText: {
    fontWeight: "bold",
  },
});

export default PickOrders;
