import { Drawer } from "expo-router/drawer";

const ProfileLayout = () => {
  return (
    <Drawer>
      {/* <Drawer.Screen name="DashBoard" options={{ title: "DashBoard" }} /> */}

      <Drawer.Screen
        name="MaterialMasterData"
        options={{ title: "Material Master Data" }}
      />
      <Drawer.Screen name="StockLevels" options={{ title: "Stock Levels" }} />
      <Drawer.Screen
        name="PurchaseOrders"
        options={{ title: "Purchase Orders" }}
      />

      <Drawer.Screen name="PickOrders" options={{ title: "Pick Orders" }} />
      <Drawer.Screen
        name="Configurations"
        options={{ title: "Configurations" }}
      />

      {/* <Drawer.Screen name="Settings" options={{ title: "Settings" }} /> */}
      <Drawer.Screen name="profile" options={{ title: "User Profile" }} />
    </Drawer>
  );
};

export default ProfileLayout;
