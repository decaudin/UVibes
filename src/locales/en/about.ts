export default {
    about: {
        description: "This non-profit website provides UV data (via the open-source API <openuvLink>OpenUV</openuvLink>) for the geographic area of your choice. You can access UV information in two ways :",
        descriptionCoords: "<strong>By coordinates :</strong> enter the latitude and longitude (in decimal degrees), as well as the altitude (optional, in meters). You can easily find your coordinates on <gpsLink>Latlong</gpsLink> and check your altitude using <elevationLink>FreeMapTools</elevationLink>.",
        descriptionCity: "<strong>By city :</strong> Start typing the name of a city (at least 3 letters), refine if needed, then select it from the list - the coordinates will be retrieved automatically.",
        descriptionAccount: "You can also create your account to save your favorite locations. Once signed in, you'll be able to access the UV data for these locations without having to re-enter the coordinates each time.",
        checkUvLink: "Check UV",
        guidesLink: "Guides & Tips",
        guidesTitle: "Shine Smart : UV Protection Guides",
        backLink: "Back to Guides & Tips List",
    },
    card: {
        link: "Read more ",
        understand: {
            title: "Understanding the UV Index",
            description: "Discover what the UV Index measures, how it's categorized, and why it's essential for sun safety.",
        },
        calculate: {
            title: "How the UV Index Is Calculated",
            description: "Understand the scientific and atmospheric factors used to calculate the UV Index.",
        },
        tips: {
            title: "Safe Sun Exposure Tips",
            description: "Learn practical tips to enjoy the sun safely and reduce the risk of skin damage.",
        },
        sunscreen: {
            title: "Choosing the Right Sunscreen",
            description: "Explore how to select the best sunscreen to protect yourself from the UV.",
        },
        longTerm: {
            title: "Long-Term Effects of UV Exposure",
            description: "Find out how chronic UV exposure can affect your skin, eyes, and immune system over time.",
        },
        vitaminD: {
            title: "Vitamin D and Sunlight",
            description: "Learn how sun exposure helps your body produce vitamin D and how to balance benefits with safety.",
        },
        winter: {
            title: "Sun Protection in Winter",
            description: "Discover why sun protection is still crucial during winter months and snowy conditions.",
        },
        highUvZones: {
            title: "High UV Zones Year-Round",
            description: "Identify global regions with consistently high UV levels and how to stay protected while living or traveling there.",
        }
    }
} as const