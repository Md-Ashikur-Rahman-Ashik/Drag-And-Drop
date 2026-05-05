import { Data, ComponentData } from "@measured/puck";

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  data: Data;
}

export function prepareTemplateData(data: Data): Data {
  return {
    ...data,
    content: data.content.map((component, index) => ({
      ...component,
      id: `${(component as ComponentData).type.toLowerCase()}-${index}-${Date.now()}`,
    })),
  };
}

export const templates: Template[] = [
  {
    id: "blank",
    name: "Blank page",
    description: "Start from scratch with an empty canvas",
    category: "Basic",
    preview: "⬜",
    data: { content: [], root: {} },
  },
  {
    id: "landing-page",
    name: "Landing Page",
    description: "Hero, features, testimonial and newsletter",
    category: "Marketing",
    preview: "🚀",
    data: {
      root: {},
      content: [
        {
          type: "Navbar",
          props: {
            brandName: "My Brand",
            links: [
              { label: "Features", url: "#features" },
              { label: "Pricing", url: "#pricing" },
              { label: "Contact", url: "#contact" },
            ],
            theme: "light",
          },
        },
        {
          type: "Hero",
          props: {
            title: "Build something people love",
            subtitle:
              "The fastest way to create beautiful websites without writing a single line of code.",
            buttonText: "Get started free",
            buttonLink: "#",
          },
        },
        {
          type: "FeatureGrid",
          props: {
            title: "Everything you need",
            subtitle: "Powerful tools built for modern teams.",
            feature1Title: "Easy to use",
            feature1Description:
              "Intuitive drag and drop interface anyone can master.",
            feature2Title: "Fully customizable",
            feature2Description:
              "Every component matches your brand perfectly.",
            feature3Title: "Production ready",
            feature3Description: "Deploy to any platform with one click.",
          },
        },
        {
          type: "Testimonial",
          props: {
            quote:
              "This tool completely transformed how we build websites. What used to take weeks now takes hours.",
            authorName: "Sarah Johnson",
            authorRole: "Product Designer",
            authorCompany: "Acme Inc",
          },
        },
        {
          type: "Newsletter",
          props: {
            title: "Stay in the loop",
            subtitle: "Get the latest updates delivered to your inbox.",
            buttonText: "Subscribe",
            placeholder: "Enter your email",
          },
        },
        {
          type: "Footer",
          props: {
            brandName: "My Brand",
            tagline: "Building the web, one page at a time.",
            theme: "light",
          },
        },
      ],
    },
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Showcase your work with a professional portfolio",
    category: "Personal",
    preview: "🎨",
    data: {
      root: {},
      content: [
        {
          type: "Navbar",
          props: {
            brandName: "John Doe",
            links: [
              { label: "Work", url: "#work" },
              { label: "About", url: "#about" },
              { label: "Contact", url: "#contact" },
            ],
            theme: "light",
          },
        },
        {
          type: "HeroSplit",
          props: {
            title: "Designer & Developer crafting digital experiences",
            subtitle:
              "I help startups and businesses build beautiful products that users love.",
            buttonText: "View my work",
            buttonLink: "#work",
            imageUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
            imagePosition: "right",
          },
        },
        {
          type: "FeatureGrid",
          props: {
            title: "What I do",
            subtitle: "End-to-end product design and development.",
            feature1Title: "UI/UX Design",
            feature1Description:
              "Beautiful, intuitive interfaces that users love.",
            feature2Title: "Development",
            feature2Description: "Clean, maintainable code that scales.",
            feature3Title: "Strategy",
            feature3Description: "Product thinking from concept to launch.",
          },
        },
        {
          type: "Testimonial",
          props: {
            quote:
              "Working with John was an incredible experience. He delivered beyond our expectations.",
            authorName: "Emily Chen",
            authorRole: "CEO",
            authorCompany: "StartupXYZ",
          },
        },
        {
          type: "ContactForm",
          props: {
            title: "Let's work together",
            subtitle: "Have a project in mind? I'd love to hear about it.",
            buttonText: "Send message",
          },
        },
        {
          type: "Footer",
          props: {
            brandName: "John Doe",
            tagline: "Designing and building since 2015.",
            theme: "dark",
          },
        },
      ],
    },
  },
  {
    id: "business",
    name: "Business",
    description: "Professional site for businesses and agencies",
    category: "Business",
    preview: "💼",
    data: {
      root: {},
      content: [
        {
          type: "Navbar",
          props: {
            brandName: "Acme Agency",
            links: [
              { label: "Services", url: "#services" },
              { label: "About", url: "#about" },
              { label: "FAQ", url: "#faq" },
              { label: "Contact", url: "#contact" },
            ],
            theme: "dark",
          },
        },
        {
          type: "HeroSplit",
          props: {
            title: "We help businesses grow faster",
            subtitle:
              "Strategy, design and technology working together to drive real results for your business.",
            buttonText: "Get a free consultation",
            buttonLink: "#contact",
            imageUrl:
              "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
            imagePosition: "right",
          },
        },
        {
          type: "FeatureGrid",
          props: {
            title: "Our services",
            subtitle: "Everything your business needs to succeed online.",
            feature1Title: "Brand Strategy",
            feature1Description:
              "Build a brand that resonates with your audience.",
            feature2Title: "Web Design",
            feature2Description:
              "Beautiful websites that convert visitors to customers.",
            feature3Title: "Growth Marketing",
            feature3Description:
              "Data-driven campaigns that deliver measurable ROI.",
          },
        },
        {
          type: "FAQ",
          props: {
            question: "How long does a typical project take?",
            answer:
              "Most projects are completed within 4-8 weeks depending on scope and complexity.",
          },
        },
        {
          type: "ContactForm",
          props: {
            title: "Start a project",
            subtitle:
              "Tell us about your business and we'll get back to you within 24 hours.",
            buttonText: "Send message",
          },
        },
        {
          type: "Footer",
          props: {
            brandName: "Acme Agency",
            tagline: "Growing businesses since 2018.",
            theme: "dark",
          },
        },
      ],
    },
  },
  {
    id: "blog-post",
    name: "Blog Post",
    description: "Clean layout for articles and long-form content",
    category: "Content",
    preview: "✍️",
    data: {
      root: {},
      content: [
        {
          type: "Navbar",
          props: {
            brandName: "My Blog",
            links: [
              { label: "Home", url: "/" },
              { label: "Articles", url: "/articles" },
              { label: "About", url: "/about" },
            ],
            theme: "light",
          },
        },
        {
          type: "Hero",
          props: {
            title: "The Future of Web Development in 2026",
            subtitle:
              "An in-depth look at the tools, frameworks and trends shaping how we build for the web.",
            buttonText: "Read more",
            buttonLink: "#content",
          },
        },
        {
          type: "Divider",
          props: { text: "Article", style: "line" },
        },
        {
          type: "TextBlock",
          props: {
            text: "The web development landscape has changed dramatically over the past few years. New frameworks, AI-assisted coding tools, and shifting user expectations have created both challenges and opportunities for developers at every level.",
            fontSize: "lg",
            align: "left",
          },
        },
        {
          type: "TextBlock",
          props: {
            text: "In this article, we explore the most important trends to watch and how you can position yourself to take advantage of them.",
            fontSize: "md",
            align: "left",
          },
        },
        {
          type: "Divider",
          props: { text: "Stay updated", style: "dashed" },
        },
        {
          type: "Newsletter",
          props: {
            title: "Enjoyed this article?",
            subtitle:
              "Subscribe for weekly insights on web development and design.",
            buttonText: "Subscribe",
            placeholder: "your@email.com",
          },
        },
        {
          type: "Footer",
          props: {
            brandName: "My Blog",
            tagline: "Thoughts on web development and design.",
            theme: "light",
          },
        },
      ],
    },
  },
  {
    id: "coming-soon",
    name: "Coming Soon",
    description: "Build excitement before your launch",
    category: "Basic",
    preview: "⏳",
    data: {
      root: {},
      content: [
        {
          type: "Hero",
          props: {
            title: "Something exciting is coming",
            subtitle:
              "We're working hard to bring you something amazing. Be the first to know when we launch.",
            buttonText: "Notify me",
            buttonLink: "#notify",
          },
        },
        {
          type: "Newsletter",
          props: {
            title: "Get early access",
            subtitle: "Join the waitlist and be first in line.",
            buttonText: "Join waitlist",
            placeholder: "Enter your email",
          },
        },
      ],
    },
  },
];

export const getTemplate = (id: string): Template | undefined => {
  return templates.find((t) => t.id === id);
};

export const getTemplatesByCategory = () => {
  const categories: Record<string, Template[]> = {};
  templates.forEach((template) => {
    if (!categories[template.category]) {
      categories[template.category] = [];
    }
    categories[template.category].push(template);
  });
  return categories;
};
