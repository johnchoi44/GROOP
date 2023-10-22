import sys
import json
import vertexai
from vertexai.language_models import TextGenerationModel

# Parse input from Node.js script
users = json.loads(sys.argv[1])

# Initialize Vertex AI
vertexai.init(project="hardy-thinker-402615", location="us-central1")
parameters = {
    "candidate_count": 1,
    "max_output_tokens": 1024,
    "temperature": 0.3,
    "top_p": 0.8,
    "top_k": 40
}
model = TextGenerationModel.from_pretrained("text-bison")

# Format the users' data into the desired input string for Vertex AI
user_data = "\n".join([f'Username: "{user["username"]}" mbti: "{user["mbti"]}"' for user in users])
input_text = f"""Could you create groups of 4 for me out of these 20 people based on their compatibility according to this matrix for MBTI scores where the higher the score means the more compatible:

{user_data}

Group them EXACTLY like this (First four are the first group and so on):

"Username1","Username2","Username3","Username4"

This will go on until we have all 20 grouped together in a big list, but they need to be in chunks of 4 by group."""

response = model.predict(input_text, **parameters)
print(f"\n {response.text}")