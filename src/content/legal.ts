import { site } from './site'

// [PENDIENTE] Que lo revise un profesional legal antes de publicar.
export const LEGAL_UPDATED = '21 de octubre de 2026'

export type LegalSection = { title: string; body: string[] }
export type LegalPage = { title: string; intro: string; sections: LegalSection[] }

const AAIP = [
  'El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto conforme lo establecido en el artículo 14, inciso 3 de la Ley N° 25.326.',
  'La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, en su carácter de Órgano de Control de la Ley N° 25.326, tiene la atribución de atender las denuncias y reclamos que interpongan quienes resulten afectados en sus derechos por incumplimiento de las normas vigentes en materia de protección de datos personales.',
]

export const privacy: LegalPage = {
  title: 'Política de privacidad',
  intro: `Este sitio es de ${site.name}, arquitecto (matrícula ${site.matricula}). Acá se explica qué datos se tratan, para qué y cómo ejercer tus derechos, conforme a la Ley N° 25.326 de Protección de los Datos Personales.`,
  sections: [
    {
      title: 'Responsable',
      body: [`Responsable del tratamiento: ${site.name}. Contacto: ${site.email}.`],
    },
    {
      title: 'Qué datos se tratan',
      body: [
        'El sitio no tiene formularios que guarden o envíen datos. La ficha de contacto arma un mensaje en tu navegador y abre WhatsApp: el mensaje solo se envía si vos lo mandás desde tu WhatsApp, y desde ese momento se rige por las condiciones de WhatsApp.',
        'Si escribís por WhatsApp, teléfono o email, los datos que compartas (nombre, contacto y detalles del proyecto) se usan solo para responder tu consulta y, si avanzamos, para el proyecto.',
        'Si aceptás las cookies de analítica, Google Analytics recoge datos de uso del sitio de forma agregada (páginas vistas, dispositivo, ubicación aproximada). Ver la política de cookies.',
      ],
    },
    {
      title: 'Conservación y cesión',
      body: [
        'Los datos de las consultas se conservan mientras sean necesarios para responderlas o para el proyecto. No se venden ni se ceden a terceros, salvo obligación legal.',
      ],
    },
    {
      title: 'Tus derechos',
      body: [
        `Podés pedir el acceso, la rectificación, la actualización o la supresión de tus datos escribiendo a ${site.email}.`,
        ...AAIP,
      ],
    },
  ],
}

export const cookies: LegalPage = {
  title: 'Política de cookies',
  intro:
    'Las cookies son archivos chicos que un sitio guarda en tu navegador. Este sitio solo usa cookies de analítica, y solo si las aceptás.',
  sections: [
    {
      title: 'Qué cookies usamos',
      body: [
        'Google Analytics 4 (_ga y _ga_<ID>): miden de forma agregada cómo se usa el sitio. Duran hasta 2 años. Solo se instalan si aceptás en el aviso de cookies.',
        'Preferencia de cookies (consent:v1): guarda tu elección en el almacenamiento local del navegador para no volver a preguntarte. No es una cookie y no sale de tu dispositivo.',
      ],
    },
    {
      title: 'Cómo cambiar tu elección',
      body: [
        'Podés cambiarla cuando quieras desde "Preferencias de cookies", al pie de cada página. Si rechazás, se borran las cookies de analítica. También podés borrarlas desde la configuración de tu navegador.',
      ],
    },
    {
      title: 'Más información',
      body: [`Por cualquier consulta, escribinos a ${site.email}.`],
    },
  ],
}
