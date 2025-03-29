import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TouchableOpacityProps } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Default icon set

// Define props interface, extending TouchableOpacityProps for additional flexibility
interface IconButtonProps extends TouchableOpacityProps {
  text: string;
  iconName?: string; // Icon name from the icon set
  iconSize?: number;
  iconColor?: string;
  iconSet?: any; // Allows different icon sets (e.g., FontAwesome5, MaterialIcons)
}

const IconButton: React.FC<IconButtonProps> = ({
  text,
  iconName,
  iconSize = 20,
  iconColor = '#6b7280',
  iconSet: Icon = FontAwesome5, // Default to FontAwesome5
  onPress,
  style, // Allow custom styles to override
  ...touchableProps
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]} // Merge default styles with custom styles
      onPress={onPress}
      {...touchableProps}>
      <View style={styles.content}>
        {iconName && <Icon name={iconName} size={iconSize} color={iconColor} style={styles.icon} />}
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff', // bg-white
    borderWidth: 1, // border
    borderColor: '#d1d5db', // border-gray-300
    borderRadius: 6, // rounded-md
    paddingVertical: 12, // py-3
    marginBottom: 12, // mb-3
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // Space between icon and text
  },
  buttonText: {
    color: '#374151', // text-gray-700
    fontWeight: '500', // font-medium
    fontSize: 16,
  },
  icon: {
    marginRight: 8, // Additional spacing control
  },
});

export default IconButton;
