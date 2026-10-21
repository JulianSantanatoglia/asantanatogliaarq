// [CONFIRMAR] Lista de servicios y frases propuestas: tiene que validarlas el cliente.
export const services = {
  title: 'Qué hacemos',
  pendingNote: '[CONFIRMAR: servicios y textos]',
  items: [
    {
      title: 'Proyecto de arquitectura',
      text: 'Del anteproyecto a la documentación de obra, con cada decisión pensada.',
    },
    {
      title: 'Dirección y construcción de obra',
      text: 'Un solo responsable que sigue la obra y cuida el proyecto en cada etapa.',
    },
    {
      title: 'Remodelaciones y reordenamiento funcional',
      text: 'Nuevos espacios y un nuevo orden para la casa que ya tenés.',
    },
  ],
} as const
