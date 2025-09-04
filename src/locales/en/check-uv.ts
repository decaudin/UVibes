export default {
    checkUv: {
        title: "Check the UV Index",
        subtitle: "Get the current UV index and the recommended sun exposure time based on your skin type and the location of your choice."
    },
    toggleModeDescription: "Select input mode :",
    coordsMode: "Coordinates",
    cityMode:"City",
    latLongRequired: "Latitude and Longitude are required!",
    latitudeLabel: "Latitude :",
    longitudeLabel: "Longitude :",
    altitudeLabel: "Altitude (optional) :",
    cityLabel: "Ville",
    cityPlaceholder: "Search for a city …",
    cityOpenSuggestions: "Open the city suggestions list",
    cityCloseSuggestions: "Close the city suggestions list",
    radioTitle: "For more personalized data, please select your skin type (optional) :",
    skinType1: "Very fair",
    skinType2: "Fair",
    skinType3: "Medium",
    skinType4: "Olive",
    skinType5: "Brown",
    skinType6: "Very dark",
    uvCheckButton: "Get UV Data",
    uvFetchError: "An error occurred while fetching the data.",
    uvLevels: {
        extreme: "⚠️ Extreme UV level, stay indoors if possible. ⚠️",
        veryHigh: "⚠️ Very high UV level, avoid being outside for long. ⚠️",
        high: "🔶 High UV level, wear sunscreen and protective gear. 🔶",
        moderate: "🟡 Moderate UV level, take precautions.🟡",
        low: "✅ Low UV level, safe to be outside. ✅",
    },
    uvInfo: {
        title: "UV Radar: Track the Sun's Power",
        currentUvIndex: "Current UV Index : ",
        maxUvIndexOfDay: "Max UV Index of the Day : ",
        ozoneLevel: "Ozone Level : ",
        ozoneUnit: " du"
    },
    safeExposureDuration: {
        userSkinTitle: "Safe Exposure Duration for Your Skin Type :",
        allSkinsTitle: "Safe Exposure Duration for All Skin Types :",
        riskFree: "Risk-free Exposure: No time limit - your skin's good to go !"
    }
} as const