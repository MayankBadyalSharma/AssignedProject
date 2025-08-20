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

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    try {
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

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#666"
                secureTextEntry
              />
              <Pressable onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </Pressable>

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
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0f172a",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderColor: "#cbd5e1",
    borderWidth: 1,
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
});

export default LoginScreen;
