import exp from "constants";
import Stripe from "stripe";

export interface UserDetails {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Song {
  id: string;
  user_id: string;
  author: string;
  title: string;
  artist_id: string;
  album_id: string;
  song_path: string;
  image_path: string;
  duration: number;
  streams: number;
  from_album: string;
}

export interface Artist {
  id: string;
  name: string;
  bio?: string;
  image_path: string;
  verified: boolean;
  listeners: number;
}

export interface Album {
  id: string;
  name: string;
  album_type: string;
  artist_id: string;
  image_path: string;
  release_date?: string;
}

export interface Playlist {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  image_path: string;
  is_public: boolean;
  created_at: string;
  updated_at?: string;
  artist_id?: string;
  artistName?: string;
}

export interface Product {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
}

export interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: Product;
}

export interface ProductWithPrice extends Product {
  prices?: Price[];
}

export interface Subscription {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity?: number;
  created: string;
  current_period_end: string;
  current_period_start: string;
  cancel_at_period_end?: boolean;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
}