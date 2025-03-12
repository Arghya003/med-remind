import CircularProgress from "@/components/Circular_Progress";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const QUICK_ACTIONS: any = [
    {
        icon: "add-circle-outline" as any,
        label: "Add\nMedication",
        route: "/medications/add" as any,
        color: "#2E7D32",
        gradient: ["#4CAF50", "#2E7D32"] as any,
    },
    {
        icon: "calendar-outline" as any,
        label: "Calendar\nView",
        route: "/calendar" as any,
        color: "#1976D2",
        gradient: ["#2196F3", "#1976D2"] as any,
    },
    {
        icon: "time-outline" as any,
        label: "History\nLog",
        route: "/history" as any,
        color: "#C2185B",
        gradient: ["#E91E63", "#C2185B"] as any,
    },
    {
        icon: "medical-outline" as any,
        label: "Refill\nTracker",
        route: "/refills" as any,
        color: "#E64A19",
        gradient: ["#FF5722", "#E64A19"] as any,
    },
];


const { width } = Dimensions.get("window");
export default function HomeScreen() {
    const [completedDoses, setCompletedDoses] = useState(39);
    const totalDoses = 50
    const progress =
        completedDoses / (totalDoses * 2)


    return (
        <ScrollView
            style={styles.container}

        >
            <LinearGradient colors={["#1a8e2d", "#146922"]} style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.headerTop}>
                        <View style={styles.flex1}>
                            <Text style={styles.greeting}>Daily Progress</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.notificationIcon}>
                            <Ionicons name="notifications-outline" size={24} color="white" />
                            <View style={styles.notificationBadge}>
                                <Text style={styles.notificationCount}>
                                    {4}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <CircularProgress
                        progress={progress}
                        totalDoses={totalDoses * 2}
                        completedDoses={completedDoses}
                    />
                </View>
            </LinearGradient>
            <View style={styles.content}>
                <View style={styles.quickActionsContainer}>

                    <View style={styles.quickActionsGrid}>
                        {QUICK_ACTIONS.map((action: any) => (
                            <Link href={action.route} key={action.label} asChild>
                                <TouchableOpacity style={styles.actionButton}>
                                    <LinearGradient
                                        colors={action.gradient}
                                        style={styles.actionGradient}
                                    >
                                        <View style={styles.actionContent}>
                                            <View style={styles.actionIcon}>
                                                <Ionicons name={action.icon} size={28} color="white" />
                                            </View>
                                            <Text style={styles.actionLabel}>{action.label}</Text>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </Link>
                        ))}
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Todays Schedule</Text>
                    <Link rel="stylesheet" href="/" >
                        <TouchableOpacity>
                            <Text style={styles.seeAllButton}>See All</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
                {false? (
                    <View style={styles.emptyState}>
                        <FontAwesome5 name="clinic-medical" size={48} color="#ccc" />
                        <Text style={styles.emptyStateText}>No Medications scheduled for Today</Text>
                        <Link href={"/medications/add" as any} asChild>
                            <TouchableOpacity style={styles.addMedicationButton}>
                                <Text style={styles.addMedicationButtonText}>
                                    Add Medication
                                </Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                ) : (
                    [true].map((medication) => {

                        return (
                            <View style={styles.doseCard}>
                                <View
                                    style={[
                                        styles.doseBadge,
                                       
                                    ]}>
                                    <FontAwesome5 name="clinic-medical" size={30} color="#F4A460" />
                                </View>
                                <View style={styles.doseInfo}>
                                    <View>
                                        <Text style={styles.medicineName}>name</Text>
                                        <Text style={styles.dosageInfo}>dosage</Text>
                                    </View>
                                    <View style={styles.doseTime}>
                                        <Ionicons name="time-outline" size={16} color="#F4A460" />
                                        <Text style={styles.timeText}>Time</Text>
                                    </View>
                                </View>
                                {true ? (
                                    <View style={[styles.takenBadge]}>
                                        <Ionicons
                                            name="checkmark-circle"
                                            size={20}
                                            color="#4CAF50"
                                        />
                                        <Text style={styles.takenText}>Taken</Text>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        style={[
                                            styles.takeDoseButton,
                                            
                                        ]}
                                       // onPress={() => handleTakeDose(medication)}
                                    >
                                        <Text style={styles.takeDoseText}>Take</Text>
                                    </TouchableOpacity>
                                )}

                            </View>
                        )
                    })
                )}
            </View>
            <Modal
                visible={false}
                animationType="slide"
                transparent={true}
               // onRequestClose={() => setShowNotifications(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Notifications</Text>
                            <TouchableOpacity
                                //onPress={() => setShowNotifications(false)}
                                style={styles.closeButton}
                            >
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>
                        {[true].map((medication:any) => (
                            <View  style={styles.notificationItem}>
                                <View style={styles.notificationIcon}>
                                    <FontAwesome5 name="clinic-medical" size={30} color="#F4A460" />
                                </View>
                                <View style={styles.notificationContent}>
                                    <Text style={styles.notificationTitle}>
                                      NAME
                                    </Text>
                                    <Text style={styles.notificationMessage}>
                                       DOSAGE
                                    </Text>
                                    <Text style={styles.notificationTime}>
                                       TIMES
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </Modal>


        </ScrollView>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    header: {
        paddingTop: 50,
        paddingBottom: 25,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: {
        alignItems: "center",
        paddingHorizontal: 20,
    },
    headerTop: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 20,
    },
    greeting: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
        opacity: 0.9,
    },
    content: {
        flex: 1,
        paddingTop: 20,
    },
    quickActionsContainer: {
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    quickActionsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginTop: 15,
    },
    actionButton: {
        width: (width - 52) / 2,
        height: 110,
        borderRadius: 16,
        overflow: "hidden",
    },
    actionGradient: {
        flex: 1,
        padding: 15,
    },
    actionContent: {
        flex: 1,
        justifyContent: "space-between",
    },
    actionIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    actionLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "white",
        marginTop: 8,
    },
    section: {
        paddingHorizontal: 20,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1a1a1a",
        marginBottom: 5,
    },
    seeAllButton: {
        color: "#2E7D32",
        fontWeight: "600",
    },
    doseCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        gap:20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
    },
    doseBadge: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    doseInfo: {
        flex: 1,
        justifyContent: "space-between",
    },
    medicineName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    dosageInfo: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    doseTime: {
        flexDirection: "row",
        alignItems: "center",
    },
    timeText: {
        marginLeft: 5,
        color: "#666",
        fontSize: 14,
    },
    takeDoseButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 15,
        marginLeft: 10,
    },
    takeDoseText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
    progressContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
    },
    progressTextContainer: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },
    progressPercentage: {
        fontSize: 36,
        fontWeight: "bold",
        color: "white",
    },
    progressLabel: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.9)",
        marginTop: 4,
    },
    progressRing: {
        transform: [{ rotate: "-90deg" }],
    },
    flex1: {
        flex: 1,
    },
    notificationButton: {
        position: "relative",
        padding: 8,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 12,
        marginLeft: 8,
    },
    notificationBadge: {
        position: "absolute",
        top: -4,
        right: -4,
        backgroundColor: "#FF5252",
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#146922",
        paddingHorizontal: 4,
    },
    notificationCount: {
        color: "white",
        fontSize: 11,
        fontWeight: "bold",
    },
    progressDetails: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.8)",
        marginTop: 4,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },
    modalContent: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: "80%",
    },
    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    closeButton: {
        padding: 5,
    },
    notificationItem: {
        flexDirection: "row",
        padding: 15,
        borderRadius: 12,
        backgroundColor: "#f5f5f5",
        marginBottom: 10,
    },
    notificationIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        opacity: 0.8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 35,
        marginTop:10,
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    notificationMessage: {
        fontSize: 14,
        color: "#666",
        marginBottom: 4,
    },
    notificationTime: {
        fontSize: 12,
        color: "#999",
    },
    emptyState: {
        alignItems: "center",
        padding: 30,
        backgroundColor: "white",
        borderRadius: 16,
        marginTop: 10,
    },
    emptyStateText: {
        fontSize: 16,
        color: "#666",
        marginTop: 10,
        marginBottom: 20,
    },
    addMedicationButton: {
        backgroundColor: "#1a8e2d",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
    },
    addMedicationButtonText: {
        color: "white",
        fontWeight: "600",
    },
    takenBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E8F5E9",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginLeft: 10,
    },
    takenText: {
        color: "#4CAF50",
        fontWeight: "600",
        fontSize: 14,
        marginLeft: 4,
    },
});