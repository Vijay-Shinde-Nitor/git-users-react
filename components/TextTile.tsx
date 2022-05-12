import { View, Text, StyleSheet } from "react-native"

export const TextTile = ({ title, data }: { title: string, data: string }) => {
    return (<View style={styles.container}>
        <Text style={styles.title}>{title}:</Text>
        <Text style={styles.data} numberOfLines={2}>{data}</Text>
    </View>);
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        margin: 8
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
        paddingRight: 8,
    },
    data: {
        fontWeight: "normal",
        fontSize: 16,
        overflow: "hidden",
        paddingRight: 8        
    },
})