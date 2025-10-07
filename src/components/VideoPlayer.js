import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import Video from 'react-native-video';
import PlayIcon from '../assets/play_icon.png';
import CloseIcon from '../assets/close_icon.png';

const { width } = Dimensions.get('window');

export default function VideoPlayer({ videoUrl }) {
  const [visible, setVisible] = useState(false);

  const buttonText = videoUrl ? 'Ver Video' : 'Video no disponible'
  const openVideo = () => {
    if (videoUrl)
      setVisible(true);

  };

  const closeVideo = () => setVisible(false);

  return (
    <View>
      <TouchableOpacity disabled={!videoUrl} style={[videoUrl ? styles.buttonPlay : styles.buttonPlayDisabled]} onPress={openVideo} activeOpacity={0.8}>
        <Image source={PlayIcon} style={styles.playIcon} />
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={closeVideo}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={closeVideo} style={styles.closeButton}>
            <Image source={CloseIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          {videoUrl ? (
            <Video
              source={{ uri: videoUrl }}
              style={styles.video}
              controls={true}
              resizeMode="contain"
              fullscreen
            />
          ) : (
            <Text style={styles.errorText}>Video no disponible</Text>
          )}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonPlay: {
    flexDirection: 'row',
    backgroundColor: '#E50914',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonPlayDisabled: {
    flexDirection: 'row',
    backgroundColor: '#c7c6c6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    marginLeft: 8,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  video: {
    width: width,
    height: (width * 9) / 16,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  playIcon: {
    width: 24,
    height: 24,
  },
  closeIcon: {
    marginTop: 15,
    width: 30,
    height: 30,
  }
});
