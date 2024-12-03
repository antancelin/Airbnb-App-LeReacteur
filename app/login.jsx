// import des packages
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import axios from "axios";
import { useState } from "react";

// import du style
import styles from "../style/style";

// import d'images
import logo from "../assets/imgs/airbnb-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      Alert.alert("Log in succeed", "Enjoy your trip with Airbnb");
      console.log(response.data);
    } catch (error) {
      if (error.response.data.message === "wrong email or password") {
        setErrorMessage("Mauvaise adresse email ou mot de passe.");
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réessayer.");
      }
      console.log(error.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 80,
      }}
    >
      <View style={styles.logoContent}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Sign up</Text>
      </View>
      <View style={styles.inputs}>
        <TextInput
          keyboardType="email-address"
          placeholder="email"
          style={styles.basic}
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="password"
          style={styles.basic}
          autoCapitalize="none"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>
      <View style={styles.buttons}>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity style={styles.signupButton}>
          <Text
            style={styles.textSignupButton}
            onPress={() => {
              handleLogin();
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            router.push("/login");
          }}
        >
          <Text style={styles.textLoginButton}>No account ? Resgister</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
