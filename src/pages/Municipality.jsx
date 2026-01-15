import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import {
  Menu,
  Edit,
  Trash2,
  Search,
  BarChart3,
  PieChart,
  MapPin,
  FileText,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";

import { Button } from "../components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/Table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/Dialog";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Drawer, DrawerContent, DrawerTrigger } from "../components/ui/Drawer";
import { Badge } from "../components/ui/Badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/Pagination";

import SideBar from "../components/SideBar";

// Registrar os elementos do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Municipality() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dados de exemplo
  const municipios = [
    {
      id: 1,
      name: "Luanda",
      username: "luanda01",
      province: "Luanda",
      createdAt: "2026-01-12",
      denuncias: { recebidas: 10, emAnalise: 5, resolvidas: 7 },
      status: "Ativo",
    },
    {
      id: 2,
      name: "Viana",
      username: "viana01",
      province: "Luanda",
      createdAt: "2026-01-12",
      denuncias: { recebidas: 8, emAnalise: 3, resolvidas: 4 },
      status: "Ativo",
    },
    {
      id: 3,
      name: "Belas",
      username: "belas01",
      province: "Luanda",
      createdAt: "2026-01-11",
      denuncias: { recebidas: 12, emAnalise: 6, resolvidas: 8 },
      status: "Inativo",
    },
    {
      id: 4,
      name: "Cacuaco",
      username: "cacuaco01",
      province: "Luanda",
      createdAt: "2026-01-10",
      denuncias: { recebidas: 5, emAnalise: 2, resolvidas: 3 },
      status: "Ativo",
    },
    {
      id: 5,
      name: "Kilamba Kiaxi",
      username: "kilamba01",
      province: "Luanda",
      createdAt: "2026-01-09",
      denuncias: { recebidas: 15, emAnalise: 7, resolvidas: 10 },
      status: "Ativo",
    },
    {
      id: 6,
      name: "Talatona",
      username: "talatona01",
      province: "Luanda",
      createdAt: "2026-01-08",
      denuncias: { recebidas: 9, emAnalise: 4, resolvidas: 5 },
      status: "Ativo",
    },
  ];

  // Filtros e paginação
  const filteredMunicipios = municipios.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMunicipios.length / itemsPerPage);
  const paginatedMunicipios = filteredMunicipios.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Métricas
  const totalMunicipios = municipios.length;
  const totalDenuncias = municipios.reduce(
    (acc, m) => acc + m.denuncias.recebidas,
    0
  );
  const denunciasEmAnalise = municipios.reduce(
    (acc, m) => acc + m.denuncias.emAnalise,
    0
  );
  const denunciasResolvidas = municipios.reduce(
    (acc, m) => acc + m.denuncias.resolvidas,
    0
  );

  // Dados para gráficos - Pro Palette
  const barData = {
    labels: municipios.map((m) => m.name),
    datasets: [
      {
        label: "Recebidas",
        data: municipios.map((m) => m.denuncias.recebidas),
        backgroundColor: "#0f172a", // Slate 900
        borderRadius: 4,
        barThickness: 20,
      },
      {
        label: "Em Análise",
        data: municipios.map((m) => m.denuncias.emAnalise),
        backgroundColor: "#94a3b8", // Slate 400
        borderRadius: 4,
        barThickness: 20,
      },
      {
        label: "Resolvidas",
        data: municipios.map((m) => m.denuncias.resolvidas),
        backgroundColor: "#e2e8f0", // Slate 200
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  const pieData = {
    labels: ["Recebidas", "Em Análise", "Resolvidas"],
    datasets: [
      {
        label: "Estados das Denúncias",
        data: [totalDenuncias, denunciasEmAnalise, denunciasResolvidas],
        backgroundColor: ["#0f172a", "#64748b", "#cbd5e1"],
        borderWidth: 0,
        hoverOffset: 15,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-50">
        <SideBar />
      </aside>

      {/* Sidebar Mobile */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-40"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="lg:hidden">
          <div className="p-4">
            <SideBar />
          </div>
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="max-w-[1600px] mx-auto p-4 md:p-8 space-y-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1.5">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Municípios
              </h1>
              <div className="flex items-center gap-2 text-slate-400 text-[13px] font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  Gestão Estratégica
                </span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span>Plataforma do Governo</span>
              </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-200 px-8 h-12 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <MapPin className="mr-2 h-4 w-4" strokeWidth={2.5} />
                  Registar Município
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[480px] bg-white rounded-2xl border-none shadow-2xl p-0 overflow-hidden">
                <div className="bg-slate-900 p-8 text-white relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <MapPin size={120} strokeWidth={1} />
                  </div>
                  <DialogHeader className="relative z-10">
                    <DialogTitle className="text-2xl font-extrabold tracking-tight">
                      Novo Município
                    </DialogTitle>
                    <p className="text-slate-400 text-sm font-medium mt-1">
                      Registe uma nova unidade administrativa no sistema.
                    </p>
                  </DialogHeader>
                </div>
                <form className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                        Nome
                      </Label>
                      <Input
                        placeholder="Ex: Belas"
                        className="h-11 border-slate-100 rounded-lg focus:ring-slate-900 bg-slate-50/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                        ID Único
                      </Label>
                      <Input
                        placeholder="@belas_connect"
                        className="h-11 border-slate-100 rounded-lg focus:ring-slate-900 bg-slate-50/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                      Província
                    </Label>
                    <Input
                      placeholder="Luanda"
                      className="h-11 border-slate-100 rounded-lg focus:ring-slate-900 bg-slate-50/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">
                      Palavra-passe
                    </Label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="h-11 border-slate-100 rounded-lg focus:ring-slate-900 bg-slate-50/50"
                    />
                  </div>
                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-200"
                    >
                      Confirmar Registo
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Metric Overview Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <MapPin size={22} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                  Base
                </span>
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-slate-400 mb-1">
                  Municípios Ativos
                </h3>
                <div className="text-3xl font-bold text-slate-900 tracking-tight">
                  {totalMunicipios}
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                  <FileText size={22} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                  Alerta
                </span>
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-slate-400 mb-1">
                  Total de Denúncias
                </h3>
                <div className="text-3xl font-bold text-slate-900 tracking-tight">
                  {totalDenuncias}
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-100 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                  <Clock size={22} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                  Processo
                </span>
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-slate-400 mb-1">
                  Em Análise
                </h3>
                <div className="text-3xl font-bold text-slate-900 tracking-tight">
                  {denunciasEmAnalise}
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-100 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  <CheckCircle size={22} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                  Sucesso
                </span>
              </div>
              <div>
                <h3 className="text-[13px] font-semibold text-slate-400 mb-1">
                  Resolvidas
                </h3>
                <div className="text-3xl font-bold text-slate-900 tracking-tight">
                  {denunciasResolvidas}
                </div>
              </div>
            </div>
          </div>

          {/* Tabela de Municípios - Shadcn Evolution */}
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="px-0 pb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-bold text-slate-900 tracking-tight">
                    Registo de Unidades
                  </CardTitle>
                  <p className="text-slate-400 text-[13px] font-medium">
                    Controlo administrativo de municípios e distritos.
                  </p>
                </div>
                <div className="relative group w-full md:w-72">
                  <Input
                    placeholder="Filtrar por nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-10 border-slate-100 rounded-lg focus:ring-slate-900 focus:border-slate-900 transition-all bg-white group-hover:bg-slate-50/50 text-[13px]"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="hover:bg-transparent border-slate-100">
                      <TableHead className="py-4 px-6 text-slate-900 font-bold text-[12px] tracking-wide">
                        Município
                      </TableHead>
                      <TableHead className="py-4 px-6 text-slate-900 font-bold text-[12px] tracking-wide">
                        Utilizador
                      </TableHead>
                      <TableHead className="py-4 px-6 text-slate-900 font-bold text-[12px] tracking-wide">
                        Província
                      </TableHead>
                      <TableHead className="py-4 px-6 text-slate-900 font-bold text-[12px] tracking-wide text-center">
                        Incidências
                      </TableHead>
                      <TableHead className="py-4 px-6 text-slate-900 font-bold text-[12px] tracking-wide">
                        Registado em
                      </TableHead>
                      <TableHead className="py-4 px-6 text-slate-900 font-bold text-[12px] tracking-wide text-center">
                        Estado
                      </TableHead>
                      <TableHead className="py-4 px-6 text-slate-900 font-bold text-[12px] tracking-wide text-right">
                        Gestão
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedMunicipios.map((m) => (
                      <TableRow
                        key={m.id}
                        className="hover:bg-slate-50/50 transition-colors border-slate-100 last:border-0 text-slate-400"
                      >
                        <TableCell className="py-4 px-6 font-semibold text-slate-900 border-none">
                          {m.name}
                        </TableCell>
                        <TableCell className="py-4 px-6 border-none font-medium text-xs">
                          @{m.username}
                        </TableCell>
                        <TableCell className="py-4 px-6 border-none text-xs">
                          {m.province}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-center border-none">
                          <span className="font-bold text-slate-900 text-sm">
                            {m.denuncias.recebidas}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 px-6 border-none text-[11px] font-medium uppercase tracking-wider">
                          {m.createdAt}
                        </TableCell>
                        <TableCell className="py-4 px-6 text-center border-none">
                          <Badge
                            className={`rounded-full px-2.5 py-0.5 font-bold text-[9px] uppercase tracking-widest border-none ${
                              m.status === "Ativo"
                                ? "bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-500/20 shadow-none hover:bg-emerald-50"
                                : "bg-slate-50 text-slate-400 ring-1 ring-inset ring-slate-500/20 shadow-none hover:bg-slate-50"
                            }`}
                          >
                            {m.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-4 px-6 text-right border-none">
                          <div className="flex justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all border border-transparent hover:border-slate-200"
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-[12px] text-slate-400 font-semibold tracking-wide uppercase">
                  Registos:{" "}
                  <span className="text-slate-900">
                    {paginatedMunicipios.length}
                  </span>{" "}
                  / {filteredMunicipios.length}
                </p>
                {totalPages > 1 && (
                  <Pagination>
                    <PaginationContent className="gap-1">
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }
                          className={`h-9 rounded-lg px-3 border-transparent hover:bg-slate-100 transition-all text-[11px] font-bold uppercase tracking-wider ${
                            currentPage === 1
                              ? "pointer-events-none opacity-20"
                              : "cursor-pointer"
                          }`}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={currentPage === page}
                              className={`h-9 w-9 rounded-lg transition-all text-xs font-bold ${
                                currentPage === page
                                  ? "bg-slate-900 text-white border-none shadow-md shadow-slate-200 hover:bg-slate-800"
                                  : "hover:bg-slate-100 border-none cursor-pointer text-slate-500 shadow-none"
                              }`}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      )}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            setCurrentPage(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                          className={`h-9 rounded-lg px-3 border-transparent hover:bg-slate-100 transition-all text-[11px] font-bold uppercase tracking-wider ${
                            currentPage === totalPages
                              ? "pointer-events-none opacity-20"
                              : "cursor-pointer"
                          }`}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Gráficos de Estatísticas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
              <CardHeader className="px-8 pt-8 pb-4 border-none">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-bold text-slate-900 tracking-tight">
                      Incidências por Localidade
                    </CardTitle>
                    <p className="text-slate-400 text-[13px] font-medium">
                      Análise geográfica de denúncias recebidas.
                    </p>
                  </div>
                  <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 border border-slate-100">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="h-[280px] w-full mt-4">
                  <Bar
                    data={barData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top",
                          align: "end",
                          labels: {
                            usePointStyle: true,
                            pointStyle: "circle",
                            padding: 20,
                            font: { size: 11, weight: "700" },
                            color: "#94a3b8",
                          },
                        },
                        tooltip: {
                          backgroundColor: "#0f172a",
                          padding: 12,
                          titleFont: { size: 12, weight: "bold" },
                          bodyFont: { size: 12 },
                          cornerRadius: 8,
                          displayColors: false,
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: { color: "#f8fafc", drawBorder: false },
                          ticks: {
                            color: "#cbd5e1",
                            font: { size: 10, weight: "600" },
                          },
                        },
                        x: {
                          grid: { display: false },
                          ticks: {
                            color: "#94a3b8",
                            font: { size: 10, weight: "600" },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
              <CardHeader className="px-8 pt-8 pb-4 border-none">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-bold text-slate-900 tracking-tight">
                      Taxa de Resolução
                    </CardTitle>
                    <p className="text-slate-400 text-[13px] font-medium">
                      Eficiência administrativa por categoria de estado.
                    </p>
                  </div>
                  <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 border border-slate-100">
                    <PieChart className="h-5 w-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="h-[280px] w-full flex justify-center mt-4">
                  <Pie
                    data={pieData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "right",
                          labels: {
                            usePointStyle: true,
                            pointStyle: "circle",
                            padding: 25,
                            font: { size: 11, weight: "700" },
                            color: "#94a3b8",
                          },
                        },
                        tooltip: {
                          backgroundColor: "#0f172a",
                          padding: 12,
                          cornerRadius: 8,
                          displayColors: false,
                        },
                      },
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Municipality;
