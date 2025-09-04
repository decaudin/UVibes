export default {
    checkUv: {
        title: "Vérifier l'indice UV",
        subtitle: "Obtenez l'indice UV actuel et la durée d'exposition recommandée selon votre type de peau et le lieu de votre choix."
    },
    toggleModeDescription: "Choisissez le mode de saisie :",
    coordsMode: "Coordonnées",
    cityMode: "Ville",
    latLongRequired: "La latitude et la longitude sont obligatoires!",
    latitudeLabel: "Latitude :",
    longitudeLabel: "Longitude :",
    altitudeLabel: "Altitude (facultative) :",
    cityLabel: "City",
    cityPlaceholder: "Recherchez une ville …",
    cityOpenSuggestions: "Ouvrir la liste des suggestions de villes",
    cityCloseSuggestions: "Fermer la liste des suggestions de villes",
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