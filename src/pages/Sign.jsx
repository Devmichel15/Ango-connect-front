import { useState } from "react";
import api from "../services/api";
import { AlertModal } from "../components/AlertModal";
import { SuccessModal } from "../components/SucessModal";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Sign() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const Navigate = useNavigate();
  function handleSubmit() {
    if (name === "" || email === "" || password === "") {
      setOpenModal(true);
      return;
    }
    const data = {
      name: name,
      email: email,
      password: password,
    };
    CadastrarUser(data);
  }

  async function CadastrarUser(data) {
    const response = await api.post("/governments/register", data);
    if (response.status === 201) {
      setSuccessModalOpen(true);
      Navigate("/login");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Angola Connect" className="w-40 h-auto" />
        </div>

        {/* Título */}
        <h1 className="text-center text-xl font-semibold text-gray-800 mb-2">
          Criar Conta
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Registo no Portal Governamental Angola Connect
        </p>

        {/* Formulário */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Nome completo
            </label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Email institucional
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@governo.ao"
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Palavra-passe
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-700 text-white py-2 rounded-md
                       font-medium hover:bg-blue-800 transition"
          >
            Criar Conta
          </button>
        </div>

        {/* Rodapé */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Já possui uma conta?{" "}
          <Link
            to="/login"
            className="text-blue-700 font-medium hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
      <AlertModal
        open={openModal}
        onOpenChange={setOpenModal}
        message="Por favor, preencha todos os campos."
      />
      <SuccessModal
        open={successModalOpen}
        onOpenChange={setSuccessModalOpen}
        message="Sua conta foi criada com sucesso!"
      />
    </div>
  );
}

export default Sign;
