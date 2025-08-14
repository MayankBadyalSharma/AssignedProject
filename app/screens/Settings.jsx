// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";

// const data = [
//   { id: "1", title: "Walking" },
//   { id: "2", title: "Cycling" },
//   { id: "3", title: "Driving" },
//   { id: "4", title: "Train" },
//   { id: "5", title: "Hiking" },
//   { id: "6", title: "Flight" },
// ];

// const SettingsGrid = () => {
//   const renderItem = ({ item }) => (
//     <TouchableOpacity style={styles.card}>
//       <Text style={styles.title}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         numColumns={2}
//         contentContainerStyle={styles.grid}
//       />
//     </View>
//   );
// };

// export default SettingsGrid;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     padding: 20,
//   },
//   grid: {
//     gap: 16,
//     justifyContent: "center",
//   },
//   card: {
//     flex: 1,
//     backgroundColor: "#f2f2f2",
//     borderRadius: 16,
//     height: 200,
//     margin: 8,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "500",
//     color: "#333",
//   },
// });
