import {
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";
import { Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("This is handleSubmit function");

      const response = await axios.post(
        "https://qa.healthshade.com/api/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      const { access_token, token_type, user } = response.data;
      const { location_id } = user;
      const { id } = user;
      await AsyncStorage.setItem("id", JSON.stringify(id));
      await AsyncStorage.setItem("accessToken", access_token);
      await AsyncStorage.setItem("tokenType", token_type);
      await AsyncStorage.setItem("location_id", location_id);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      router.push("screens/DashBoard");
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.innerContainer}>
              <Text style={styles.title}>Welcome to Inventra</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor="#666"
                  secureTextEntry={!passwordVisible} // hide when false
                />

                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Ionicons
                    name={passwordVisible ? "eye-off" : "eye"}
                    size={22}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
              <Pressable onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>

              {loading && (
                <Modal transparent={true} animationType="fade">
                  <View style={styles.overlay}>
                    <ActivityIndicator size="large" color="#fff" />
                    <Text style={styles.loadingText}>Logging in...</Text>
                  </View>
                </Modal>
              )}

              <Link href="/register" style={styles.registerText}>
                Register Here
              </Link>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#fff", // makes it look like a single box
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    height: 50,
    borderColor: "#cbd5e1",
    borderWidth: 0,
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#1e40af",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  registerText: {
    color: "black",
    fontWeight: "600",
    fontSize: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // cover full screen
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LoginScreen;
