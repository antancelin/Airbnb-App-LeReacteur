import { StyleSheet } from "react-native";

const homeStyles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#ECECEC",
  },

  logo: {
    height: 40,
    width: 40,
    resizeMode: "contain",
  },

  content: {
    padding: 10,
    width: "100%",
  },

  imageBackground: {
    height: 220,
    justifyContent: "flex-end",
  },

  price: {
    marginBottom: 10,
    backgroundColor: "#000",
    color: "#fff",
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },

  textPrice: {
    padding: 10,
    color: "#fff",
    fontSize: 16,
  },

  roomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default homeStyles;
