export default {
    signIn: "Sign In",
    signUp: "Sign Up",
    signInPrompt: "Don't have an account ? ",
    signUpPrompt: "Already have an account ? ",
    label: {
        password: "Password",
        name: "Name",
        email: "E-mail",
        checkbox: "Remember me",
    },
    authPlaceholders: {
        email: "Enter your email",
        password: "Enter your password",
        name: "Enter your name",
    },
    forgotPassword: "Forgot password?",
    or: "or",
    signInGoogle: "Continue with Google",
    signInError: "Invalid email or password",
    pointsFetchError: "Failed to fetch your GPS points.",
    signInSuccessToast: "You're in! Taking you to your Dashboard...",
    signInErrorToast: "Sign in failed",
    signInGoogleErrorToast: "Unable to open Google Sign in window",
    userMeErrorToast:"An error occurred while retrieving your user data.",
    signInUnknownErrorToast: "Unknown signin error",
    signUpErrorUserExists: "User already exists. Please use a different email.",
    signUpSuccessToast: "Account created! Taking you to the Sign In page ...",
    signUpErrorToast: "Sign up failed",
    signUpUnknownErrorToast: "Unknown Sign up error",
    resetPassword: {
        title: "Reset Your Password",
        sendResetLink: "Enter the email address associated with your account, and we'll send you a link to reset your password.",
        buttonText: "Send reset link",
        errorMessage: "An error occurred while sending the email. Please try again."
    }
} as const