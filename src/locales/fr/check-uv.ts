export default {
    latLongRequired: "La latitude et la longitude sont obligatoires!",
    labelLatitude: "Latitude :",
    labelLongitude: "Longitude :",
    labelAltitude: "Altitude (facultative) :",
    radioTitle: "Pour des données plus personnalisées, veuillez sélectionner votre type de peau (facultatif) :",
    skinType1: "Très clair",
    skinType2: "Clair",
    skinType3: "Moyen",
    skinType4: "Olive",
    skinType5: "Brun",
    skinType6: "Très foncé",
    uvCheckButton: "Obtenir les données UV",
    uvFetchError: "Une erreur est survenue lors de la récupération des données.",
    uvLevels: {
        extreme: "⚠️ Niveau UV extrême, restez à l'intérieur si possible. ⚠️",
        veryHigh: "⚠️ Niveau UV très élevé, évitez de sortir longtemps. ⚠️",
        high: "🔶 Niveau UV élevé, Mettez de la crème solaire et protégez-vous . 🔶",
        moderate: "🟡 Niveau UV modéré, soyez prudent. 🟡",
        low: "✅ Niveau UV faible, sortie sans risque. ✅",
    },
    uvInfo: {
        title: "Radar UV : Suivez la puissance du soleil",
        currentUvIndex: "Indice UV actuel : ",
        maxUvIndexOfDay: "Indice UV maximal de la journée : ",
        ozoneLevel: "Niveau d'ozone : ",
        ozoneUnit: " du"
    },
    safeExposureDuration: {
        userSkinTitle: "Durée d'exposition sans danger pour votre type de peau :",
        allSkinsTitle: "Durée d'exposition sans danger pour tous les types de peau :",
        riskFree: "Exposition sans risque : pas de limite - aucun danger pour votre peau !"
    }
} as const