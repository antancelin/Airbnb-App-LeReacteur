import { Stack, useRouter } from "expo-router";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const RootLayout = () => {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    if (userId && userToken) {
      router.replace("/home");
    } else {
      router.replace("/");
    }
  }, [userId, userToken]);

  const login = (userId, userToken) => {
    setUserId(userId);
    setUserToken(userToken);
  };
  const logout = () => {
    setUserId(null);
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthContext.Provider>
  );
};

export default RootLayout;
