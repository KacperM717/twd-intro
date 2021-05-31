import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#B6DEFD",

    padding: 12,
    paddingTop: 24,

    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,

    marginBottom: 24,
  },
  menu: {
    display: "flex",
    flexDirection: "row",
  },
  title: {
    display: "flex",
    flexBasis: 1,
    flexGrow: 1,
    flexDirection: "column",
    marginHorizontal: 6,
  },
  bigText: {
    color: "#5603AD",
    fontSize: 36,
    fontWeight: "bold",
  },
  mediumText: {
    color: "#5603AD",
    fontSize: 16,
    fontWeight: "bold",
  },
  smallText: {
    color: "white",
    fontSize: 14,
  },
});
