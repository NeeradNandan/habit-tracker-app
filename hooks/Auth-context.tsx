import { useRouter } from "expo-router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "~/lib/appwrite";

type AuthContextType = {
	user: Models.User<Models.Preferences> | null,
	signUp: ( email: string, password: string ) => Promise<string | null>,
	signIn: ( email: string, password: string ) => Promise<string | null>,
	signOut: () => Promise<void>,
	isLoadingUser: boolean,
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: React.ReactNode }) {
	
	const router = useRouter();
	
	const [ user, setUser ] = useState<Models.User<Models.Preferences> | null>(null);
	const [ isLoadingUser, setIsLoadingUser ] = useState<boolean>(true);
	
	useEffect(() => {
		getUser();
	}, []);
	
	const getUser = async () => {
		try {
			const session = await account.get();
			setUser( session );
		} catch (error) {
			console.log( error );
			setUser( null );
		} finally {
			setIsLoadingUser( false );
		}
	};
	const signUp = async ( email: string, password: string) => {
		try {
		    await account.create(ID.unique(), email, password);
			await signIn( email, password );
			return null;
		} catch (error) {
			if ( error instanceof Error ) {
				return  error.message;
			}
			
			return "An error occurred during Sign Up"
		}
	};
	
	const signIn = async ( email: string, password: string ) => {
		try {
		    await account.createEmailPasswordSession( email, password );
			const session = await account.get();
			setUser( session );
			return null;
		} catch (error) {
			if ( error instanceof Error ) {
				return  error.message;
			}
			
			return "An error occurred during Sign In"
		}
	};
	
	const signOut = async () => {
		/*try {
			await account.deleteSession("current");
			setUser( null );
		} catch (error) {
		    console.error(error);
		}*/
		try {
			// Check if a session exists before deleting
			await account.getSession("current");
			await account.deleteSession("current");
			setUser(null);
			router.replace("/Auth"); // Optional: Reinforce redirect
		} catch (error) {
			if (error instanceof Error && error.message.includes("general_unauthorized_scope")) {
				// No session exists, treat as already signed out
				setUser(null);
				router.replace("/Auth"); // Optional: Reinforce redirect
			} else {
				console.error("Sign out error:", error);
				throw error; // Re-throw unexpected errors for debugging
			}
		}
	}
	
	return (
		<AuthContext.Provider value={{ user, isLoadingUser, signIn, signUp, signOut }}>
		{ children }
	</AuthContext.Provider>
	);
}


export function useAuth() {
	const context  = useContext( AuthContext );
	
	if ( context === undefined ) {
		throw new Error( "useAuth must be inside of the AuthProvider" );
	}
	
	return context;
	
}