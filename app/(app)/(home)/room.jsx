// import des packages
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";

// import des styles
import homeStyles from "../../../style/home";

// import des images
import logo from "../../../assets/imgs/airbnb-logo.png";

const Room = () => {
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
      <View style={homeStyles.header}>
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
