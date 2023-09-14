"use client";

import { useState } from "react";
import Logo from "./assets/logo";

// icons
import { Stars, Trash2 } from "lucide-react";

// editor
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-sql";
import "prismjs/themes/prism-dark.css";

import { useCompletion } from "ai/react";

export default function Home() {
  const [schema, setSchema] = useState("");

  const { completion, handleSubmit, input, handleInputChange, } = useCompletion({
    api: "/api/generate-sql",
    body: {
      schema,
    },
  });

  const result = completion;

  return (
    <div className="max-w-[430px] mx-auto px-10 pt-28 pb-16">
      <header className="flex items-center justify-between">
        <Logo />
        <button type="button">
          <Trash2 className="text-snow h-8 w-8" strokeWidth={0.8} />
        </button>
      </header>

      <form
        onSubmit={handleSubmit}
        className="py-8 w-full flex flex-col text-foam "
      >
        <label htmlFor="schema">Cole seu código SQL aqui</label>

        <Editor
          textareaId="schema"
          value={schema}
          onValueChange={(code) => setSchema(code)}
          highlight={(code) => highlight(code, languages.js, "sql")}
          padding={16}
          textareaClassName="outline-none"
          className="my-4 h-40 font-mono text-sm bg-[#151a2a] border border-[#323842] rounded-md outline-none focus-within:ring-2 focus-within:ring-lime-600"
        />

        <label htmlFor="question">Faça uma pergunta sobre o código </label>
        <textarea
          value={input}
          onChange={handleInputChange}
          className="my-4 bg-[#151a2a] border border-[#323842] rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-lime-600"
          name="question"
          id="question"
        ></textarea>

        <button
          type="submit"
          className="text-pistachio flex items-center justify-center rounded-lg border border-pistachio h-14 gap-2"
        >
          <Stars className="w-6 h-6" />
          Perguntar à inteligência artificial
        </button>
      </form>

      <div className="mt-6 flex flex-col">
        <span className="text-lg font-light text-foam">Resposta:</span>
        <Editor
          value={result}
          onValueChange={() => {}}
          highlight={(code) => highlight(code, languages.js, "sql")}
          padding={16}
          readOnly
          textareaClassName="outline-none"
          className="my-4 bg-transparent border border-[#323842] rounded-md px-4 py-3 outline-none"
        />
      </div>
    </div>
  );
}
