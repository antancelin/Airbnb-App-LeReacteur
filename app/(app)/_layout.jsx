import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const AppLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#F9575C",
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color = "#717171", size = 26 }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Around me",
          tabBarIcon: ({ color = "#717171", size = 26 }) => (
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "My profile",
          tabBarIcon: ({ color = "#717171", size = 26 }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default AppLayout;
