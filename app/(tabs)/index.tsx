import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useAuth } from "~/hooks/Auth-context";

export default function Index() {
    const { signOut } = useAuth();
    return (
    <View className="flex-1 justify-center items-center">
        <Text>Edit app/index.tsx to edit this screen.</Text>
        <Button
            mode="text"
            onPress={signOut}
            icon={"logout"}
        >
            Sign Out
        </Button>
    </View>
  );
}

/*const styles = StyleSheet.create(
    {
        view: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        navButton: {
            width: 100,
            height: 30,
            backgroundColor: "coral",
            textAlign: "center",
            borderRadius: 8
        }
    }
)

 */
