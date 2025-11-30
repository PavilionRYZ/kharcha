import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { styles } from "../../assets/styles/auth.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    setError(""); // Clear previous errors
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        setError("Sign in incomplete. Please try again.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      if (err.errors?.[0]?.code === "form_password_incorrect") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Failed to sign in. Please check your info and try again.");
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      // style={{ flex: 1 }}
      // contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={20}
    >
      <View style={styles.container}>
        {/* Illustration Image */}
        <Image
          source={require("../../assets/images/revenue-i4.png")} // Replace with your image path
          style={styles.illustration}
        />

        <Text style={styles.title}>Sign in</Text>

        {/* Error Display */}
        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Email Input */}
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={setEmailAddress}
          style={styles.input}
          keyboardType="email-address"
          textContentType="emailAddress"
        />

        {/* Password Input */}
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
          textContentType="password"
        />

        {/* Sign In Button */}
        <TouchableOpacity style={styles.button} onPress={onSignInPress}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        {/* Footer - Sign Up Link */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Link href="/sign-up">
            <Text style={styles.linkText}>Sign up</Text>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
