import '../global.css';
import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const isAuth = false;
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if(!isAuth && pathname !== "/Auth") {
      //router.replace("/Auth");
    }
  });
  
  return <>{children}</>;
}

export default function RootLayout() {
  return (
      <Stack>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="Auth" />
        </Stack>
      </Stack>
  );
}