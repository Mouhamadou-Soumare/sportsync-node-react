import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddNewsForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    date: "",
  });
  const [file, setFile] = useState();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataWithImage = new FormData();
    formDataWithImage.append("file", file);
    formDataWithImage.append("title", formData.title);
    formDataWithImage.append("content", formData.content);
    formDataWithImage.append("author", formData.author);
    axios
      .post(`http://localhost:3000/news/add-news`, formDataWithImage)
      .then((response) => {
        console.log("News updated successfully:", response.data);
        history.push(`/allnews`);
      })
      .catch((error) => {
        console.error("Error updating news:", error);
      });
  };

  return (
    <div className="bg-white py-24 sm:py-48">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="space-y-10 divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Ajouter
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Ajouter un nouvel article
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              enctype="multipart/form-data"
              method="POST"
              className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
            >
              <div className="px-4 py-6 sm:p-8">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Titre
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="block w-full border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Contenu
                    </label>
                    <ReactQuill
                      id="content"
                      value={formData.content}
                      onChange={(value) =>
                        setFormData({ ...formData, content: value })
                      }
                      className="block w-full rounded-md border-1 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, 3, 4, false] }],
                          [{ align: [] }],
                          ["bold", "italic", "underline"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["link"],
                          ["clean"],
                        ],
                      }}
                      formats={[
                        "header",
                        "align",
                        "bold",
                        "italic",
                        "underline",
                        "list",
                        "bullet",
                        "link",
                      ]}
                    />
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="author"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Auteur
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      className="block w-full border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="block w-full border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Mettre en ligne
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewsForm;
