const { predictTextSentimentAnalysis } = require('./model');
const { saveWeightsToFirebase, loadWeightsFromFirebase } = require('./firebase');

const admin = require('firebase-admin');

let serviceAccount = require("/Users/John/Desktop/GROOP/GROOP/groopv0-efec2-firebase-adminsdk-eggmr-b0af3c0a01.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: 'https://groopv0-efec2-default-rtdb.firebaseio.com'
// });

async function initializeWeightsFromFirebase() {
    const loadedWeights = await loadWeightsFromFirebase();
    if (loadedWeights) {
        MBTI_weights = loadedWeights;
    }
    return MBTI_weights
}

// initializeWeightsFromFirebase();

/*let MBTI_weights = {
    'INFP': {
        'INFP': 7,
        'ENFP': 7,
        'INFJ': 7,
        'ENFJ': 10,
        'INTJ': 7,
        'ENTJ': 10,
        'INTP': 7,
        'ENTP': 7,
        'ISFP': 1,
        'ESFP': 1,
        'ISTP': 1,
        'ESTP': 1,
        'ISFJ': 1,
        'ESFJ': 1,
        'ISTJ': 1,
        'ESTJ': 1
    },
    'ENFP': {
        'INFP': 7,
        'ENFP': 7,
        'INFJ': 10,
        'ENFJ': 7,
        'INTJ': 10,
        'ENTJ': 7,
        'INTP': 7,
        'ENTP': 7,
        'ISFP': 1,
        'ESFP': 1,
        'ISTP': 1,
        'ESTP': 1,
        'ISFJ': 1,
        'ESFJ': 1,
        'ISTJ': 1,
        'ESTJ': 1
    },
    'INFJ': {
        'INFP': 7,
        'ENFP': 10,
        'INFJ': 7,
        'ENFJ': 7,
        'INTJ': 7,
        'ENTJ': 7,
        'INTP': 7,
        'ENTP': 10,
        'ISFP': 1,
        'ESFP': 1,
        'ISTP': 1,
        'ESTP': 1,
        'ISFJ': 1,
        'ESFJ': 1,
        'ISTJ': 1,
        'ESTJ': 1
    },
    'ENFJ': {
        'INFP': 10,
        'ENFP': 7,
        'INFJ': 7,
        'ENFJ': 7,
        'INTJ': 7,
        'ENTJ': 7,
        'INTP': 7,
        'ENTP': 7,
        'ISFP': 10,
        'ESFP': 1,
        'ISTP': 1,
        'ESTP': 1,
        'ISFJ': 1,
        'ESFJ': 1,
        'ISTJ': 1,
        'ESTJ': 1
    },
    'INTJ': {
        'INFP': 7,
        'ENFP': 10,
        'INFJ': 7,
        'ENFJ': 7,
        'INTJ': 7,
        'ENTJ': 7,
        'INTP': 7,
        'ENTP': 10,
        'ISFP': 5,
        'ESFP': 5,
        'ISTP': 5,
        'ESTP': 5,
        'ISFJ': 3,
        'ESFJ': 3,
        'ISTJ': 3,
        'ESTJ': 3
    },
    'ENTJ': {
        'INFP': 10,
        'ENFP': 7,
        'INFJ': 7,
        'ENFJ': 7,
        'INTJ': 7,
        'ENTJ': 7,
        'INTP': 10,
        'ENTP': 7,
        'ISFP': 5,
        'ESFP': 5,
        'ISTP': 5,
        'ESTP': 5,
        'ISFJ': 5,
        'ESFJ': 5,
        'ISTJ': 5,
        'ESTJ': 5
    },
    'INTP': {
        'INFP': 7,
        'ENFP': 7,
        'INFJ': 7,
        'ENFJ': 7,
        'INTJ': 7,
        'ENTJ': 10,
        'INTP': 7,
        'ENTP': 7,
        'ISFP': 5,
        'ESFP': 5,
        'ISTP': 5,
        'ESTP': 5,
        'ISFJ': 3,
        'ESFJ': 3,
        'ISTJ': 3,
        'ESTJ': 10
    },
    'ENTP': {
        'INFP': 7,
        'ENFP': 7,
        'INFJ': 10,
        'ENFJ': 7,
        'INTJ': 10,
        'ENTJ': 7,
        'INTP': 7,
        'ENTP': 7,
        'ISFP': 5,
        'ESFP': 5,
        'ISTP': 5,
        'ESTP': 5,
        'ISFJ': 3,
        'ESFJ': 3,
        'ISTJ': 3,
        'ESTJ': 3
    },
    'ISFP': {
        'INFP': 1,
        'ENFP': 1,
        'INFJ': 1,
        'ENFJ': 10,
        'INTJ': 5,
        'ENTJ': 5,
        'INTP': 5,
        'ENTP': 5,
        'ISFP': 3,
        'ESFP': 3,
        'ISTP': 3,
        'ESTP': 3,
        'ISFJ': 5,
        'ESFJ': 10,
        'ISTJ': 5,
        'ESTJ': 10
    },
    'ESFP': {
        'INFP': 1,
        'ENFP': 1,
        'INFJ': 1,
        'ENFJ': 1,
        'INTJ': 5,
        'ENTJ': 5,
        'INTP': 5,
        'ENTP': 5,
        'ISFP': 3,
        'ESFP': 3,
        'ISTP': 3,
        'ESTP': 3,
        'ISFJ': 10,
        'ESFJ': 5,
        'ISTJ': 10,
        'ESTJ': 5
    },
    'ISTP': {
        'INFP': 1,
        'ENFP': 1,
        'INFJ': 1,
        'ENFJ': 1,
        'INTJ': 5,
        'ENTJ': 5,
        'INTP': 5,
        'ENTP': 5,
        'ISFP': 3,
        'ESFP': 3,
        'ISTP': 3,
        'ESTP': 3,
        'ISFJ': 5,
        'ESFJ': 10,
        'ISTJ': 5,
        'ESTJ': 10
    },
    'ESTP': {
        'INFP': 1,
        'ENFP': 1,
        'INFJ': 1,
        'ENFJ': 1,
        'INTJ': 5,
        'ENTJ': 5,
        'INTP': 5,
        'ENTP': 5,
        'ISFP': 3,
        'ESFP': 3,
        'ISTP': 3,
        'ESTP': 3,
        'ISFJ': 10,
        'ESFJ': 5,
        'ISTJ': 10,
        'ESTJ': 5
    },
    'ISFJ': {
        'INFP': 1,
        'ENFP': 1,
        'INFJ': 1,
        'ENFJ': 1,
        'INTJ': 3,
        'ENTJ': 5,
        'INTP': 3,
        'ENTP': 3,
        'ISFP': 5,
        'ESFP': 10,
        'ISTP': 5,
        'ESTP': 10,
        'ISFJ': 7,
        'ESFJ': 7,
        'ISTJ': 7,
        'ESTJ': 7
    },
    'ESFJ': {
        'INFP': 1,
        'ENFP': 1,
        'INFJ': 1,
        'ENFJ': 1,
        'INTJ': 3,
        'ENTJ': 5,
        'INTP': 3,
        'ENTP': 3,
        'ISFP': 10,
        'ESFP': 5,
        'ISTP': 10,
        'ESTP': 5,
        'ISFJ': 7,
        'ESFJ': 7,
        'ISTJ': 7,
        'ESTJ': 7
    },
    'ISTJ': {
        'INFP': 1,
        'ENFP': 1,
        'INFJ': 1,
        'ENFJ': 1,
        'INTJ': 3,
        'ENTJ': 5,
        'INTP': 3,
        'ENTP': 3,
        'ISFP': 5,
        'ESFP': 10,
        'ISTP': 5,
        'ESTP': 10,
        'ISFJ': 7,
        'ESFJ': 7,
        'ISTJ': 7,
        'ESTJ': 7
    },
    'ESTJ': {
        'INFP': 1,
        'ENFP': 1,
        'INFJ': 1,
        'ENFJ': 1,
        'INTJ': 3,
        'ENTJ': 5,
        'INTP': 10,
        'ENTP': 3,
        'ISFP': 10,
        'ESFP': 5,
        'ISTP': 10,
        'ESTP': 5,
        'ISFJ': 7,
        'ESFJ': 7,
        'ISTJ': 7,
        'ESTJ': 7
    },
};*/

let MBTI_types = ['INFP', 'ENFP', 'INFJ', 'ENFJ', 'INTJ', 'ENTJ', 'INTP', 'ENTP', 'ISFP', 'ESFP', 'ISTP', 'ESTP', 'ISFJ', 'ESFJ', 'ISTJ', 'ESTJ'];
let MBTI_pairs = {};

// MBTI_types.forEach((type1, index1) => {
//     MBTI_types.forEach((type2, index2) => {
//         if (index2 >= index1) {
//             let pairName = [type1, type2].sort().join('');
//             MBTI_pairs[pairName] = MBTI_weights[type1][type2];
//         }
//     });
// });

// Function to get the correct key regardless of the order of the participant codes
function getPairName(code1, code2) {
    return [code1, code2].sort().join('');
}


async function getSentiment() {
    const sentiments = await predictTextSentimentAnalysis();
    console.log(sentiments[0]);  // If you want the first sentiment
}


function getWeight(code1, code2) {
    let pairName = getPairName(code1, code2);
    return MBTI_pairs[pairName];
}

function modifyWeight(code1, code2, weight, sentimentalScore) {
    let pairName = getPairName(code1, code2);

    if(sentimentalScore > 6){
        weight = parseFloat(weight) + ((sentimentalScore * 0.1) - 0.3);
    } else if(sentimentalScore < 5){
        if(sentimentalScore == 0){
            sentimentalScore = 1;
        }
        weight = parseFloat(weight) - (1/sentimentalScore);
    }
    MBTI_pairs[pairName] = weight;

    MBTI_weights[code1][code2] = weight;
    MBTI_weights[code2][code1] = weight;
}



async function evaluateAndModifyWeights(code1, code2) {
    const currentWeight = await initializeWeightsFromFirebase();
    const sentiment = await predictTextSentimentAnalysis();
    console.log(sentiment, currentWeight[code1][code2])
    modifyWeight(code1, code2, parseFloat(currentWeight[code1][code2]), sentiment);
    saveWeightsToFirebase(MBTI_weights);
    // process.exit()
}


evaluateAndModifyWeights("ENFJ", "ENFP")