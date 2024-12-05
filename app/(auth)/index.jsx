// import des packages
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../_layout";

// import du style
import styles from "../../style/style";

// import d'icones
import FontAwesome from "@expo/vector-icons/FontAwesome";

// import d'images
import logo from "../../assets/imgs/airbnb-logo.png";

const Login = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);

  const handleLogin = async () => {
    setErrorMessage("");
    if (email === "" || password === "") {
      Alert.alert(
        "Parameter(s) missing(s)",
        "At least one parameter is missing"
      );
    }
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      Alert.alert("Log in succeed", "Enjoy your trip with Airbnb");
      login(response.data.id, response.data.token);
      console.log(response.data);
    } catch (error) {
      if (
        error.response.data.error === "This account doesn't exist !" ||
        error.response.data.error === "Unauthorized"
      ) {
        setErrorMessage("Mauvaise adresse email ou mot de passe.");
      } else {
        setErrorMessage("Une erreur est survenue, veuillez réessayer.");
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 80,
        marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 20,
      }}
    >
      <View style={styles.logoContent}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Sign in</Text>
      </View>
      <View style={styles.inputs}>
        <View style={styles.inputContainer}>
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
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={visiblePassword ? false : true}
            placeholder="password"
            style={styles.basic}
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          {visiblePassword ? (
            <TouchableOpacity
              onPress={() => {
                setVisiblePassword(false);
              }}
            >
              <FontAwesome name="eye-slash" size={24} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setVisiblePassword(true);
              }}
            >
              <FontAwesome name="eye" size={24} color="#727272" />
            </TouchableOpacity>
          )}
        </View>
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
            router.push("/signup");
          }}
        >
          <Text style={styles.textLoginButton}>No account ? Resgister</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
