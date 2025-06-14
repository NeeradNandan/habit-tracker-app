import '../global.css';
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "~/hooks/Auth-context";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoadingUser } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  useEffect(() => {
    const inAuthGroup = segments[0] === "Auth";
    
    if( !user && !inAuthGroup && !isLoadingUser ) {
      router.replace( "/Auth" );
    } else if ( user && inAuthGroup && !isLoadingUser ) {
      router.replace( "/" );
    }
  }, [ user, segments ] );
  
  return <>{children}</>;
}

export default function RootLayout() {
  const segments = useSegments();
  
  return (
      <GestureHandlerRootView
          style={{
            flex: 1
          }}
      >
        <AuthProvider>
          <PaperProvider>
            <SafeAreaProvider>
              <RouteGuard>
                <Stack
                    screenOptions={
                  {
                    title: segments[0] === "Auth" ? "Login or Register" : ""
                  }
                    }
                >
                  <Stack.Screen
                      name="(tabs)"
                      options={
                    {
                      headerShown: false
                    }
                  } />
                </Stack>
              </RouteGuard>
            </SafeAreaProvider>
          </PaperProvider>
        </AuthProvider>
      </GestureHandlerRootView>
  );
}