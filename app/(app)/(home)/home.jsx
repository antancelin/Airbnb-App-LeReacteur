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
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";

// import des styles
import homeStyles from "../../../style/home";

// import des images
import logo from "../../../assets/imgs/airbnb-logo.png";

const Home = () => {
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
      <View style={homeStyles.header}>
        <Image source={logo} style={homeStyles.logo} />
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color="FFBAC0"
          style={{ paddingTop: 10 }}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => {
            return (
              <Link href={`/room?id=${item._id}`}>
                <View style={homeStyles.content}>
                  <ImageBackground
                    source={{ uri: item.photos[0]["url"] }}
                    style={homeStyles.imageBackground}
                    resizeMode="cover"
                  >
                    <View style={homeStyles.price}>
                      <Text style={homeStyles.textPrice}>{item.price} €</Text>
                    </View>
                  </ImageBackground>
                  <View style={homeStyles.roomContent}>
                    <View>
                      <Text>{item.title}</Text>
                      <View>
                        <Text>{item.reviews} reviews</Text>
                      </View>
                    </View>
                    <Image
                      source={{ uri: item.user.account.photo.url }}
                      style={{
                        height: 60,
                        width: 60,
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
