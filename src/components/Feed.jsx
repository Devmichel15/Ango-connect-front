import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FiMoreHorizontal, FiHeart, FiMessageCircle, FiShare2, FiPlus } from "react-icons/fi";

function Feed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: { name: "Administração de Luanda", role: "governo" },
      content: "Novo centro de saúde inaugurado no Rangel.",
      media: { type: "image", url: "/post1.jpg" },
      createdAt: "Hoje • 10:30",
    },
  ]);

  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  function handleCreatePost(e) {
    e.preventDefault();
    if (!text && !file) return;

    const newPost = {
      id: Date.now(),
      author: { name: "Governo Provincial", role: "governo" },
      content: text,
      createdAt: "Agora",
      media: file
        ? {
            type: file.type.startsWith("video") ? "video" : "image",
            url: URL.createObjectURL(file),
          }
        : null,
    };

    setPosts([newPost, ...posts]);
    setText("");
    setFile(null);
  }

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">

      {/* Criar Post */}
      <form
        onSubmit={handleCreatePost}
        className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-md hover:shadow-lg transition"
      >
        <textarea
          placeholder="Escreva um comunicado..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full resize-none outline-none text-sm placeholder-gray-400 p-3 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
          rows={3}
        />

        {/* Preview de mídia */}
        {file && (
          <div className="relative mt-2">
            {file.type.startsWith("image") ? (
              <img src={URL.createObjectURL(file)} alt="preview" className="w-full rounded-xl object-cover max-h-60" />
            ) : (
              <video src={URL.createObjectURL(file)} controls className="w-full rounded-xl max-h-60" />
            )}
            <button
              type="button"
              onClick={() => setFile(null)}
              className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-full hover:bg-red-600 transition"
            >
              X
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          {/* Input de arquivo estilizado */}
          <label className="flex items-center space-x-1 cursor-pointer text-blue-600 hover:text-blue-800 transition text-sm">
            <FiPlus size={16} />
            <span>Adicionar mídia</span>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm hover:bg-blue-700 transition"
          >
            Publicar
          </button>
        </div>
      </form>

      {/* Feed */}
      {posts.map((post) => (
        <div key={post.id} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-md hover:shadow-lg transition">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-sm">{post.author.name}</p>
              <p className="text-xs text-gray-500">{post.createdAt}</p>
            </div>

            {/* Radix Dropdown Menu */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="p-1 rounded-full hover:bg-gray-100 transition">
                  <FiMoreHorizontal size={18} />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content className="bg-white border border-gray-200 rounded-lg shadow-md p-2 min-w-30">
                <DropdownMenu.Item className="text-sm px-3 py-1 hover:bg-gray-100 cursor-pointer rounded">Editar</DropdownMenu.Item>
                <DropdownMenu.Item className="text-sm px-3 py-1 hover:bg-gray-100 cursor-pointer rounded">Excluir</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>

          {/* Conteúdo */}
          <p className="text-sm">{post.content}</p>

          {post.media && post.media.type === "image" && (
            <img
              src={post.media.url}
              alt="post media"
              className="w-full rounded-xl mt-2 max-h-80 object-cover"
            />
          )}

          {post.media && post.media.type === "video" && (
            <video
              src={post.media.url}
              controls
              className="w-full rounded-xl mt-2 max-h-80"
            />
          )}

          {/* Ações */}
          <div className="flex items-center justify-between mt-3 text-gray-500">
            <button className="flex items-center space-x-1 hover:text-red-500 transition">
              <FiHeart /> <span className="text-sm">Curtir</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-blue-500 transition">
              <FiMessageCircle /> <span className="text-sm">Comentar</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-green-500 transition">
              <FiShare2 /> <span className="text-sm">Compartilhar</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;
