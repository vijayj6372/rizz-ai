# Role & Purpose
You are an expert full-stack Web Developer specializing in React, Next.js (App Router), Tailwind CSS, and Web Storage APIs. Your task is to take my existing React Native (Expo) app source code and port it into a production-ready Next.js web application with 100% feature parity.

---

## Architecture & Conversion Rules

### 1. UI & Component Mapping
- Convert native UI primitives to standard Web/HTML elements styled with Tailwind CSS:
  - `<View>` ➔ `<div>` or semantic HTML (`<section>`, `<main>`, `<article>`)
  - `<Text>` ➔ `<p>`, `<span>`, `<h1>-<h6>`
  - `<TouchableOpacity>` / `<Pressable>` ➔ `<button>`
  - `<TextInput>` ➔ `<input>` / `<textarea>`
  - `<ScrollView>` ➔ `<div>` with `overflow-y-auto`
  - `<FlatList>` ➔ Standard `.map()` rendering inside a container
  - `<Image>` ➔ Next.js `<Image />` component from `next/image`

### 2. State & Storage Architecture (`localStorage`)
- Replace `@react-native-async-storage/async-storage` (or any MMKV/SecureStore implementation) with `localStorage`.
- **SSR / Hydration Safety:** Create a robust, custom React hook (e.g., `useLocalStorage`) or utility wrapper to safely handle `localStorage` without triggering Next.js SSR hydration mismatches (checking `typeof window !== 'undefined'`).

### 3. Navigation
- Replace React Navigation / Expo Router (`useNavigation`, `useRouter`, `<Stack>`, `<Tabs>`) with Next.js App Router (`next/navigation`):
- Map mobile screens to the file-system router (`app/page.tsx`, `app/dashboard/page.tsx`, etc.).
- Use Next.js `<Link>` components for internal navigation.

### 4. Responsiveness & Layout
- Recreate the mobile layout cleanly for web. Ensure it looks great on desktop while maintaining a responsive layout for mobile browsers (e.g., centering mobile container or expanding fluidly using Tailwind responsive utilities `md:`, `lg:`).

---

## Technical Stack Requirements
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Icons:** `lucide-react` (replacing `@expo/vector-icons`)
- **State Management:** React Context / `useState` + `localStorage`

---

## Deliverables Required
1. **Helper Utilities:** The safe `useLocalStorage` custom hook implementation.
2. **Converted Pages & Components:** Clean Next.js page components with full logic and Tailwind UI.
3. **App Layout:** Root layout (`app/layout.tsx`) set up with necessary providers.

---

## Source Code to Port:
[ import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';

interface CopiedToastProps {
  visible: boolean;
  onHide: () => void;
}

const CopiedToast: React.FC<CopiedToastProps> = ({ visible, onHide }) => {
  const translateY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Slide up and fade in
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after 2 seconds
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: 100,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => onHide());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View style={styles.toast}>
        <Text style={styles.checkIcon}>✓</Text>
        <Text style={styles.text}>Copied to clipboard!</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  checkIcon: {
    fontSize: 16,
    color: '#22C55E',
    marginRight: 8,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
});

export default CopiedToast;
 and import React, { Component, ComponentType, PropsWithChildren } from "react";
import { ErrorFallback, ErrorFallbackProps } from "@/components/ErrorFallback";

export type ErrorBoundaryProps = PropsWithChildren<{
  FallbackComponent?: ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, stackTrace: string) => void;
}>;

type ErrorBoundaryState = { error: Error | null };

/**
 * This is a special case for for using the class components. Error boundaries must be class components because React only provides error boundary functionality through lifecycle methods (componentDidCatch and getDerivedStateFromError) which are not available in functional components.
 * https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static defaultProps: {
    FallbackComponent: ComponentType<ErrorFallbackProps>;
  } = {
    FallbackComponent: ErrorFallback,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }): void {
    if (typeof this.props.onError === "function") {
      this.props.onError(error, info.componentStack);
    }
  }

  resetError = (): void => {
    this.setState({ error: null });
  };

  render() {
    const { FallbackComponent } = this.props;

    return this.state.error && FallbackComponent ? (
      <FallbackComponent
        error={this.state.error}
        resetError={this.resetError}
      />
    ) : (
      this.props.children
    );
  }
}
and import React, { useState } from "react";
import { reloadAppAsync } from "expo";
import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  Text,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Fonts, AppColors } from "@/constants/theme";

export type ErrorFallbackProps = {
  error: Error;
  resetError: () => void;
};

export function ErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const { theme } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleRestart = async () => {
    try {
      await reloadAppAsync();
    } catch (restartError) {
      console.error("Failed to restart app:", restartError);
      resetError();
    }
  };

  const formatErrorDetails = (): string => {
    let details = `Error: ${error.message}\n\n`;
    if (error.stack) {
      details += `Stack Trace:\n${error.stack}`;
    }
    return details;
  };

  return (
    <ThemedView style={styles.container}>
      {__DEV__ ? (
        <Pressable
          onPress={() => setIsModalVisible(true)}
          style={({ pressed }) => [
            styles.topButton,
            {
              backgroundColor: theme.backgroundDefault,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Feather name="alert-circle" size={20} color={theme.text} />
        </Pressable>
      ) : null}

      <View style={styles.content}>
        <ThemedText type="h1" style={styles.title}>
          Oops! Rizz AI hit a snag
        </ThemedText>

        <ThemedText type="body" style={styles.message}>
          Something went wrong. Tap below to get back to finding those perfect pickup lines.
        </ThemedText>

        <Pressable
          onPress={handleRestart}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: AppColors.primary,
              opacity: pressed ? 0.9 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            },
          ]}
        >
          <ThemedText
            type="body"
            style={[styles.buttonText, { color: theme.buttonText }]}
          >
            Restart Rizz AI
          </ThemedText>
        </Pressable>
      </View>

      {__DEV__ ? (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <ThemedView style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <ThemedText type="h2" style={styles.modalTitle}>
                  Error Details
                </ThemedText>
                <Pressable
                  onPress={() => setIsModalVisible(false)}
                  style={({ pressed }) => [
                    styles.closeButton,
                    { opacity: pressed ? 0.6 : 1 },
                  ]}
                >
                  <Feather name="x" size={24} color={theme.text} />
                </Pressable>
              </View>

              <ScrollView
                style={styles.modalScrollView}
                contentContainerStyle={styles.modalScrollContent}
                showsVerticalScrollIndicator
              >
                <View
                  style={[
                    styles.errorContainer,
                    { backgroundColor: theme.backgroundDefault },
                  ]}
                >
                  <Text
                    style={[
                      styles.errorText,
                      {
                        color: theme.text,
                        fontFamily: Fonts?.mono || "monospace",
                      },
                    ]}
                    selectable
                  >
                    {formatErrorDetails()}
                  </Text>
                </View>
              </ScrollView>
            </ThemedView>
          </View>
        </Modal>
      ) : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing["2xl"],
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.lg,
    width: "100%",
    maxWidth: 600,
  },
  title: {
    textAlign: "center",
  },
  message: {
    textAlign: "center",
    opacity: 0.7,
  },
  topButton: {
    position: "absolute",
    top: Spacing["2xl"] + Spacing.lg,
    right: Spacing.lg,
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  button: {
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing["2xl"],
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontWeight: "600",
    textAlign: "center",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    width: "100%",
    height: "90%",
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(128, 128, 128, 0.2)",
  },
  modalTitle: {
    fontWeight: "600",
  },
  closeButton: {
    padding: Spacing.xs,
  },
  modalScrollView: {
    flex: 1,
  },
  modalScrollContent: {
    padding: Spacing.lg,
  },
  errorContainer: {
    width: "100%",
    borderRadius: BorderRadius.md,
    overflow: "hidden",
    padding: Spacing.lg,
  },
  errorText: {
    fontSize: 12,
    lineHeight: 18,
    width: "100%",
  },
});
and import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native";
import { AppColors } from "@/constants/theme";

interface HeaderTitleProps {
  title: string;
  showIcon?: boolean;
}

export function HeaderTitle({ title }: HeaderTitleProps) {
  return (
    <View style={styles.container}>
      {/* Layered text to mimic the thick white outline style from the provided image */}
      <View style={styles.layerWrapper} pointerEvents="none">
        <Text style={[styles.title, styles.outline, { transform: [{ translateX: -3 }, { translateY: 0 }] }]}>
          {title}
        </Text>
        <Text style={[styles.title, styles.outline, { transform: [{ translateX: 3 }, { translateY: 0 }] }]}>
          {title}
        </Text>
        <Text style={[styles.title, styles.outline, { transform: [{ translateX: 0 }, { translateY: -3 }] }]}>
          {title}
        </Text>
        <Text style={[styles.title, styles.outline, { transform: [{ translateX: 0 }, { translateY: 3 }] }]}>
          {title}
        </Text>
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  icon: {
    width: 0,
    height: 0,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: AppColors.primary,
    fontFamily: "LilitaOne-Regular",
    textAlign: "center",
    lineHeight: 30,
  },
  outline: {
    position: "absolute",
    color: AppColors.white,
    zIndex: 0,
  },
  layerWrapper: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
and import React, { useEffect } from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    withDelay,
    Easing,
    runOnJS,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

interface SplashScreenViewProps {
    onFinish: () => void;
}

export default function SplashScreenView({ onFinish }: SplashScreenViewProps) {
    // Logo animation values
    const logoOpacity = useSharedValue(0);
    const logoScale = useSharedValue(0.7);

    // Glow/shimmer behind the logo
    const glowOpacity = useSharedValue(0);
    const glowScale = useSharedValue(0.5);

    // Outer container fade-out
    const containerOpacity = useSharedValue(1);

    useEffect(() => {
        // 1. Glow fades in
        glowOpacity.value = withTiming(0.6, {
            duration: 800,
            easing: Easing.out(Easing.quad),
        });
        glowScale.value = withTiming(1.2, {
            duration: 900,
            easing: Easing.out(Easing.quad),
        });

        // 2. Logo pops in with spring-like overshoot feel
        logoOpacity.value = withDelay(
            200,
            withTiming(1, { duration: 600, easing: Easing.out(Easing.quad) })
        );
        logoScale.value = withDelay(
            200,
            withSequence(
                withTiming(1.08, { duration: 500, easing: Easing.out(Easing.back(2)) }),
                withTiming(1.0, { duration: 250, easing: Easing.inOut(Easing.quad) })
            )
        );

        // 3. Glow pulses gently
        glowOpacity.value = withDelay(
            1000,
            withSequence(
                withTiming(0.9, { duration: 400, easing: Easing.inOut(Easing.quad) }),
                withTiming(0.5, { duration: 400, easing: Easing.inOut(Easing.quad) })
            )
        );

        // 4. Everything fades out -> call onFinish
        const fadeOutDelay = 1900;
        containerOpacity.value = withDelay(
            fadeOutDelay,
            withTiming(0, { duration: 500, easing: Easing.in(Easing.quad) }, () => {
                runOnJS(onFinish)();
            })
        );
    }, []);

    const logoAnimStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [{ scale: logoScale.value }],
    }));

    const glowAnimStyle = useAnimatedStyle(() => ({
        opacity: glowOpacity.value,
        transform: [{ scale: glowScale.value }],
    }));

    const containerAnimStyle = useAnimatedStyle(() => ({
        opacity: containerOpacity.value,
    }));

    return (
        <Animated.View style={[styles.container, containerAnimStyle]}>
            <LinearGradient
                colors={["#0D0520", "#1A0A2E", "#2D1055"]}
                style={StyleSheet.absoluteFill}
            />

            {/* Radial glow behind logo */}
            <Animated.View style={[styles.glow, glowAnimStyle]} />

            {/* Logo */}
            <Animated.View style={[styles.logoWrapper, logoAnimStyle]}>
                <Image
                    source={require("../assets/images/rizz ai - logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </Animated.View>
        </Animated.View>
    );
}

const LOGO_SIZE = width * 0.62;
const GLOW_SIZE = LOGO_SIZE * 1.8;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
    },
    glow: {
        position: "absolute",
        width: GLOW_SIZE,
        height: GLOW_SIZE,
        borderRadius: GLOW_SIZE / 2,
        backgroundColor: "#C44FDB",
        // Blur is simulated via layered shadows
        shadowColor: "#CC55FF",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 80,
        elevation: 20,
    },
    logoWrapper: {
        shadowColor: "#FF66FF",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 30,
        elevation: 15,
    },
    logo: {
        width: LOGO_SIZE,
        height: LOGO_SIZE,
    },
});
and import { Text, type TextProps } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { Typography } from "@/constants/theme";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "h1" | "h2" | "h3" | "h4" | "body" | "small" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "body",
  ...rest
}: ThemedTextProps) {
  const { theme, isDark } = useTheme();

  const getColor = () => {
    if (isDark && darkColor) {
      return darkColor;
    }

    if (!isDark && lightColor) {
      return lightColor;
    }

    if (type === "link") {
      return theme.link;
    }

    return theme.text;
  };

  const getTypeStyle = () => {
    switch (type) {
      case "h1":
        return Typography.h1;
      case "h2":
        return Typography.h2;
      case "h3":
        return Typography.h3;
      case "h4":
        return Typography.h4;
      case "body":
        return Typography.body;
      case "small":
        return Typography.small;
      case "link":
        return Typography.link;
      default:
        return Typography.body;
    }
  };

  return (
    <Text style={[{ color: getColor() }, getTypeStyle(), style]} {...rest} />
  );
}
and import { View, type ViewProps } from "react-native";

import { useTheme } from "@/hooks/useTheme";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const { theme, isDark } = useTheme();

  const backgroundColor =
    isDark && darkColor
      ? darkColor
      : !isDark && lightColor
        ? lightColor
        : theme.backgroundRoot;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
and now this is navigation folder import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@/screens/HomeScreen";
import PickupLineScreen from "@/screens/PickupLineScreen";
import UploadScreenshotScreen from "@/screens/UploadScreenshotScreen";
import LookmaxingScreen from "@/screens/LookmaxingScreen";
import FunFeaturesScreen from "@/screens/FunFeaturesScreen";
import RoastMySelfieScreen from "@/screens/RoastMySelfieScreen";
import RateMyCrushScreen from "@/screens/RateMyCrushScreen";
import HotOrNotScreen from "@/screens/HotOrNotScreen";
import LookmaxingTipsScreen from "@/screens/LookmaxingTipsScreen";
import { HeaderTitle } from "@/components/HeaderTitle";
import { useTheme } from "@/hooks/useTheme";
import { getCommonScreenOptions } from "@/navigation/screenOptions";

export type RootStackParamList = {
  Home: undefined;
  PickupLine: undefined;
  UploadScreenshot: undefined;
  Lookmaxing: undefined;
  FunFeatures: undefined;
  RoastMySelfie: undefined;
  RateMyCrush: undefined;
  HotOrNot: undefined;
  LookmaxingTips: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        ...getCommonScreenOptions({ theme, isDark }),
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UploadScreenshot"
        component={UploadScreenshotScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PickupLine"
        component={PickupLineScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Lookmaxing"
        component={LookmaxingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FunFeatures"
        component={FunFeaturesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RoastMySelfie"
        component={RoastMySelfieScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RateMyCrush"
        component={RateMyCrushScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HotOrNot"
        component={HotOrNotScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LookmaxingTips"
        component={LookmaxingTipsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
and import { Platform } from "react-native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";


interface ScreenOptionsParams {
  theme: {
    backgroundRoot: string;
    text: string;
  };
  isDark: boolean;
  transparent?: boolean;
}

export const getCommonScreenOptions = ({
  theme,
  isDark,
  transparent = true,
}: ScreenOptionsParams): NativeStackNavigationOptions => ({
  headerTitleAlign: "center",
  headerTransparent: transparent,
  headerBlurEffect: isDark ? "dark" : "light",
  headerTintColor: "#F6766E",
  headerStyle: {
    backgroundColor: "transparent",
  },
  gestureEnabled: true,
  gestureDirection: "horizontal",
  fullScreenGestureEnabled: true,
  contentStyle: {
    backgroundColor: theme.backgroundRoot,
  },
});
now this is constant folder import { Platform } from "react-native";

export const AppColors = {
  primary: "#F6766E",
  primaryLight: "#F6766E",
  background: {
    gradientTop: "#ABBFF2",
    gradientBottom: "#BCCFFA",
  },
  messageBubble: "#4A90D9",
  slider: {
    left: "#FF9500",
    right: "#FF3B30",
  },
  white: "#FFFFFF",
  textDark: "#333333",
  textLight: "#FFFFFF",
  buttonColor: "#F6766E",
};

const tintColorLight = AppColors.primary;
const tintColorDark = "#F08080";

export const Colors = {
  light: {
    text: "#11181C",
    buttonText: "#FFFFFF",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    link: AppColors.primary,
    backgroundRoot: AppColors.background.gradientBottom,
    backgroundDefault: "#F2F2F2",
    backgroundSecondary: "#E6E6E6",
    backgroundTertiary: "#D9D9D9",
  },
  dark: {
    text: "#ECEDEE",
    buttonText: "#FFFFFF",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    link: tintColorDark,
    backgroundRoot: "#1F2123",
    backgroundDefault: "#2A2C2E",
    backgroundSecondary: "#353739",
    backgroundTertiary: "#404244",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  "2xl": 40,
  "3xl": 50,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: "700" as const,
  },
  h2: {
    fontSize: 28,
    fontWeight: "700" as const,
  },
  h3: {
    fontSize: 24,
    fontWeight: "600" as const,
  },
  h4: {
    fontSize: 20,
    fontWeight: "600" as const,
  },
  body: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
  small: {
    fontSize: 14,
    fontWeight: "400" as const,
  },
  link: {
    fontSize: 16,
    fontWeight: "400" as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
