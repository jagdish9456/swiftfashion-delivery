import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SlideView } from '../animations/SlideView';

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Popup: React.FC<PopupProps> = ({ visible, onClose, children }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <SlideView direction="up" duration={300}>
          <View style={styles.content}>
            <TouchableOpacity activeOpacity={1}>
              {children}
            </TouchableOpacity>
          </View>
        </SlideView>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: Dimensions.get('window').height * 0.9,
  },
});