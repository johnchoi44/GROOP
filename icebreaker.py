import vertexai
from vertexai.language_models import TextGenerationModel

vertexai.init(project="hardy-thinker-402615", location="us-central1")
parameters = {
    "candidate_count": 1,
    "max_output_tokens": 645,
    "temperature": 0.6,
    "top_p": 0.8,
    "top_k": 40
}
model = TextGenerationModel.from_pretrained("text-bison")
response = model.predict(
    """Generate ONE fun and creative icebreaker for a group of 4 people who just met!""",
    **parameters
)
print(f"Response from Model: {response.text}")