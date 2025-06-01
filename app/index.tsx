import { Redirect } from "expo-router";

export default function Index() {
    const isAuth = true; // Replace with your actual authentication logic
    if (isAuth) {
        return <Redirect href="/(tabs)" />;
    } else {
        return <Redirect href="/Auth" />;
    }
}