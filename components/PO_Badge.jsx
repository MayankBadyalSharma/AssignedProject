// Badge.js
import { View, Text } from "react-native";

const Badge = ({ status }) => {
  // define colors for each status
  const getBadgeColor = (status) => {
    switch (status) {
      case "ordered":
        return "green";
      case "partial":
        return "orange";
      default:
        return "gray";
    }
  };

  return (
    <View
      style={{
        backgroundColor: getBadgeColor(status),
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ color: "white", fontSize: 12, fontWeight: "600" }}>
        {status || "No Status"}
      </Text>
    </View>
  );
};

export default Badge;
