import '../global.css';
import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
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
  return (
      <AuthProvider>
        <RouteGuard>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </RouteGuard>
      </AuthProvider>
  );
}