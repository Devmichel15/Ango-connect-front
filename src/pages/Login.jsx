import { Link } from "react-router-dom";
import { useState } from "react";
import { AlertModal } from "../components/AlertModal";
import { SuccessModal } from "../components/SucessModal";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const Navigate = useNavigate();
  function handleSubmit() {
    if (email === "" || password === "") {
      setOpenModal(true);
      return;
    }
    const data = {
      email: email,
      password: password,
    };
    loginUser(data);
  }

  async function loginUser(data) {
    const response = await api.post("/governments/login", data);
    if (response.status === 200) {
      setSuccessModalOpen(true);
      localStorage.setItem("@angola-connect:token", response.data.token);
      localStorage.setItem("@angola-connect:userId", response.data.userId);
      Navigate("/");
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
          Acesso ao Sistema
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Angola Connect – Portal Governamental
        </p>

        {/* Formulário */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              Email institucional
            </label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@governo.ao"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-700 text-white py-2 rounded-md font-medium hover:bg-blue-800 transition"
          >
            Entrar
          </button>
        </div>

        {/* Rodapé */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Ainda não possui uma conta?{" "}
          <Link
            to="/cadastro"
            className="text-blue-700 font-medium hover:underline"
          >
            Criar conta
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
        message="Login realizado com sucesso!"
      />
    </div>
  );
}

export default Login;
