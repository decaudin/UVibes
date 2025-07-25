export default {
    vitaminD: {
        title: "Vitamin D and Sun Exposure",

        whyTitle: "Why Is Vitamin D Important?",
        whyText: "Vitamin D is essential for bone health, proper immune system function, and overall well-being. It helps the body absorb calcium and phosphorus while playing a role in reducing inflammation.",

        howTitle: "How Does the Body Produce Vitamin D?",
        howText: "When the skin is exposed to UVB rays from the sun, it naturally synthesizes vitamin D. Unlike food or supplements, this is an effective way for the body to produce this vitamin — but it requires the right balance.",

        quantityTitle: "How Much Sunlight Is Needed?",
        quantityList: {
            label1: "Light skin : ",
            desc1: "10 to 20 minutes of exposure (face, arms), several times a week, may be sufficient.",
            label2: "Dark skin : ",
            desc2: "30 to 60 minutes may be needed due to higher melanin content.",
            itemStrong3: "Cloud cover, pollution, clothing, and sunscreen ",
            itemLast3: "reduce UVB absorption.",
        },
        quantityNote: "Note: This varies depending on the season, latitude, and time of day.",

        deficiencyTitle: "Risks of Vitamin D Deficiency",
        deficiencyText: "A deficiency in vitamin D can lead to fatigue, weakened immune system, bone pain, and in severe cases, rickets or osteoporosis. People living in low-sunlight areas, wearing covering clothing, or spending most of their time indoors are particularly at risk.",

        balanceTitle: "Balancing UV Exposure and Safety",
        balanceIntro: "While the sun promotes vitamin D synthesis, excessive exposure can damage the skin. It's important to:",
        balanceList: {
            item1: "Expose yourself when the UV index is low to moderate (before 11 a.m. or after 4 p.m.).",
            item2First: "Limit exposure time according to recommended safety levels (use tools like ",
            item2Strong: "UVibes",
            item2Last: ").",
            item3: "Supplement with vitamin D if sun exposure is insufficient (consult a doctor).",
        }
    }
} as const