import { KeyboardAvoidingView, Platform, View, StyleSheet } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { useState } from "react";

export default function Auth() {
    const [ isSignUp, setIsSignUp ] = useState<boolean>(false);
    const [ email, setEmail ] = useState<string>("");
    const [ pwd, setPwd ] = useState<string>("");
    const [ error, setError ] = useState<string | null>("");
    
    const handleAuth = async () => {
        if( !email && !pwd ) {
            setError("Please fill in all the fields");
            return;
        }
        if ( pwd.length < 6 ) {
            setError("Password should be more than 6 character in length!");
            return;
        }
        
        setError(null);
        
        
    };
    
    const handleSwitchMode = () => {
        setIsSignUp((currentState) => (!currentState));
    }
    
    const theme = useTheme();
    
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={
            Platform.OS === "ios" ?
            "padding" :
            "height"
        }
        >
            <View
                style={styles.content}
            >
                <Text
                    style={styles.title}
                    variant="headlineMedium"
                >
                    {isSignUp ? "Create Account" : "Welcome back"}
                </Text>
                <TextInput
                    onChangeText={setEmail}
                    style={styles.input}
                    label="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="example@gmail.com"
                    mode="outlined"
                />
                <TextInput
                    onChangeText={setPwd}
                    style={styles.input}
                    label="Password"
                    autoCapitalize="none"
                    keyboardType="default"
                    mode="outlined"
                />
                {
                    error &&
                    <Text
                        style={
                        {
                            color: theme.colors.error
                        }
                        }
                    >
                        {error}
                    </Text>
                }
                <Button
                    onPress={handleAuth}
                    style={styles.button}
                    mode="contained"
                >
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
                <Button
                    style={styles.switchModeButton}
                    mode="text"
                    onPress={handleSwitchMode}
                >
                    {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                </Button>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles =  StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: "#f5f5f5"
        },
        
        content: {
            flex: 1,
            padding: 16,
            justifyContent: "center"
        },
        
        title: {
            textAlign: "center",
            marginBottom: 24
        },
        
        input: {
            marginBottom: 16
        },
        
        button: {
            marginTop: 8
        },
        switchModeButton: {
            marginTop: 16
        },
        
    }
)