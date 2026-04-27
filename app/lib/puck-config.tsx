import type { Config } from "@measured/puck";

interface NavLink {
  label: string;
  url: string;
}

interface NavbarProps {
  brandName: string;
  links: NavLink[];
  theme: "light" | "dark";
}

interface FooterProps {
  brandName: string;
  tagline: string;
  theme: "light" | "dark";
}

interface HeroSplitProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  imagePosition: "left" | "right";
}

interface FeatureGridProps {
  title: string;
  subtitle: string;
  feature1Title: string;
  feature1Description: string;
  feature2Title: string;
  feature2Description: string;
  feature3Title: string;
  feature3Description: string;
}

interface TestimonialProps {
  quote: string;
  authorName: string;
  authorRole: string;
  authorCompany: string;
}

interface PricingCardProps {
  planName: string;
  price: string;
  period: string;
  description: string;
  features: { feature: string }[];
  buttonText: string;
  highlighted: boolean;
}

interface FAQProps {
  question: string;
  answer: string;
}

interface ImageBlockProps {
  imageUrl: string;
  altText: string;
  caption: string;
  size: "small" | "medium" | "large" | "full";
}

interface VideoEmbedProps {
  videoUrl: string;
  title: string;
}

interface ContactFormProps {
  title: string;
  subtitle: string;
  buttonText: string;
}

interface NewsletterProps {
  title: string;
  subtitle: string;
  buttonText: string;
  placeholder: string;
}

interface DividerProps {
  text: string;
  style: "line" | "dashed" | "dots";
}

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface TextBlockProps {
  text: string;
  fontSize: "sm" | "md" | "lg" | "xl";
  align: "left" | "center" | "right";
}

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const puckConfig: Config<{
  Hero: HeroProps;
  TextBlock: TextBlockProps;
  Card: CardProps;
  Navbar: NavbarProps;
  Footer: FooterProps;
  HeroSplit: HeroSplitProps;
  FeatureGrid: FeatureGridProps;
  Testimonial: TestimonialProps;
  PricingCard: PricingCardProps;
  FAQ: FAQProps;
  ImageBlock: ImageBlockProps;
  VideoEmbed: VideoEmbedProps;
  ContactForm: ContactFormProps;
  Newsletter: NewsletterProps;
  Divider: DividerProps;
}> = {
  components: {
    Hero: {
      fields: {
        title: {
          type: "text",
          label: "Title",
        },
        subtitle: {
          type: "text",
          label: "Subtitle",
        },
        buttonText: {
          type: "text",
          label: "Button Text",
        },
        buttonLink: {
          type: "text",
          label: "Button Link",
        },
      },
      defaultProps: {
        title: "Welcome to my site",
        subtitle: "Built with the best drag and drop builder",
        buttonText: "Get Started",
        buttonLink: "#",
      },
      render: ({ title, subtitle, buttonText, buttonLink }) => (
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24 px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          <p className="text-xl text-blue-100 mb-8 text-w-2xl mx-auto">
            {subtitle}
          </p>
          <a
            href={buttonLink}
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            {buttonText}
          </a>
        </div>
      ),
    },

    TextBlock: {
      fields: {
        text: {
          type: "textarea",
          label: "Content",
        },
        fontSize: {
          type: "select",
          label: "Font Size",
          options: [
            { label: "Small", value: "sm" },
            { label: "Medium", value: "md" },
            { label: "Large", value: "lg" },
            { label: "Extra Large", value: "xl" },
          ],
        },
        align: {
          type: "select",
          label: "Alignment",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
        },
      },
      defaultProps: {
        text: "Add your content here",
        fontSize: "md",
        align: "left",
      },
      render: ({ text, fontSize, align }: TextBlockProps) => {
        const sizes = {
          sm: "text-sm",
          md: "text-base",
          lg: "text-lg",
          xl: "text-xl",
        };

        const alignments = {
          left: "text-left",
          center: "text-center",
          right: "text-right",
        };

        return (
          <div
            className={`px-8 py-6 max-w-4xl mx-auto ${sizes[fontSize]} ${alignments[align]}`}
          >
            <p className="text-gray-700 leading-relaxed">{text}</p>
          </div>
        );
      },
    },

    Card: {
      fields: {
        title: {
          type: "text",
          label: "Title",
        },
        description: {
          type: "textarea",
          label: "Description",
        },
        imageUrl: {
          type: "text",
          label: "Image URL",
        },
      },
      defaultProps: {
        title: "Card Title",
        description: "Card description goes here",
        imageUrl: "",
      },
      render: ({ title, description, imageUrl }: CardProps) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-sm mx-auto my-4">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-48 object-cover"
            />
          )}

          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>
        </div>
      ),
    },
    Navbar: {
      fields: {
        brandName: {
          type: "text",
          label: "Brand Name",
        },
        links: {
          type: "array",
          label: "Navigation Links",
          arrayFields: {
            label: { type: "text", label: "Link Label" },
            url: { type: "text", label: "URL" },
          },
          defaultItemProps: {
            label: "Link",
            url: "#",
          },
        },
        theme: {
          type: "select",
          label: "Theme",
          options: [
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
          ],
        },
      },
      defaultProps: {
        brandName: "My Site",
        links: [
          { label: "Home", url: "#" },
          { label: "About", url: "#about" },
          { label: "Contact", url: "#contact" },
        ],
        theme: "light",
      },
      render: ({ brandName, links, theme }: NavbarProps) => (
        <nav
          className={`px-8 py-4 flex items-center justify-between ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-900 border-b border-gray-100"
          }`}
        >
          <span className="font-bold text-lg">{brandName}</span>
          <div className="flex items-center gap-6">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                className={`text-sm font-medium transition-colors ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      ),
    },
    Footer: {
      fields: {
        brandName: { type: "text", label: "Brand Name" },
        tagline: { type: "text", label: "Tagline" },
        theme: {
          type: "select",
          label: "Theme",
          options: [
            { label: "Light", value: "light" },
            { label: "Dark", value: "dark" },
          ],
        },
      },
      defaultProps: {
        brandName: "My Site",
        tagline: "Building the web, one page at a time.",
        theme: "light",
      },
      render: ({ brandName, tagline, theme }) => (
        <footer
          className={`px-8 py-12 ${
            theme === "dark"
              ? "bg-gray-900 text-white"
              : "bg-gray-50 text-gray-900 border-t border-gray-100"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div>
                <p className="font-bold text-lg mb-2">{brandName}</p>
                <p
                  className={`text-sm max-w-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {tagline}
                </p>
              </div>
              <p
                className={`text-xs ${
                  theme === "dark" ? "text-gray-600" : "text-gray-400"
                }`}
              >
                © {new Date().getFullYear()} {brandName}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      ),
    },
    HeroSplit: {
      fields: {
        title: { type: "text", label: "Title" },
        subtitle: { type: "textarea", label: "Subtitle" },
        buttonText: { type: "text", label: "Button Text" },
        buttonLink: { type: "text", label: "Button Link" },
        imageUrl: { type: "text", label: "Image URL" },
        imagePosition: {
          type: "select",
          label: "Image Position",
          options: [
            { label: "Right", value: "right" },
            { label: "Left", value: "left" },
          ],
        },
      },
      defaultProps: {
        title: "Build something amazing",
        subtitle:
          "The fastest way to create beautiful websites without writing code.",
        buttonText: "Get Started",
        buttonLink: "#",
        imageUrl:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
        imagePosition: "right",
      },
      render: ({
        title,
        subtitle,
        buttonText,
        buttonLink,
        imageUrl,
        imagePosition,
      }) => (
        <div
          className={`flex flex-col md:flex-row items-center gap-12 px-8 py-16 max-w-6xl mx-auto ${
            imagePosition === "left" ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              {subtitle}
            </p>
            <a
              href={buttonLink}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {buttonText}
            </a>
          </div>
          <div className="flex-1">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={title}
                className="w-full rounded-2xl shadow-lg object-cover aspect-video"
              />
            )}
          </div>
        </div>
      ),
    },
    FeatureGrid: {
      fields: {
        title: { type: "text", label: "Section Title" },
        subtitle: { type: "text", label: "Section Subtitle" },
        feature1Title: { type: "text", label: "Feature 1 Title" },
        feature1Description: {
          type: "textarea",
          label: "Feature 1 Description",
        },
        feature2Title: { type: "text", label: "Feature 2 Title" },
        feature2Description: {
          type: "textarea",
          label: "Feature 2 Description",
        },
        feature3Title: { type: "text", label: "Feature 3 Title" },
        feature3Description: {
          type: "textarea",
          label: "Feature 3 Description",
        },
      },
      defaultProps: {
        title: "Everything you need",
        subtitle: "Built for teams that move fast and build things that last.",
        feature1Title: "Easy to use",
        feature1Description:
          "Drag and drop interface that anyone can master in minutes.",
        feature2Title: "Fully customizable",
        feature2Description:
          "Every component is editable and matches your brand.",
        feature3Title: "Production ready",
        feature3Description: "Deploy to any platform with one click.",
      },
      render: ({
        title,
        subtitle,
        feature1Title,
        feature1Description,
        feature2Title,
        feature2Description,
        feature3Title,
        feature3Description,
      }) => (
        <div className="px-8 py-16 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                {subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: feature1Title,
                  description: feature1Description,
                  icon: "⚡",
                },
                {
                  title: feature2Title,
                  description: feature2Description,
                  icon: "🎨",
                },
                {
                  title: feature3Title,
                  description: feature3Description,
                  icon: "🚀",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-lg">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    Testimonial: {
      fields: {
        quote: { type: "textarea", label: "Quote" },
        authorName: { type: "text", label: "Author Name" },
        authorRole: { type: "text", label: "Author Role" },
        authorCompany: { type: "text", label: "Company" },
      },
      defaultProps: {
        quote:
          "This builder completely changed how we create websites. What used to take weeks now takes hours.",
        authorName: "Sarah Johnson",
        authorRole: "Product Designer",
        authorCompany: "Acme Inc",
      },
      render: ({ quote, authorName, authorRole, authorCompany }) => (
        <div className="px-8 py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl text-blue-200 mb-6">"</div>
            <p className="text-xl text-gray-700 leading-relaxed mb-8 italic">
              {quote}
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {authorName.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 text-sm">
                  {authorName}
                </p>
                <p className="text-gray-400 text-xs">
                  {authorRole}, {authorCompany}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    PricingCard: {
      fields: {
        planName: { type: "text", label: "Plan Name" },
        price: { type: "text", label: "Price" },
        period: { type: "text", label: "Period" },
        description: { type: "text", label: "Description" },
        features: {
          type: "array",
          label: "Features",
          arrayFields: {
            feature: { type: "text", label: "Feature" },
          },
          defaultItemProps: { feature: "New feature" },
        },
        buttonText: { type: "text", label: "Button Text" },
        highlighted: {
          type: "select",
          label: "Style",
          options: [
            { label: "Default", value: "false" },
            { label: "Highlighted", value: "true" },
          ],
        },
      },
      defaultProps: {
        planName: "Pro",
        price: "$29",
        period: "per month",
        description: "Perfect for growing teams",
        features: [
          { feature: "Unlimited sites" },
          { feature: "Custom domains" },
          { feature: "Priority support" },
        ],
        buttonText: "Get started",
        highlighted: false,
      },
      render: ({
        planName,
        price,
        period,
        description,
        features,
        buttonText,
        highlighted,
      }) => (
        <div
          className={`max-w-sm mx-auto my-8 p-8 rounded-2xl border-2 ${
            highlighted
              ? "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-100"
              : "border-gray-200 bg-white text-gray-900"
          }`}
        >
          <p
            className={`text-sm font-semibold mb-2 ${highlighted ? "text-blue-100" : "text-blue-600"}`}
          >
            {planName}
          </p>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-4xl font-bold">{price}</span>
            <span
              className={`text-sm ${highlighted ? "text-blue-100" : "text-gray-400"}`}
            >
              {period}
            </span>
          </div>
          <p
            className={`text-sm mb-6 ${highlighted ? "text-blue-100" : "text-gray-500"}`}
          >
            {description}
          </p>
          <ul className="space-y-3 mb-8">
            {features.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm">
                <span
                  className={highlighted ? "text-blue-200" : "text-blue-600"}
                >
                  ✓
                </span>
                {item.feature}
              </li>
            ))}
          </ul>
          <button
            className={`w-full py-3 rounded-lg font-semibold text-sm transition-colors ${
              highlighted
                ? "bg-white text-blue-600 hover:bg-blue-50"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {buttonText}
          </button>
        </div>
      ),
    },
    FAQ: {
      fields: {
        question: { type: "text", label: "Question" },
        answer: { type: "textarea", label: "Answer" },
      },
      defaultProps: {
        question: "How does this work?",
        answer:
          "Simply drag and drop components onto the canvas, customize them to your liking, and publish when ready.",
      },
      render: ({ question, answer }) => (
        <div className="px-8 py-4 max-w-3xl mx-auto border-b border-gray-100">
          <div className="py-4">
            <h3 className="font-semibold text-gray-900 mb-2">{question}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{answer}</p>
          </div>
        </div>
      ),
    },
    ImageBlock: {
      fields: {
        imageUrl: { type: "text", label: "Image URL" },
        altText: { type: "text", label: "Alt Text" },
        caption: { type: "text", label: "Caption" },
        size: {
          type: "select",
          label: "Size",
          options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
            { label: "Full Width", value: "full" },
          ],
        },
      },
      defaultProps: {
        imageUrl:
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800",
        altText: "Image",
        caption: "",
        size: "large",
      },
      render: ({ imageUrl, altText, caption, size }) => {
        const sizes = {
          small: "max-w-sm",
          medium: "max-w-xl",
          large: "max-w-3xl",
          full: "max-w-none",
        };
        return (
          <div className={`${sizes[size]} mx-auto px-8 py-6`}>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={altText}
                className="w-full rounded-xl object-cover"
              />
            )}
            {caption && (
              <p className="text-center text-gray-400 text-xs mt-2">
                {caption}
              </p>
            )}
          </div>
        );
      },
    },
    VideoEmbed: {
      fields: {
        videoUrl: { type: "text", label: "YouTube or Vimeo URL" },
        title: { type: "text", label: "Video Title" },
      },
      defaultProps: {
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Video",
      },
      render: ({ videoUrl, title }) => {
        const getEmbedUrl = (url: string) => {
          if (url.includes("youtube.com/watch")) {
            const id = new URL(url).searchParams.get("v");
            return `https://www.youtube.com/embed/${id}`;
          }
          if (url.includes("youtu.be/")) {
            const id = url.split("youtu.be/")[1];
            return `https://www.youtube.com/embed/${id}`;
          }
          if (url.includes("vimeo.com/")) {
            const id = url.split("vimeo.com/")[1];
            return `https://player.vimeo.com/video/${id}`;
          }
          return url;
        };

        return (
          <div className="px-8 py-6 max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
              <iframe
                src={getEmbedUrl(videoUrl)}
                title={title}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>
            {title && (
              <p className="text-center text-gray-400 text-xs mt-2">{title}</p>
            )}
          </div>
        );
      },
    },
    ContactForm: {
      fields: {
        title: { type: "text", label: "Title" },
        subtitle: { type: "text", label: "Subtitle" },
        buttonText: { type: "text", label: "Button Text" },
      },
      defaultProps: {
        title: "Get in touch",
        subtitle: "We'd love to hear from you. Send us a message.",
        buttonText: "Send message",
      },
      render: ({ title, subtitle, buttonText }) => (
        <div className="px-8 py-16 bg-white">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-500 mb-8">{subtitle}</p>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <textarea
                  placeholder="Your message..."
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm">
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      ),
    },
    Newsletter: {
      fields: {
        title: { type: "text", label: "Title" },
        subtitle: { type: "text", label: "Subtitle" },
        buttonText: { type: "text", label: "Button Text" },
        placeholder: { type: "text", label: "Input Placeholder" },
      },
      defaultProps: {
        title: "Stay in the loop",
        subtitle: "Get the latest updates delivered to your inbox.",
        buttonText: "Subscribe",
        placeholder: "Enter your email",
      },
      render: ({ title, subtitle, buttonText, placeholder }) => (
        <div className="px-8 py-16 bg-blue-600">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
            <p className="text-blue-100 mb-8">{subtitle}</p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder={placeholder}
                className="flex-1 px-4 py-3 rounded-lg text-sm outline-none border-0 focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg text-sm hover:bg-blue-50 transition-colors whitespace-nowrap">
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      ),
    },
    Divider: {
      fields: {
        text: { type: "text", label: "Optional Text" },
        style: {
          type: "select",
          label: "Style",
          options: [
            { label: "Solid line", value: "line" },
            { label: "Dashed", value: "dashed" },
            { label: "Dots", value: "dots" },
          ],
        },
      },
      defaultProps: {
        text: "",
        style: "line",
      },
      render: ({ text, style }) => {
        const borderStyle = {
          line: "border-solid",
          dashed: "border-dashed",
          dots: "border-dotted",
        };
        return (
          <div className="px-8 py-6 max-w-4xl mx-auto">
            {text ? (
              <div className="flex items-center gap-4">
                <div
                  className={`flex-1 border-t border-gray-200 ${borderStyle[style]}`}
                />
                <span className="text-gray-400 text-sm whitespace-nowrap">
                  {text}
                </span>
                <div
                  className={`flex-1 border-t border-gray-200 ${borderStyle[style]}`}
                />
              </div>
            ) : (
              <div
                className={`border-t border-gray-200 ${borderStyle[style]}`}
              />
            )}
          </div>
        );
      },
    },
  },
};
