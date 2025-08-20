import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const DataCards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // for Opening Of MOdal [new addition]
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  // const [loading, setLoading] = useState(false);

  // for Opening Of MOdal [new addition]
  const handleCardPress = async (item) => {
    setModalVisible(true);
    setLoading(true);

    try {
      const Id = await AsyncStorage.getItem("id");
      const token = await AsyncStorage.getItem("accessToken");

      if (!token || !Id) {
        console.error("Token or Id missing in AsyncStorage");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://qa.healthshade.com/api/purchase_order",
        { id: Id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Purchase_Order Api is being hit");
      console.log("Selected Data:", response.data.purchase_order);
      setSelectedData(response.data.purchase_order);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get token & location_id from AsyncStorage
        const token = await AsyncStorage.getItem("accessToken");
        const locationId = await AsyncStorage.getItem("location_id");

        if (!token || !locationId) {
          console.error("Token or location_id missing in AsyncStorage");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          "https://qa.healthshade.com/api/purchase_list",
          { location_id: locationId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setData(response.data.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    console.log("Purchase_List Api is being hit");

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleCardPress(item)}>
            <View style={styles.card}>
              <Text style={styles.title}>
                {item.purchase_oder_number || "No Title"}
              </Text>
              <Text>{item.id || "No Description"}</Text>
              <Text>{item.status || "No Status"}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Modal , // for Opening Of MOdal [new addition] */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#000" />
            ) : selectedData ? (
              <View style={styles.card}>
                {" "}
                {/* Same design as FlatList card */}
                <Text style={styles.title}>
                  {selectedData?.product?.product_name || "No Product"}
                </Text>
                <Text>
                  {selectedData?.purchased_products?.product_supplier_id ||
                    "No Supplier"}
                </Text>
                <Text>{selectedData?.status || "No Status"}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: "#fff" }}>Close</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <Text>No data found</Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8", // Light neutral background
  },
  list: {
    padding: 12,
  },
  card: {
    backgroundColor: "#ffffff", // Clean white for content
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,

    // Soft shadow for both iOS & Android
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,

    // Add subtle border for separation
    borderWidth: 0.5,
    borderColor: "#e2e8f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3748", // Dark gray instead of pure black
  },

  // for Opening Of MOdal [new addition]
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  closeButton: {
    marginTop: 15,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default DataCards;
