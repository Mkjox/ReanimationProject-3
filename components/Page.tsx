import React from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";

interface PageProps {
    title: string;
    index: number;
    translateX: SharedValue<number>;
}

const { height, width } = Dimensions.get('window');
const SIZE = width * 0.7;

const Page: React.FC<PageProps> = ({ index, title, translateX }) => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

    const rStyle = useAnimatedStyle(() => {

        const scale = interpolate(
            translateX.value,
            inputRange,
            [0, 1, 0],
            Extrapolation.CLAMP
        )

        const borderRadius = interpolate(
            translateX.value,
            inputRange,
            [0, SIZE / 2, 0],
            Extrapolation.CLAMP
        );


        return {
            borderRadius,
            transform: [{ scale }]
        }
    })

    const rTextStyle = useAnimatedStyle(() => {
        const translateY = interpolate(
            translateX.value,
            inputRange,
            [height/2, 0, -height/2],
            Extrapolation.CLAMP
        )

        const opacity = interpolate(
            translateX.value,
             inputRange,
             [-2,1,-2],
             Extrapolation.CLAMP
            )

        return {
            opacity,
            transform: [{
                translateY
            }]

        }
    })

    return (
        <View style={[styles.pageContainer, { backgroundColor: `rgba(0,0,256, 0.${index + 2})` }]}>
            <Animated.View style={[styles.square, rStyle]} />
            <Animated.View style={[{ position: 'absolute' }, rTextStyle]}>
                <Text style={styles.text}>
                    {title}
                </Text>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center'
    },
    square: {
        height: SIZE,
        width: SIZE,
        backgroundColor: 'rgba(0,256,256, 0.4)'
    },
    text: {
        fontSize: 50,
        color: 'white',
        textTransform: 'uppercase',
        fontWeight: '700'
    }
})

export { Page };