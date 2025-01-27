export const siteConfig = {
  name: "Showcaser",
  description:
    "Créez des landing pages qui convertissent, sans code. La plateforme tout-en-un pour créer, personnaliser et publier des pages web professionnelles.",
  contact: {
    email: "noah.vernhetpro@gmail.com",
    address: "Toulouse, France",
    title: "Contactez-nous",
    subtitle: "Une question ? Un projet ? Nous sommes là pour vous aider.",
    form: {
      title: "Envoyez-nous un message",
      firstname: "Prénom",
      lastname: "Nom",
      email: "Email",
      subject: "Sujet",
      message: "Message",
      submit: "Envoyer le message",
      placeholders: {
        firstname: "Votre prénom",
        lastname: "Votre nom",
        email: "votre@email.com",
        subject: "Le sujet de votre message",
        message: "Votre message...",
      },
    },
  },
  company: {
    foundedYear: 2024,
    about: {
      title: "À propos",
      subtitle:
        "Nous révolutionnons la création de landing pages pour les entrepreneurs et créatifs.",
      mission: {
        title: "Notre Mission",
        description:
          "Notre mission est de démocratiser la création de pages web professionnelles. Nous croyons que chaque entreprise mérite d'avoir une présence en ligne exceptionnelle, sans avoir besoin de compétences techniques avancées ou de ressources importantes.",
      },
      values: {
        title: "Nos Valeurs",
        items: [
          {
            title: "Simplicité",
            description:
              "Nous rendons la création web accessible à tous grâce à notre interface intuitive et nos templates prêts à l'emploi.",
          },
          {
            title: "Innovation",
            description:
              "Nous intégrons les dernières technologies pour offrir des solutions modernes et performantes.",
          },
          {
            title: "Excellence",
            description:
              "Nous nous engageons à fournir des outils de la plus haute qualité pour votre succès en ligne.",
          },
        ],
      },
      history: {
        title: "Notre Histoire",
        description:
          "est né de la volonté de simplifier la création de landing pages. Notre équipe passionnée travaille constamment pour améliorer nos outils et offrir la meilleure expérience possible à nos utilisateurs.",
      },
    },
  },
  legal: {
    privacy: {
      title: "Politique de Confidentialité",
      subtitle:
        "nous prenons la protection de vos données personnelles très au sérieux.",
      description:
        "collecte, utilise et protège vos informations personnelles lorsque vous utilisez notre plateforme de création de landing pages.",
      dataCollection: {
        title: "Collecte des Données",
        intro: "Nous collectons les informations suivantes :",
        items: [
          "Informations de compte (nom, email, mot de passe)",
          "Données de paiement (via notre processeur de paiement sécurisé)",
          "Contenu des landing pages créées",
          "Données d'utilisation et analytics",
          "Informations techniques (adresse IP, type de navigateur)",
        ],
      },
    },
    terms: {
      title: "Conditions Générales d'Utilisation",
      subtitle:
        "Les présentes conditions régissent l'utilisation de la plateforme",
      intro:
        "vous acceptez les présentes conditions générales d'utilisation dans leur intégralité.",
      definitions: {
        title: "Définitions",
        items: [
          {
            term: "Plateforme",
            definition: "désigne le site web",
          },
          {
            term: "Utilisateur",
            definition: "toute personne utilisant la Plateforme",
          },
          {
            term: "Services",
            definition: "création et gestion de landing pages",
          },
          {
            term: "Contenu",
            definition: "tous les éléments créés via la Plateforme",
          },
        ],
      },
      financial: {
        title: "Conditions Financières",
        description:
          "Les tarifs sont indiqués sur la page de tarification. Le paiement est dû selon les conditions de l'abonnement choisi.",
        notice:
          "Nous nous réservons le droit de modifier les tarifs avec un préavis de 30 jours.",
      },
      responsibilities: {
        title: "Responsabilités",
        intro: "L'utilisateur est responsable :",
        items: [
          "Du contenu qu'il publie",
          "Du respect des droits des tiers",
          "De la sécurité de son compte",
        ],
        disclaimer:
          "ne peut être tenu responsable des contenus publiés par les utilisateurs ou des dommages indirects.",
      },
      termination: {
        title: "Résiliation",
        description:
          "Nous nous réservons le droit de suspendre ou résilier un compte en cas de violation des présentes conditions. L'utilisateur peut résilier son compte à tout moment, sous réserve du respect des conditions de son abonnement.",
      },
    },
  },
  links: {
    privacy: "/privacy",
    terms: "/terms",
    about: "/about",
    contact: "/contact",
  },
} as const;
