from typing import Any
import pdfplumber


def get_document(file: Any) -> list[str]:
    document = []

    with pdfplumber.open(file) as pdf_file:
        all_pages = pdf_file.pages

        for page_no, page in enumerate(all_pages):
            page = page.extract_text()
            document.append({
                "id": str(page_no+1),
                "text": page
            })

    return document


def split_to_chunks(document: list[dict[str, str]], splitter: Any):
    ids = []
    chunks = []

    for item in document:
        text = item["text"]
        id = item["id"]

        chunksSplit = splitter.split_text(text)

        for chunk_no, chunk in enumerate(chunksSplit):
            ids.append(f"{id}/{chunk_no+1}")
            chunks.append(chunk)

    return ids, chunks


# ----------------------------------------------------------------------------------


# from langchain_text_splitters import RecursiveCharacterTextSplitter

# def main():
#     document = get_document("./files/dsa-book.pdf")

#     text_splitter = RecursiveCharacterTextSplitter(
#         chunk_size=1500, chunk_overlap=150)

#     ids, chunks = split_to_chunks(document, splitter=text_splitter)

#     print(ids[45])
#     print(chunks[45])


# if __name__ == '__main__':
#     main()
