// import des packages
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
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

const Signup = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    setErrorMessage("");
    setIsLoading(true);
    if (password === confirmedPassword) {
      if (
        email === "" ||
        username === "" ||
        description === "" ||
        password === "" ||
        confirmedPassword === ""
      ) {
        Alert.alert(
          "Parameter(s) missing(s)",
          "At least one parameter is missing"
        );
      } else {
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
          setIsLoading(false);
          login(response.data.id, response.data.token);
          console.log(response.data);
        } catch (error) {
          if (
            error.response.data.error === "This email already has an account."
          ) {
            setErrorMessage("Cette adresse email est déjà utilisée.");
          } else if (
            error.response.data.error ===
            "This username already has an account."
          ) {
            setErrorMessage("Ce pseudo est déjà utilisé.");
          } else {
            setErrorMessage("Une erreur est survenue, veuillez réessayer.");
          }
        }
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
        marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 20,
      }}
    >
      <View style={styles.logoContent}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Sign up</Text>
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
            placeholder="username"
            style={styles.basic}
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
        </View>
        <View style={styles.inputContainerDescription}>
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
              <FontAwesome name="eye-slash" size={24} color="#727272" />
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
        <View style={styles.inputContainer}>
          <TextInput
            secureTextEntry={visiblePassword ? false : true}
            placeholder="confirmed password"
            style={styles.basic}
            autoCapitalize="none"
            value={confirmedPassword}
            onChangeText={(text) => {
              setConfirmedPassword(text);
            }}
          />
          {visiblePassword ? (
            <TouchableOpacity
              onPress={() => {
                setVisiblePassword(false);
              }}
            >
              <FontAwesome name="eye-slash" size={24} color="#727272" />
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
        {isLoading ? (
          <ActivityIndicator size="small" color="FFBAC0" />
        ) : (
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
        )}

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            router.push("/");
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
