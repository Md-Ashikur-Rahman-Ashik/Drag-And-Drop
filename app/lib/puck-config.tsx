import { Config, Fields } from "@measured/puck";

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
}

interface TextBlockProps {
  text: string;
  fontSize: "sm" | "md" | "lg" | "xl";
  align: "left" | "right" | "center";
}

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const puckConfig: Config<{
  Hero : HeroProps
  TextBlock : TextBlockProps
  Card : CardProps
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
  },
};
