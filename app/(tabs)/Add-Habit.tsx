import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ID } from "react-native-appwrite";
import { Button, SegmentedButtons, Text, TextInput, useTheme } from "react-native-paper";
import { useAuth } from "~/hooks/Auth-context";
import { database, DATABASE_ID, HABITS_COLLECTION_ID } from "~/lib/appwrite";

const FREQUENCIES = [
	"Daily",
	"Weekly",
	"Monthly",
]

type Frequency = (typeof FREQUENCIES)[number]

export default function AddHabitScreen() {
	const theme = useTheme(); 
	const [ title, setTitle ] = useState<string>( "" );
	const [ description, setDescription ] = useState<string>( "" );
	const [ frequency, setFrequency ] = useState<Frequency>("daily");
	const [ error, setError ] = useState<string>( "" );
	const { user } =useAuth();
	
	const router = useRouter();
	
	const handleSubmit = async () => {
		if (!user) {
			return;
		}
		
		try {
			await database.createDocument(
				DATABASE_ID,
				HABITS_COLLECTION_ID,
				ID.unique(),
				{
					user_id: user.$id,
					title,
					description,
					frequency,
					streak_count: 0,
					last_completed: new Date().toISOString(),
					created_at: new Date().toISOString(),
				}
			);
		} catch (error) {
		    if ( error instanceof  Error ) {
				return error.message;
			}
			
			return setError( "There was an error creating an habit" );
		}
		
		router.back();
	}
	return (
		<View
			style={styles.container}
		>
			<TextInput
				style={styles.input}
				label="Title"
				mode="outlined"
				onChangeText={setTitle}
			/>
			<TextInput
				style={styles.input}
				label="Description"
				mode="outlined"
				onChangeText={setDescription}
			/>
			<View
				style={styles.frequencyContainer}
			>
			<SegmentedButtons
				buttons=
					{
				FREQUENCIES.map((freq) => (
					{
						value: freq,
						label: freq
					}
				))
				}
				onValueChange={(value) => setFrequency(value)}
				value={frequency}
			/>
			</View>
			<Button
				mode="contained"
				disabled=
					{
				!title && !description
			}
				onPress={handleSubmit}
			>
				Add Habit
			</Button>
			
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
		</View>
	)
}

const styles = StyleSheet.create(
	{
		container: {
			flex: 1,
			padding: 16,
			backgroundColor: "#f5f5f5",
			justifyContent: "center"
		},
		input: {
			marginBottom: 16,
		},
		
		frequencyContainer: {
			marginBottom: 24
		}
	}
)