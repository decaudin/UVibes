export default {
    safe: {
        title: "Tips for Safe Sun Exposure",
        
        limitTitle: "Why Limiting Sun Exposure Matters",
        limitText: "Overexposure to UV rays increases the risk of sunburn, premature skin aging, and skin cancer. Knowing your safe exposure time allows you to enjoy the sun without harming your skin.",
        
        factorTitle: "Factors Influencing Safe Exposure Duration",
        factorList: {
            label1: "UV Index :",
            desc1: " The higher it is, the shorter the safe exposure time.",
            label2: "Skin type :",
            desc2: " Fair skin burns more quickly than darker skin.",
            label3: "Altitude & reflection :",
            desc3: " Snow, water, and sand increase UV intensity.",
            label4: "Time of day :",
            desc4: " UV rays peak between 10 a.m. and 4 p.m.",
        },

        skinTypeTitle: "Skin Type and Estimated Exposure Time",
        skinTypeText: "Here is an estimate of unprotected exposure time under a UV index of 8:",
        skinTypeList: {
            label1: "Type I (very fair) :",
            desc1: " 10 minutes or less",
            label2: "Type II :",
            desc2: " 15 minutes",
            label3: "Types III-IV :",
            desc3: " 20 to 30 minutes",
            label4: "Types V-VI (darker skin) :",
            desc4: " Up to 60 minutes",
        },
        skinTypeDisclaimer: "These values are approximate. It's always better to protect yourself and consult real-time data.",
        
        adviceTitle: "Tips to Stay Protected",
        adviceList: {
            item1: "Use broad-spectrum sunscreen (SPF 30+), and reapply every 2 hours.",
            item2: "Wear a wide-brimmed hat, sunglasses, and protective clothing when possible.",
            item3: "Prefer outdoor activities early in the morning or late in the afternoon.",
            item4First: "Use UV forecasting tools like ",
            item4Strong: "UVibes",
            item4Last: " to adjust your exposure."
        }
    }
} as const
