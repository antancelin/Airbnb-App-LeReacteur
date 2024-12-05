// import des packages
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";

// import des images
import logo from "../../../assets/imgs/airbnb-logo.png";

const Home = () => {
  const router = useRouter();

  const [errorMessagge, setErrorMessagge] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
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
    fetchRooms();
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
        <FlatList
          contentContainerStyle={{
            padding: 10,
          }}
          data={data}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => {
            return (
              <Link href={`/room?id=${item._id}`}>
                <View>
                  <ImageBackground
                    source={{ uri: item.photos[0]["url"] }}
                    style={{ height: 200 }}
                    resizeMode="cover"
                  >
                    <Text>{item.price}</Text>
                  </ImageBackground>
                  <View>
                    <View>
                      <Text>{item.title}</Text>
                      <View>
                        <Text>{item.reviews} reviews</Text>
                      </View>
                    </View>
                    <Image
                      source={{ uri: item.user.account.photo.url }}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: "50%",
                        resizeMode: "cover",
                      }}
                    />
                  </View>
                </View>
              </Link>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
