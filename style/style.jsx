import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  logoContent: {
    alignItems: "center",
    gap: 5,
  },

  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "#717171",
  },

  logo: {
    width: 100,
    height: 105,
  },

  inputs: {
    gap: 20,
    marginVertical: 20,
  },

  describe: {
    borderWidth: 1,
    borderColor: "#FFBAC0",
    padding: 5,
    height: 100,
  },

  basic: {
    borderBottomWidth: 1,
    borderBottomColor: "#FFBAC0",
    width: 320,
    padding: 5,
  },

  buttons: {
    gap: 20,
    alignItems: "center",
  },

  errorMessage: {
    color: "red",
    fontSize: 14,
  },

  signupButton: {
    width: 235,
    height: 65,
    borderWidth: 3,
    borderColor: "#F9575C",
    borderRadius: 30,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  textSignupButton: {
    color: "#727272",
    fontSize: 18,
    fontWeight: "500",
  },

  textLoginButton: {
    color: "#727272",
    fontSize: 14,
  },
});

export default styles;
