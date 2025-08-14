import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log("Parsed user:", parsedUser);

          if (parsedUser && parsedUser.id) {
            setUser(parsedUser);
          } else {
            console.warn("User data is invalid:", parsedUser);
          }
        } else {
          console.warn("No user found in AsyncStorage");
        }
      } catch (error) {
        console.error("Failed to fetch user from AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      router.replace("login");
    } catch (error) {
      console.error("Failed to clear AsyncStorage on logout:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to Your Dashboard</Text>
        <Button onPress={handleLogout} title="Logout" />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : !user ? (
        <Text style={styles.info}>User data not available.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.cardGrid}>
          <Text style={styles.card}>👤 User ID: {user?.id}</Text>
          <Text style={styles.card}>📧 Email: {user?.email}</Text>
          <Text style={styles.card}>🧑 Name: {user?.name}</Text>
          <Text style={styles.card}>
            📍 Location: {user?.location?.name || "Unknown"}
          </Text>
          <Text style={styles.card}>📊 Reports: Coming Soon...</Text>
          <Text style={styles.card}>📅 Events: Coming Soon...</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e3a8a",
  },
  cardGrid: {
    paddingBottom: 20,
  },
  card: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  info: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Profile;
