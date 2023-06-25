import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MedicosView from "../views/medico/MedicosView.vue";
import PacientesView from "../views/paciente/PacientesView.vue";
import SecretariasView from "../views/secretaria/SecretariasView.vue";
import HistoricosView from "../views/historico/HistoricosView.vue";
import ConvenioView from "../views/convenio/ConvenioView.vue";
import AgendamentoView from "../views/agendamentos/AgendamentoView.vue";
import EspecialidadeView from "../views/especialidades/EspecialidadeView.vue";
import CadastroMedico from "../views/medico/formCadastro/CadastroMedico.vue";
import CadastroPaciente from "../views/paciente/formCadastro/CadastroPaciente.vue";
import CadastroSecretaria from "../views/secretaria/formCadastro/CadastroSecretaria.vue";
import CadastroAgendamento from "../views/agendamentos/formCadastro/CadastroAgendamento.vue";
import CadastroEspecialidade from "../views/especialidades/formCadastro/CadastroEspecialidade.vue";
import CadastroConvenio from "../views/convenio/formCadastro/CadastroConvenio.vue";
import DetalhesSecretaria from "../views/secretaria/detalhes/DetalhesSecretaria.vue";
import DetalhesEspecialidade from "../views/especialidades/detalhes/DetalhesEspecialidade.vue";
import DetalhesPaciente from "../views/paciente/detalhes/DetalhesPaciente.vue";
import DetalhesAgendamento from "../views/agendamentos/detalhes/DetalhesAgendamento.vue";
import DetalhesConvenio from "../views/convenio/detalhes/DetalhesConvenio.vue";
import DetalhesMedico from "../views/medico/detalhes/DetalhesMedico.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/medicos",
    name: "medicos",
    component: MedicosView,
  },
  {
    path: "/secretarias",
    name: "secretarias",
    component: SecretariasView,
  },
  {
    path: "/pacientes",
    name: "pacientes",
    component: PacientesView,
  },
  {
    path: "/historicos",
    name: "historicos",
    component: HistoricosView,
  },
  {
    path: "/convenios",
    name: "convenios",
    component: ConvenioView,
  },
  {
    path: "/agendamentos",
    name: "agendamentos",
    component: AgendamentoView,
  },
  {
    path: "/especialidades",
    name: "especialidades",
    component: EspecialidadeView,
  },
  {
    path: "/cadastrarMedico/:id?",
    name: "cadastrarMedico",
    component: CadastroMedico,
    props: (router) => ({ id: router.params.id }),
  },
  {
    path: "/cadastrarPaciente/:id?",
    name: "cadastroPaciente",
    component: CadastroPaciente,
    props: (router) => ({ id: router.params.id }),
  },
  {
    path: "/cadastrarSecretaria/:id?",
    name: "cadastroSecretaria",
    component: CadastroSecretaria,
    props: (router) => ({ id: router.params.id }),
  },
  {
    path: "/cadastrarEspecialidade/:id?",
    name: "cadastroEspecialidade",
    component: CadastroEspecialidade,
    props: (router) => ({ id: router.params.id }),
  },
  {
    path: "/cadastrarConvenio/:id?",
    name: "cadastrarConvenio",
    component: CadastroConvenio,
    props: (router) => ({ id: router.params.id }),
  },
  {
    path: "/cadastrarAgendamento",
    name: "cadastroAgendamento",
    component: CadastroAgendamento,
  },
  {
    path: "/detalhesSecretaria/:id?",
    name: "detalhesSecretaria",
    component: DetalhesSecretaria,
    props: (router) => ({ id: router.params.id }),
  },
  {
    path: "/detalhesEspecialidades/:id?",
    name: "detalhesEspecialidades",
    component: DetalhesEspecialidade,
    props: (router) => ({ id: router.params.id }),
  },
  {
    path: "/detalhesPaciente/:id?",
    name: "detalhesPaciente",
    component: DetalhesPaciente,
    props: (router) => ({ id: router.params.id }),
  },
  {
    path: "/detalhesAgendamento/:id?",
    name: "detalhesAgendamento",
    component: DetalhesAgendamento,
    props: (router) => ({ id: router.params.id }),
  },
  {
    path: "/detalhesConvenio/:id?",
    name: "detalhesConvenio",
    component: DetalhesConvenio,
    props: (router) => ({ id: router.params.id }),
  },
  {
    path: "/detalhesMedico/:id?",
    name: "detalhesMedico",
    component: DetalhesMedico,
    props: (router) => ({ id: router.params.id }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
