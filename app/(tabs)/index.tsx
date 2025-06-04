import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Query, ID } from "react-native-appwrite";
import { Swipeable } from "react-native-gesture-handler";
import { Button, Surface, Text } from "react-native-paper";
import { useAuth } from "~/hooks/Auth-context";
import { client, database, DATABASE_ID, HABITS_COLLECTION_ID, HABITS_COMPLETION_COLLECTION_ID, RealTimeResponse } from "~/lib/appwrite";
import { Habit, HabitCompletions } from "~/types/database.type";

export default function Index() {
    const { signOut, user } = useAuth();
    const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});
    
    const [ habits, setHabits ] = useState<Habit[]>();
    const [ completedHabits, setCompletedHabits ] = useState<string[]>();
    
    useEffect( () => {
        if ( user ) {
            const habitsChannel = `databases.${ DATABASE_ID }.collections.${ HABITS_COLLECTION_ID }.documents`;
            const habitSubscription = client.subscribe(
                habitsChannel,
                ( response: RealTimeResponse ) => {
                    if ( response.events.includes( "databases.*.collections.*.documents.*.create" ) ) {
                        fetchHabit();
                    } else if ( response.events.includes( "databases.*.collections.*.documents.*.update" ) ) {
                        fetchHabit();
                    } else if ( response.events.includes( "databases.*.collections.*.documents.*.delete" ) ) {
                        fetchHabit();
                    }
                }
            );
            
            const completionsChannel = `databases.${ DATABASE_ID }.collections.${ HABITS_COMPLETION_COLLECTION_ID }.documents`;
            const habitsCompletionSubscription = client.subscribe(
                completionsChannel,
                ( response: RealTimeResponse ) => {
                    if ( response.events.includes( "databases.*.collections.*.documents.*.create" ) ) {
                        fetchTodayCompletions();
                    }
                }
            );
            
            
            
            fetchHabit();
            fetchTodayCompletions();
            
            return () => {
                habitSubscription();
                habitsCompletionSubscription();
            }
        }
    }, [ user ] );
    const fetchHabit = async () => {
        try {
            const response = await database.listDocuments(
                DATABASE_ID,
                HABITS_COLLECTION_ID,
                [
                    Query.equal( "user_id", user?.$id ?? "" )
                ]
                );
            
            setHabits( response.documents as Habit[] );
        } catch (error) {
            console.error( error );
        }
    };
    
    const fetchTodayCompletions = async () => {
        try {
            const today = new Date();
            today.setHours( 0, 0, 0, 0 );
            const response = await database.listDocuments(
                DATABASE_ID,
                HABITS_COMPLETION_COLLECTION_ID,
                [
                    Query.equal( "user_id", user?.$id ?? "" ),
                    Query.greaterThanEqual( "completed_at", today.toISOString() ),
                ]
            );
            
            const completions = response.documents as HabitCompletions[];
            
            setCompletedHabits( completions.map( ( c ) => c.habit_id ) );
        } catch (error) {
            console.error( error );
        }
    };
    
    const handleDelete = async ( id: string ) => {
        try {
            await database.deleteDocument( DATABASE_ID, HABITS_COLLECTION_ID, id )
        } catch (error) {
            console.error( error );
        }
    };
    
    const handleComplete = async ( id: string ) => {
        if ( !user || completedHabits?.includes(id) ) return;
        
        try {
            const currentDate = new Date().toISOString();
            
            await database.createDocument(
                DATABASE_ID,
                HABITS_COMPLETION_COLLECTION_ID,
                ID.unique(),
                {
                    habit_id: id,
                    user_id: user.$id ,
                    completed_at: currentDate,
                }
                );
            
            const habit = habits?.find( ( habit ) => habit.$id === id );
            
            if(!habit) return;
            
            await database.updateDocument(
                DATABASE_ID,
                HABITS_COLLECTION_ID,
                id,
                {
                    streak_count: habit.streak_count + 1,
                    last_completed: currentDate,
                }
            );
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const isHabitCompleted = ( habitID: string ) =>
        completedHabits?.includes( habitID );
    
    const renderLeftActions = () => (
        <View
            style={styles.swipeLeftActions}
        >
            <MaterialCommunityIcons
                name="trash-can"
                size={32}
                color="#fff"
            />
        </View>
    );
    const renderRightActions = ( habitID: string ) => (
            <View
                style={styles.swipeRightActions}
            >
                { isHabitCompleted( habitID ) ? (
                    <Text
                        style={{ color: "#fff" }}
                    >
                        Completed!
                    </Text>
                                                ) : (
                <MaterialCommunityIcons
                    name="check-circle-outline"
                    size={32}
                    color="#fff"
                />)
                }
            </View>
        );
    
    return (
    <View
        style={styles.container}
    >
        <View
            style={styles.header}
        >
           <Text
               variant="titleLarge"
               style={styles.title}
           >
               Today's Habits
           </Text>
            <Button
                mode="text"
                onPress={signOut}
                icon="logout"
            >
                Sign Out
            </Button>
        </View>
        
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
        {
            habits?.length === 0 ? (
                <View
                    style={styles.noHabitContainer}
                >
                    <Text
                        style={styles.noHabitText}
                    >
                        No Habits yet. Add your first Habit
                    </Text>
                </View>
            ) : (
                habits?.map(( habit, key ) => (
                    <Swipeable
                        ref={
                            ( ref ) => {
                                swipeableRefs.current[
                                    habit.$id
                                    ] = ref;
                            }
                        }
                        key={key}
                        overshootLeft={false}
                        overshootRight={false}
                        renderLeftActions={renderLeftActions}
                        renderRightActions={() => renderRightActions( habit.$id )}
                        onSwipeableOpen={( direction ) => {
                            if ( direction === "left" ) {
                                handleDelete( habit.$id )
                            } else if ( direction === "right" ) {
                                    handleComplete( habit.$id );
                            }
                            swipeableRefs.current[ habit.$id ]?.close();
                        }
                    }
                    >
                        <Surface
                            style={[ styles.card, isHabitCompleted( habit.$id ) && styles.cardCompleted ]}
                            elevation={0}
                        >
                            <View
                                style={styles.cardContent}
                            >
                                <Text
                                    style={styles.cardTitle}
                                >
                                    {
                                        habit.title
                                    }
                                </Text>
                                <Text
                                    style={styles.cardDescription}
                                >
                                    {
                                        habit.description
                                    }
                                </Text>
                                <View
                                    style={styles.cardFooter}
                                >
                                    <View
                                        style={styles.streakBadge}
                                    >
                                        <MaterialCommunityIcons
                                            name="fire"
                                            size={18}
                                            color="#ff9800"
                                        />
                                        <Text
                                            style={styles.streakText}
                                        >
                                            {
                                                habit.streak_count
                                            } day streak
                                        </Text>
                                    </View>
                                    <View
                                        style={styles.frequencyBadge}
                                    >
                                        <Text
                                            style={styles.frequencyText}
                                        >
                                            {
                                                habit.frequency
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Surface>
                    </Swipeable>
                ))
                
            )
            
        }
        </ScrollView>
        
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
    },
    title: {
        fontWeight: "bold"
    },
    card: {
        marginBottom: 18,
        borderRadius: 18,
        backgroundColor: "#f7f2fa",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4
    },
    cardCompleted: {
        opacity: 0.6
    },
    cardContent: {
        padding: 20
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#22233b"
    },
     cardDescription: {
         fontSize: 15,
         marginBottom: 16,
         color: "#6c6c80"
     },
    cardFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    streakBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff3b0",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    streakText: {
        marginLeft: 6,
        color: "#ff9800",
        fontWeight: "bold",
        fontSize: 14,
    },
    frequencyBadge: {
         backgroundColor: "#ede7f6",
         borderRadius: 12,
         paddingHorizontal: 12,
         paddingVertical: 4,
    },
    frequencyText: {
         color: "#7c4dff",
         fontWeight: "bold",
         fontSize: 14,
    },
    noHabitContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    noHabitText: {
        color: "#666666"
    },
    swipeLeftActions: {
        justifyContent: "center",
        alignItems: "flex-start",
        flex: 1,
        backgroundColor: "#e53935",
        borderRadius: 18,
        marginBottom: 18,
        marginTop: 2,
        paddingLeft: 16,
    },
    swipeRightActions: {
        backgroundColor: "#4caf50",
        justifyContent: "center",
        alignItems: "flex-end",
        flex: 1,
        borderRadius: 18,
        marginBottom: 18,
        marginTop: 2,
        paddingRight: 16,
    }
})


