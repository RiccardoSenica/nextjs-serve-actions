import { z } from 'zod';
import { zfd } from 'zod-form-data';

const currency = ['DKK', 'EUR', 'SGD', 'USD'] as const;

export const IdSchema = z.object({
  params: z.object({
    id: z.string()
  })
});

export const CreateItemFormSchema = zfd.formData({
  name: z.string(),
  description: z.string().optional(),
  price: zfd.numeric(z.number()),
  currency: z.enum(currency),
  tag: z.string().optional(),
  body: z.string().optional(),
  score: zfd.numeric(z.number().min(0).max(10).optional()),
  regret: z
    .union([z.literal('on'), z.literal('off')])
    .transform((value) => value === 'on')
    .optional()
});

export const ItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  currency: z.enum(currency),
  tag: z.string().optional(),
  createdAt: z.date().optional()
});

export type Item = z.infer<typeof ItemSchema>;

export const ItemsSchema = z.array(ItemSchema);

export type Items = z.infer<typeof ItemsSchema>;

export const CreateCommentFormSchema = zfd.formData({
  body: z.string(),
  score: zfd.numeric(z.number().min(0).max(10).optional()),
  regret: z
    .union([z.literal('on'), z.literal('off')])
    .transform((value) => value === 'on')
    .optional()
});

export const ItemCommentSchema = z.object({
  id: z.string(),
  body: z.string(),
  score: z.number(),
  regret: z.boolean(),
  createdAt: z.date().optional()
});

export type ItemComment = z.infer<typeof ItemCommentSchema>;

export const ItemCommentsSchema = z.array(ItemCommentSchema);

export type ItemComments = z.infer<typeof ItemCommentsSchema>;

export const CreateProfileFormSchema = z.object({
  name: z.string()
});

export const ProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date().optional()
});

export type Profile = z.infer<typeof ProfileSchema>;

export const ProfilesSchema = z.array(ProfileSchema);

export type Profiles = z.infer<typeof ProfilesSchema>;

export const CreateTagFormSchema = z.object({
  name: z.string()
});

export const TagSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date().optional()
});

export type Tag = z.infer<typeof TagSchema>;

export const TagsSchema = z.array(TagSchema);

export type Tags = z.infer<typeof TagsSchema>;
