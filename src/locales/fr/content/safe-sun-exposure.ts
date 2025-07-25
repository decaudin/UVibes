export default {
    safe: {
        title: "Conseils pour une exposition au soleil en toute sécurité",
        
        limitTitle: "Pourquoi limiter l'exposition au soleil est important",
        limitText: "Une surexposition aux rayons UV augmente le risque de coups de soleil, de vieillissement prématuré de la peau et de cancer cutané. Connaître votre temps d'exposition sécurisé vous permet de profiter du soleil sans abîmer votre peau.",
        
        factorTitle: "Facteurs influençant la durée d'exposition sûre",
        factorList: {
            label1: "Indice UV :",
            desc1: "Plus il est élevé, plus le temps d'exposition sans risque est court.",
            label2: "Type de peau :",
            desc2: "Les peaux claires brûlent plus rapidement que les peaux foncées.",
            label3: "Altitude & réflexion :",
            desc3: "La neige, l'eau et le sable augmentent l'intensité des UV.",
            label4: "Heure de la journée :",
            desc4: "Les UV sont à leur maximum entre 10h et 16h."
        },
        
        skinTypeTitle: "Type de peau et temps d'exposition estimé",
        skinTypeText: "Voici une estimation du temps d'exposition sans protection sous un indice UV de 8 :",
        skinTypeList: {
            label1: "Type I (très clair) :",
            desc1: "10 minutes ou moins",
            label2: "Type II :",
            desc2: "15 minutes",
            label3: "Types III-IV :",
            desc3: "20 à 30 minutes",
            label4: "Types V-VI (peaux foncées) :",
            desc4: "Jusqu'à 60 minutes"
        },
        skinTypeDisclaimer: "Ces valeurs sont approximatives. Il est toujours préférable de se protéger et de consulter les données en temps réel.",
        
        adviceTitle: "Conseils pour rester protégé",
        adviceList: {
            item1: "Utilisez une crème solaire à large spectre (SPF 30+), à réappliquer toutes les 2 heures.",
            item2: "Portez un chapeau à larges bords, des lunettes de soleil et des vêtements couvrants si possible.",
            item3: "Privilégiez les activités extérieures tôt le matin ou en fin d'après-midi.",
            item4First: "Utilisez des outils de prévision UV comme ",
            item4Strong: "UVibes",
            item4Last: " pour adapter votre exposition."
        }
    }
} as const