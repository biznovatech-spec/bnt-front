// Documentos legales del sitio; cada sección se pinta como un bloque numerado en LegalPage
export const legalDocs = {
    privacidad: {
        title: "Política de Privacidad",
        description: "Cómo Biznovatech recopila, usa y protege los datos personales que compartes con nosotros, conforme a la Ley N.° 29733.",
        updated: "Septiembre 2026",
        intro: "En Biznovatech valoramos la confianza que depositas en nosotros. Esta política explica qué datos personales recopilamos, para qué los usamos y cómo puedes ejercer tus derechos, de acuerdo con la Ley N.° 29733, Ley de Protección de Datos Personales, y su reglamento.",
        sections: [
            {
                title: "Datos que recopilamos",
                paragraphs: [
                    "Solo recopilamos los datos que nos proporcionas de forma voluntaria a través del formulario de contacto, el libro de reclamaciones, el correo electrónico o WhatsApp.",
                ],
                list: [
                    "Datos de identificación y contacto: nombre, organización, correo electrónico y teléfono.",
                    "Información sobre tu consulta o proyecto: etapa, servicios de interés y el mensaje que nos envías.",
                    "En el libro de reclamaciones: documento de identidad y domicilio, exigidos por la normativa de protección al consumidor.",
                ],
            },
            {
                title: "Finalidad del tratamiento",
                paragraphs: [
                    "Usamos tus datos únicamente para responder tu consulta, preparar propuestas, coordinar reuniones, ejecutar los servicios contratados y atender reclamos o quejas. No vendemos ni cedemos tus datos a terceros con fines comerciales.",
                ],
            },
            {
                title: "Encargados y transferencias",
                paragraphs: [
                    "Para recibir los mensajes de los formularios utilizamos proveedores de correo y envío de formularios que actúan como encargados del tratamiento. Estos servicios pueden alojar la información fuera del Perú, siempre bajo medidas de seguridad adecuadas.",
                ],
            },
            {
                title: "Conservación y seguridad",
                paragraphs: [
                    "Conservamos tus datos mientras sean necesarios para la finalidad indicada o durante los plazos exigidos por ley. Aplicamos medidas técnicas y organizativas razonables para evitar su pérdida, alteración o acceso no autorizado.",
                ],
            },
            {
                title: "Tus derechos",
                paragraphs: [
                    "Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, cancelación y oposición (derechos ARCO) escribiéndonos al correo de contacto indicado abajo. Responderemos dentro de los plazos establecidos por la ley. Si consideras que no atendimos tu solicitud, puedes acudir a la Autoridad Nacional de Protección de Datos Personales.",
                ],
            },
            {
                title: "Cookies y almacenamiento local",
                paragraphs: [
                    "El sitio no utiliza cookies publicitarias. Guardamos en tu navegador solo preferencias de uso, como el tema claro u oscuro y el control de envíos repetidos del formulario.",
                ],
            },
        ],
    },
    terminos: {
        title: "Términos y Condiciones",
        description: "Condiciones de uso del sitio web de Biznovatech y marco general de los servicios que ofrecemos.",
        updated: "Septiembre 2026",
        intro: "Al navegar por este sitio web aceptas los presentes términos y condiciones. Si no estás de acuerdo con ellos, te pedimos no utilizar el sitio.",
        sections: [
            {
                title: "Uso del sitio",
                paragraphs: [
                    "El contenido de este sitio tiene fines informativos sobre los servicios de Biznovatech. Te comprometes a usarlo de forma lícita, sin intentar vulnerar su seguridad ni afectar su funcionamiento.",
                ],
            },
            {
                title: "Propiedad intelectual",
                paragraphs: [
                    "Los textos, diseños, logotipos, ilustraciones y código de este sitio pertenecen a Biznovatech o se usan con autorización de sus titulares. No está permitida su reproducción total o parcial sin consentimiento previo por escrito. Las marcas de los casos de éxito pertenecen a sus respectivos clientes.",
                ],
            },
            {
                title: "Información de servicios y precios",
                paragraphs: [
                    "Las descripciones de servicios, plazos y rangos de inversión publicados son referenciales. El alcance, precio, cronograma, garantías y propiedad intelectual de cada proyecto se definen en la propuesta y en el contrato o acuerdo de servicios correspondiente.",
                ],
            },
            {
                title: "Enlaces a terceros",
                paragraphs: [
                    "El sitio puede incluir enlaces a plataformas externas como WhatsApp, Facebook o GitHub. No somos responsables del contenido ni de las políticas de privacidad de esos sitios.",
                ],
            },
            {
                title: "Responsabilidad",
                paragraphs: [
                    "Procuramos que la información publicada sea exacta y esté actualizada, pero no garantizamos la ausencia total de errores. Biznovatech no será responsable por decisiones tomadas únicamente a partir del contenido informativo del sitio.",
                ],
            },
            {
                title: "Reclamos y legislación aplicable",
                paragraphs: [
                    "Estos términos se rigen por las leyes de la República del Perú. Si tienes un reclamo o queja sobre nuestros servicios, puedes registrarlo en nuestro Libro de Reclamaciones virtual, conforme al Código de Protección y Defensa del Consumidor.",
                ],
                link: { to: "/libro-de-reclamaciones", label: "Ir al Libro de Reclamaciones" },
            },
        ],
    },
};
