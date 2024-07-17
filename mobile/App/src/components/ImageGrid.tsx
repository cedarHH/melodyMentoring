import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

const { width } = Dimensions.get('window');
const imageWidth = width / 3;  // show three pictures
const imageHeight = imageWidth * 0.95;

const images = [
    { src: require('../assets/img/welcome/2.png'), alt: "Image 2" },
    { src: require('../assets/img/welcome/3.jpg'), alt: "Image 3" },
    { src: require('../assets/img/welcome/6.jpg'), alt: "Image 6" },
    { src: require('../assets/img/welcome/7.jpg'), alt: "Image 7" },
    { src: require('../assets/img/welcome/8.jpg'), alt: "Image 8" },
    { src: require('../assets/img/welcome/anime1.png'), alt: "Anime 1" },
    { src: require('../assets/img/welcome/anime2.png'), alt: "Anime 2" },
    { src: require('../assets/img/welcome/anime3.png'), alt: "Anime 3" },
    { src: require('../assets/img/welcome/anime4.png'), alt: "Anime 4" },
    { src: require('../assets/img/welcome/anime5.png'), alt: "Anime 5" },
    { src: require('../assets/img/welcome/anime6.png'), alt: "Anime 6" },
    { src: require('../assets/img/welcome/anime7.png'), alt: "Anime 7" },
    { src: require('../assets/img/welcome/anime8.png'), alt: "Anime 8" },
    { src: require('../assets/img/welcome/anime9.png'), alt: "Anime 9" },
    { src: require('../assets/img/welcome/anime10.png'), alt: "Anime 10" },
];

const groupedImages: { src: any; alt: string; }[][] = [];
for (let i = 0; i < images.length; i += 3) {
    groupedImages.push(images.slice(i, i + 3));
}

const ImageGrid = () => {
    const scrollX = useRef(new Animated.Value(width * 1.5)).current;

    useEffect(() => {
        const animate = () => {
            Animated.loop(
                Animated.timing(scrollX, {
                    toValue: -width * 0.44,  // parameter for reset
                    duration: 15000,
                    useNativeDriver: true,
                    easing: Easing.linear,  // Uniform speed
                })
            ).start();
        };
        animate();
    }, [scrollX]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.wrapper, { transform: [{ rotate: '-5deg' },{ translateX: scrollX }] }]}>
                {groupedImages.map((group, groupIndex) => (
                    <View key={groupIndex} style={styles.column}>
                        {group.map((image, imgIndex) => (
                            <View key={imgIndex} style={styles.filmImage}>
                                <Image source={image.src} style={styles.image} />
                            </View>
                        ))}
                    </View>
                ))}
                {groupedImages.map((group, groupIndex) => (
                    <View key={groupIndex + groupedImages.length} style={styles.column}>
                        {group.map((image, imgIndex) => (
                            <View key={imgIndex} style={styles.filmImage}>
                                <Image source={image.src} style={styles.image} />
                            </View>
                        ))}
                    </View>
                ))}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1B1C1E',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    wrapper: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    column: {
        flexDirection: 'column',
    },
    filmImage: {
        width: imageWidth,
        height: imageHeight,
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default ImageGrid;
