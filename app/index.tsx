import { View, Text, StyleSheet, Animated } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useEffect, useRef } from "react"
import { useRouter } from "expo-router";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default function SplashScreen(){
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const router = useRouter();
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 2,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
           router.replace("/auth");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);


    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.iconContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <FontAwesome5 name="clinic-medical" size={100} color="white" />
                <Text style={styles.appName}>MedRemind</Text>
            </Animated.View>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4CAF50",
        alignItems: "center",
        justifyContent: "center",
    },
    iconContainer: {
        alignItems: "center",
    },
    appName: {
        color: "white",
        fontSize: 32,
        fontWeight: "bold",
        marginTop: 20,
        letterSpacing: 1,
    },
});