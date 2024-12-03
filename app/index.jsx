// import des packages
import { View, Text, Button, Image } from "react-native";
import { router } from "expo-router";

// import du style
import styles from "../style/style";

// import d'images
import logo from "../assets/imgs/airbnb-logo.png";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>Airbnb</Text>
      <Button
        title="Signup"
        onPress={() => {
          router.push("/signup");
        }}
      />
      <Button
        title="Login"
        onPress={() => {
          router.push("/login");
        }}
      />
    </View>
  );
}
