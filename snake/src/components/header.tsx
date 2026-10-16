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
            <TouchableOpacity onPress={reloadGame}>
                <Ionicons name="refresh" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={pauseGame}>
                <FontAwesome name={isPaused ? "play" : "pause"} size={24} color={Colors.primary} />
            </TouchableOpacity>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.05,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: Colors.primary,
        borderWidth: 12,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomWidth: 0,
        padding: 15,
        backgroundColor: Colors.background,
    }

})