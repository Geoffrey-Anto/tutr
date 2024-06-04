from langchain_community.llms import Ollama


class LLM():
    def __init__(self, model_name) -> None:
        self.model = Ollama(model=model_name)

    def invoke(self, prompt):
        for chunks in self.model.stream(prompt):
            yield chunks
