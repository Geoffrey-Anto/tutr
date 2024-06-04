from flask import *
from db import DB
from document_splitter import get_document, split_to_chunks
from llm import LLM
from langchain_community.embeddings import OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
import os
from prompts import PROMPTS

app = Flask(__name__)

db = DB(embeddings=OllamaEmbeddings(model="all-minilm"),
        connection_args={"uri": "./temp/milvus.db"})

llm = LLM("tinyllama")


@app.route('/add_document/<user_token>', methods=["post"])
def add_document(user_token):
    print(request.files.keys())
    f = request.files['file']
    f.save(f"./files/{f.filename}")

    document = get_document(f"./files/{f.filename}")

    ids, chunks = split_to_chunks(document, splitter=RecursiveCharacterTextSplitter(
        chunk_size=1500, chunk_overlap=150))

    db.build_vector_store(documents=chunks, ids=ids,
                          collection_name=user_token)

    os.remove(f"./files/{f.filename}")

    return "File Uploaded Successfully"


@app.route('/prompt/<user_token>', methods=["POST"])
def prompt_route(user_token):
    json_data = request.get_json()

    context_query = json_data["context_query"]
    prompt = json_data["prompt"]

    data = db.query(query_vector=context_query,
                    collection_name=user_token, k=1)

    res = ""

    for d in data:
        res += f"{d.page_content} -> Page No {d.metadata["pk"]}\n\n"

    prompt = PROMPTS[json_data["type"]](prompt, res)

    print(prompt)

    return app.response_class(stream_with_context(llm.invoke(prompt=prompt)), mimetype='text/plain')


@app.route('/')
def hello_world():
    return 'Hello World!!!'


if __name__ == '__main__':
    app.run()
