import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="signup" options={{ title: "Signup" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
    </Stack>
  );
};

export default RootLayout;
