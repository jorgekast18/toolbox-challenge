import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import VideoPlayer from './VideoPlayer';

const { width } = Dimensions.get('window');

// Size by types thumb or poster
const POSTER_WIDTH = 320;
const POSTER_HEIGHT = 480;
const THUMB_WIDTH = 320;
const THUMB_HEIGHT = 240;

export default function Carousel({ title, items, type = 'poster' }) {
  const isPoster = type === 'poster';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        data={items}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.itemContainer, isPoster ? styles.posterItem : styles.thumbItem]}>
            <Image
              source={{ uri: item.imageUrl }}
              style={isPoster ? styles.posterImage : styles.thumbImage}
              resizeMode="cover"
            />
            <Text style={styles.itemTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <VideoPlayer videoUrl={item.videoUrl} />
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
    paddingLeft: 12,
  },
  itemContainer: {
    marginHorizontal: 8,
  },
  posterItem: {
    width: POSTER_WIDTH,
  },
  thumbItem: {
    width: THUMB_WIDTH,
  },
  posterImage: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: 12,
    backgroundColor: '#ccc',
  },
  thumbImage: {
    width: THUMB_WIDTH,
    height: THUMB_HEIGHT,
    borderRadius: 6,
    backgroundColor: '#ccc',
  },
  itemTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});
