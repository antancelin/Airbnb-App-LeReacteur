import { Stack, useRouter } from "expo-router";
import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const RootLayout = () => {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setUserId(await AsyncStorage.getItem("id"));
      setUserToken(await AsyncStorage.getItem("token"));
    };
    fetchData();

    if (userId && userToken) {
      router.replace("/home");
    } else {
      router.replace("/");
    }
  }, [userId, userToken]);

  const login = async (userId, userToken) => {
    setUserId(userId);
    setUserToken(userToken);
    await AsyncStorage.setItem("id", userId);
    await AsyncStorage.setItem("token", userToken);
  };
  const logout = async () => {
    setUserId(null);
    setUserToken(null);
    await AsyncStorage.removeItem("id");
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthContext.Provider>
  );
};

export default RootLayout;
