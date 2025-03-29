import { Lock } from 'lucide-react-native';
import React from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';

// Define props interface, extending TextInputProps for native props
interface TextInputWithIconProps extends TextInputProps {
  placeholder?: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  icon?: React.ReactNode; // Allow custom icon component
}

const TextInputWithIcon: React.FC<TextInputWithIconProps> = ({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  icon = <Lock size={24} color="#6b7280" />, // Default Lock icon
  ...rest // Spread remaining TextInput props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        {...rest} // Pass additional TextInput props
      />
      <View style={styles.iconContainer}>{icon}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 24, // mb-6
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db', // border-gray-300
    borderRadius: 6, // rounded-md
    paddingHorizontal: 16, // px-4
    paddingVertical: 12, // py-3
    fontSize: 16,
    paddingLeft: 48, // Space for icon
  },
  iconContainer: {
    position: 'absolute',
    left: 12,
    top: '50%',
    transform: [{ translateY: -12 }], // Center vertically
  },
});

export default TextInputWithIcon;
