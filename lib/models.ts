import { Schema, model, models } from "mongoose";

const WorkSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    stack: [{ type: String }],
    link: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    quote: { type: String, required: true },
  },
  { timestamps: true }
);

const SiteSettingsSchema = new Schema(
  {
    siteTitle: { type: String, required: true, default: "Santhosh | AI & DS Portfolio" },
    faviconUrl: { type: String, default: "" },
    testimonials: [TestimonialSchema],
  },
  { timestamps: true }
);

const AdminSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export const Work = models.Work || model("Work", WorkSchema);
export const SiteSettings = models.SiteSettings || model("SiteSettings", SiteSettingsSchema);
export const Admin = models.Admin || model("Admin", AdminSchema);
