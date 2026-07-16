export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          meta: Json | null
          path: string | null
          referrer: string | null
          service_id: string | null
          session_id: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          meta?: Json | null
          path?: string | null
          referrer?: string | null
          service_id?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          meta?: Json | null
          path?: string | null
          referrer?: string | null
          service_id?: string | null
          session_id?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      exchange_rate_history: {
        Row: {
          buy: number
          captured_at: string
          city: string
          created_at: string
          currency_code: string
          id: string
          sell: number
        }
        Insert: {
          buy: number
          captured_at?: string
          city: string
          created_at?: string
          currency_code: string
          id?: string
          sell: number
        }
        Update: {
          buy?: number
          captured_at?: string
          city?: string
          created_at?: string
          currency_code?: string
          id?: string
          sell?: number
        }
        Relationships: []
      }
      exchange_rates: {
        Row: {
          buy: number
          city: string
          created_at: string
          currency_code: string
          currency_name: string
          fetched_at: string
          id: string
          sell: number
          source: string
          updated_at: string
        }
        Insert: {
          buy: number
          city: string
          created_at?: string
          currency_code: string
          currency_name: string
          fetched_at?: string
          id?: string
          sell: number
          source?: string
          updated_at?: string
        }
        Update: {
          buy?: number
          city?: string
          created_at?: string
          currency_code?: string
          currency_name?: string
          fetched_at?: string
          id?: string
          sell?: number
          source?: string
          updated_at?: string
        }
        Relationships: []
      }
      gold_price_history: {
        Row: {
          captured_at: string
          city: string
          id: string
          karat: string
          price_usd: number | null
          price_yer: number
        }
        Insert: {
          captured_at?: string
          city: string
          id?: string
          karat: string
          price_usd?: number | null
          price_yer: number
        }
        Update: {
          captured_at?: string
          city?: string
          id?: string
          karat?: string
          price_usd?: number | null
          price_yer?: number
        }
        Relationships: []
      }
      gold_prices: {
        Row: {
          city: string
          created_at: string
          fetched_at: string
          id: string
          karat: string
          label: string
          price_usd: number | null
          price_yer: number
          sort_order: number
          source: string
          updated_at: string
        }
        Insert: {
          city: string
          created_at?: string
          fetched_at?: string
          id?: string
          karat: string
          label: string
          price_usd?: number | null
          price_yer: number
          sort_order?: number
          source?: string
          updated_at?: string
        }
        Update: {
          city?: string
          created_at?: string
          fetched_at?: string
          id?: string
          karat?: string
          label?: string
          price_usd?: number | null
          price_yer?: number
          sort_order?: number
          source?: string
          updated_at?: string
        }
        Relationships: []
      }
      sabafon_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      sabafon_packages: {
        Row: {
          category_id: string
          code: string | null
          created_at: string
          id: string
          internet: string
          minutes: string
          name: string
          network: string
          price: string
          sms: string
          sort_order: number
          updated_at: string
          validity: string
        }
        Insert: {
          category_id: string
          code?: string | null
          created_at?: string
          id: string
          internet?: string
          minutes?: string
          name: string
          network?: string
          price?: string
          sms?: string
          sort_order?: number
          updated_at?: string
          validity?: string
        }
        Update: {
          category_id?: string
          code?: string | null
          created_at?: string
          id?: string
          internet?: string
          minutes?: string
          name?: string
          network?: string
          price?: string
          sms?: string
          sort_order?: number
          updated_at?: string
          validity?: string
        }
        Relationships: [
          {
            foreignKeyName: "sabafon_packages_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "sabafon_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      sabafon_services_items: {
        Row: {
          code: string | null
          created_at: string
          deactivation_code: string | null
          description: string | null
          icon: string
          id: string
          price: string | null
          section: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          deactivation_code?: string | null
          description?: string | null
          icon?: string
          id?: string
          price?: string | null
          section: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          code?: string | null
          created_at?: string
          deactivation_code?: string | null
          description?: string | null
          icon?: string
          id?: string
          price?: string | null
          section?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      template_layouts: {
        Row: {
          created_at: string
          layout: Json
          template_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          layout: Json
          template_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          layout?: Json
          template_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      ym_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ym_packages: {
        Row: {
          category_id: string
          code: string | null
          created_at: string
          id: string
          internet: string
          minutes: string
          name: string
          network: string
          price: string
          sms: string
          sort_order: number
          updated_at: string
          validity: string
        }
        Insert: {
          category_id: string
          code?: string | null
          created_at?: string
          id: string
          internet?: string
          minutes?: string
          name: string
          network?: string
          price: string
          sms?: string
          sort_order?: number
          updated_at?: string
          validity?: string
        }
        Update: {
          category_id?: string
          code?: string | null
          created_at?: string
          id?: string
          internet?: string
          minutes?: string
          name?: string
          network?: string
          price?: string
          sms?: string
          sort_order?: number
          updated_at?: string
          validity?: string
        }
        Relationships: [
          {
            foreignKeyName: "ym_packages_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "ym_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      ym_services: {
        Row: {
          code: string | null
          created_at: string
          deactivation_code: string | null
          description: string
          group_key: string
          icon: string
          id: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          deactivation_code?: string | null
          description?: string
          group_key: string
          icon?: string
          id: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          code?: string | null
          created_at?: string
          deactivation_code?: string | null
          description?: string
          group_key?: string
          icon?: string
          id?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      you_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      you_packages: {
        Row: {
          category_id: string
          code: string | null
          created_at: string
          id: string
          internet: string
          minutes: string
          name: string
          network: string
          price: string
          sms: string
          sort_order: number
          updated_at: string
          validity: string
        }
        Insert: {
          category_id: string
          code?: string | null
          created_at?: string
          id: string
          internet?: string
          minutes?: string
          name: string
          network?: string
          price?: string
          sms?: string
          sort_order?: number
          updated_at?: string
          validity?: string
        }
        Update: {
          category_id?: string
          code?: string | null
          created_at?: string
          id?: string
          internet?: string
          minutes?: string
          name?: string
          network?: string
          price?: string
          sms?: string
          sort_order?: number
          updated_at?: string
          validity?: string
        }
        Relationships: [
          {
            foreignKeyName: "you_packages_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "you_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      you_services_items: {
        Row: {
          code: string | null
          created_at: string
          deactivation_code: string | null
          description: string | null
          icon: string
          id: string
          price: string | null
          section: string
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          code?: string | null
          created_at?: string
          deactivation_code?: string | null
          description?: string | null
          icon?: string
          id?: string
          price?: string | null
          section: string
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          code?: string | null
          created_at?: string
          deactivation_code?: string | null
          description?: string | null
          icon?: string
          id?: string
          price?: string | null
          section?: string
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
