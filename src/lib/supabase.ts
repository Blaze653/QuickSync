import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: 'buyer' | 'owner';
          name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          role: 'buyer' | 'owner';
          name: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: 'buyer' | 'owner';
          name?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      restaurants: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          description: string;
          image: string;
          cuisine: string;
          address: string;
          phone: string;
          is_open: boolean;
          delivery_fee: number;
          delivery_time: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          description?: string;
          image?: string;
          cuisine: string;
          address: string;
          phone?: string;
          is_open?: boolean;
          delivery_fee?: number;
          delivery_time?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          description?: string;
          image?: string;
          cuisine?: string;
          address?: string;
          phone?: string;
          is_open?: boolean;
          delivery_fee?: number;
          delivery_time?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      menu_items: {
        Row: {
          id: string;
          restaurant_id: string;
          name: string;
          description: string;
          price: number;
          image: string;
          category: string;
          preparation_time: number;
          customizations: string[];
          available: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          restaurant_id: string;
          name: string;
          description?: string;
          price: number;
          image?: string;
          category: string;
          preparation_time?: number;
          customizations?: string[];
          available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          restaurant_id?: string;
          name?: string;
          description?: string;
          price?: number;
          image?: string;
          category?: string;
          preparation_time?: number;
          customizations?: string[];
          available?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_id: string;
          restaurant_id: string;
          status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
          total: number;
          items: any[];
          customer_address: string;
          customer_phone: string;
          payment_method: 'card' | 'cash';
          notes: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          restaurant_id: string;
          status?: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
          total: number;
          items: any[];
          customer_address: string;
          customer_phone?: string;
          payment_method: 'card' | 'cash';
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          restaurant_id?: string;
          status?: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
          total?: number;
          items?: any[];
          customer_address?: string;
          customer_phone?: string;
          payment_method?: 'card' | 'cash';
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          customer_id: string;
          restaurant_id: string;
          order_id: string;
          rating: number;
          comment: string;
          helpful: number;
          response: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id: string;
          restaurant_id: string;
          order_id: string;
          rating: number;
          comment?: string;
          helpful?: number;
          response?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          customer_id?: string;
          restaurant_id?: string;
          order_id?: string;
          rating?: number;
          comment?: string;
          helpful?: number;
          response?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};