import { Colors } from "../styles/colors";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome, Ionicons } from "@expo/vector-icons";

interface HeaderProps {
    reloadGame: () => void;
    pauseGame: () => void;
    isPaused: boolean;
    children: React.ReactNode;
}

export default function Header({ reloadGame, pauseGame, isPaused, children }: HeaderProps) {
    return (
        <View style={styles.container}>
    <TouchableOpacity onPress={reloadGame} hitSlop={10}>
        <Ionicons name="refresh" size={24} color={Colors.primary} />
    </TouchableOpacity>

    {children}

    <TouchableOpacity onPress={pauseGame} hitSlop={10}>
        <FontAwesome name={isPaused ? "play" : "pause"} size={24} color={Colors.primary} />
    </TouchableOpacity>
</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 12,
        marginHorizontal: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: Colors.background,
    },
});