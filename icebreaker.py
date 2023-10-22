import vertexai
from vertexai.language_models import TextGenerationModel

vertexai.init(project="hardy-thinker-402615", location="us-central1")
parameters = {
    "candidate_count": 1,
    "max_output_tokens": 645,
    "temperature": 1,
    "top_p": 0.8,
    "top_k": 40
}
model = TextGenerationModel.from_pretrained("text-bison")
response = model.predict(
    """Introduce yourself.
Drop a random topic to discuss. Generate ONE random fun and creative exercise for a group of 4 people who just met! It can be a game or a question.""",
    **parameters
)
print(f"{response.text}")