import { Data } from "@measured/puck";

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: Data;
  seo_title?: string;
  seo_description?: string;
  seo_image?: string;
  order_index: number;
}
