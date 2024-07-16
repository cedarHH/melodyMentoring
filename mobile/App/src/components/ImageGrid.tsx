import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');
const imageWidth = width / 3;  // 每个窗口显示3个图片
const imageHeight = imageWidth * 0.75;  // 图片的高度按比例调整

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

const groups = [
    images.slice(0, 5).concat(images[0]),
    images.slice(5, 10).concat(images[5]),
    images.slice(10, 15).concat(images[10])
];

const ImageGrid = () => {
    const scrollX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const animate = () => {
            scrollX.setValue(0);  // 重置动画值
            Animated.timing(scrollX, {
                toValue: -width * 2,
                duration: 15000,  // 30秒
                useNativeDriver: true,
            }).start(animate);  // 在动画结束时重新开始
        };
        animate();
    }, [scrollX]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.wrapper, { transform: [{ translateX: scrollX }] }]}>
                {groups.map((group, groupIndex) => (
                    <View key={groupIndex} style={styles.column}>
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

    },
    wrapper: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    column: {
        flexDirection: 'column',
        marginLeft: 10, // 防止图片间隙
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
