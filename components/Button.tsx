import { ChevronRight, LucideIcon } from 'lucide-react-native'; // Import LucideIcon type
import { forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

// Define props interface
type ButtonProps = {
  title: string;
  icon?: LucideIcon; // Optional icon from lucide-react-native
  iconSize?: number; // Optional icon size
  iconColor?: string; // Optional icon color
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      title,
      icon: Icon = ChevronRight, // Default icon
      iconSize = 24,
      iconColor = '#ffffff', // Default to white to match text
      ...touchableProps
    },
    ref
  ) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...touchableProps}
        style={[
          styles.button,
          touchableProps.style, // Merge with any additional styles passed via props
        ]}>
        <View style={styles.content}>
          <Text style={styles.buttonText}>{title}</Text>
          {Icon && <Icon size={iconSize} color={iconColor} />}
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#6366f1', // bg-indigo-500
    borderRadius: 28, // rounded-[28px]
    shadowColor: '#000', // shadow-md
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    padding: 16, // p-4
  },
  buttonText: {
    color: '#ffffff', // text-white
    fontSize: 18, // text-lg
    fontWeight: '600', // font-semibold
    textAlign: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // Space between text and icon
  },
});

Button.displayName = 'Button'; // Optional: for better debugging in React DevTools

export default Button;
