export default {
    checkUv: {
        title: "Check the UV Index",
        subtitle: "Get the current UV index and the recommended sun exposure time based on your skin type and the location of your choice."
    },
    toggleModeDescription: "Select input mode :",
    coordsMode: "Coordinates",
    cityMode:"City",
    latitudeLabel: "Latitude :",
    longitudeLabel: "Longitude :",
    altitudeLabel: "Altitude (optional) :",
    cityLabel: "Ville",
    cityPlaceholder: "Search for a city …",
    radioTitle: "For more personalized data, please select your skin type (optional) :",
    skinTypes: {
        1: "Very fair",
        2: "Fair",
        3: "Medium",
        4: "Olive",
        5: "Brown",
        6: "Very dark"
    },
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
        titleUser: "Safe Exposure Duration for Your Skin Type :",
        titleAll: "Safe Exposure Duration for All Skin Types :",
        riskFreeUser: "Risk-free Exposure: No time limit - your skin's good to go !",
        riskFreeAll:"Risk-free Exposure: No time limit - this skin's good to go !"
    }
} as const