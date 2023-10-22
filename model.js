/**
 * TODO(developer): Uncomment these variables before running the sample.\
 * (Not necessary if passing values as arguments)
 */


// const userResponse = require("./GROOP.v0/modelTest");

// const text = userResponse;
const text = "The conversation was great"
const endpointId = "653956530852331520";
const project = 'hardy-thinker-402615';
const location = 'us-central1';

const aiplatform = require('@google-cloud/aiplatform');
const {instance, prediction} =
    aiplatform.protos.google.cloud.aiplatform.v1.schema.predict;

// Imports the Google Cloud Model Service Client library
const {PredictionServiceClient} = aiplatform.v1;

// Specifies the location of the api endpoint
const clientOptions = {
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
};

// Instantiates a client
const predictionServiceClient = new PredictionServiceClient(clientOptions);

async function predictTextSentimentAnalysis() {
    // Configure the endpoint resource
    const endpoint = `projects/${project}/locations/${location}/endpoints/${endpointId}`;

    const instanceObj = new instance.TextSentimentPredictionInstance({
        content: text,
    });
    const instanceVal = instanceObj.toValue();

    const instances = [instanceVal];
    const request = {
        endpoint,
        instances,
    };

    // Predict request
    const [response] = await predictionServiceClient.predict(request);

    console.log('Predict text sentiment analysis response:');
    console.log(`\tDeployed model id : ${response.deployedModelId}`);
    console.log('\nPredictions :');

    // Assuming there's only one prediction value
    const predictionResult = 
        prediction.TextSentimentPredictionResult.fromValue(
            response.predictions[0]
        );
    console.log(`\tSentiment measure: ${predictionResult.sentiment}`);

    return predictionResult.sentiment;
}

// If you want to run the function when this file is executed directly
// predictTextSentimentAnalysis();

// Export the function for use in other files
module.exports.predictTextSentimentAnalysis = predictTextSentimentAnalysis;