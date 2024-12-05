// import des packages
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";

// import des images
import logo from "../../../assets/imgs/airbnb-logo.png";

const Room = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(
          "Error lors de la récupération des données",
          error.response.data
        );
      }
    };
    fetchRoom();
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",
          paddingVertical: 10,
          borderBottomWidth: 2,
          borderBottomColor: "#ECECEC",
        }}
      >
        <Image
          source={logo}
          style={{ height: 40, width: 40, resizeMode: "contain" }}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="FFBAC0"
          style={{ paddingTop: 10 }}
        />
      ) : (
        <Text>{data.title}</Text>
      )}
    </SafeAreaView>
  );
};

export default Room;
