import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { styles } from "../../assets/styles/auth.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const onSignUpPress = async () => {
    setError("");
    if (!isLoaded) return;
    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      if (err.errors?.[0]?.code === "form_identifier_exists") {
        setError("Email address already exists. Please try again.");
      } else if (err.errors?.[0]?.code === "form_password_pwned") {
        setError("Password is too weak. Please try again.");
      } else {
        setError("Failed to sign up. Please check your info and try again.");
      }
    }
  };

  const onVerifyPress = async () => {
    setError("");
    if (!isLoaded) return;
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        setError("Verification incomplete. Please try again.");
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      setError("Verification failed. Please check the code and try again.");
      console.error(JSON.stringify(err, null, 2));
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Verify your email</Text>
        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={setCode}
          style={[styles.verificationInput, error && styles.errorInput]}
          keyboardType="number-pad"
          autoFocus
        />
        <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={20}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/revenue-i2.png")} // Replace with your image path
          style={styles.illustration}
        />
        <Text style={styles.title}>Sign up</Text>
        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={setEmailAddress}
          style={styles.input}
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry
          onChangeText={setPassword}
          style={styles.input}
          textContentType="password"
        />
        <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Link href="/sign-in">
            <Text style={styles.linkText}>Sign in</Text>
          </Link>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
