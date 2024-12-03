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

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async () => {
    setErrorMessage("");
    if (password === confirmedPassword) {
      try {
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
          {
            email: email,
            username: username,
            description: description,
            password: password,
          }
        );
        Alert.alert("Sign up succeed", "Enjoy your trip with Airbnb");
        console.log(response.data);
      } catch (error) {
        if (error.response.data.email === email) {
          setErrorMessage("Cette adresse email est déjà utilisée.");
        } else if (error.response.data.username === username) {
          setErrorMessage("Ce pseudo est déjà utilisé.");
        } else if (
          error.response.data.email === "" ||
          error.response.data.username === "" ||
          error.response.data.description === "" ||
          error.response.data.password === ""
        ) {
          setErrorMessage("Veuillez remplir tous les champs.");
        } else {
          setErrorMessage("Une erreur est survenue, veuillez réessayer.");
        }
        console.log(error.message);
      }
    } else {
      Alert.alert("Passwords conflicts", "Passwords are different");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 30,
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
          placeholder="username"
          style={styles.basic}
          autoCapitalize="none"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          placeholder="Describe yourself in a few words..."
          multiline={true}
          numberOfLines={4}
          style={styles.describe}
          value={description}
          onChangeText={(text) => {
            setDescription(text);
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
        <TextInput
          secureTextEntry={true}
          placeholder="confirmed password"
          style={styles.basic}
          autoCapitalize="none"
          value={confirmedPassword}
          onChangeText={(text) => {
            setConfirmedPassword(text);
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
              handleSignup();
            }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            router.push("/login");
          }}
        >
          <Text style={styles.textLoginButton}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
