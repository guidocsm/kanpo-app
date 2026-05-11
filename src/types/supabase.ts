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
      enrollment: {
        Row: {
          createdAt: string
          id: string
          isActive: boolean
          matchId: string
          status: Database["public"]["Enums"]["enrollmentstatus"]
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: string
          isActive?: boolean
          matchId: string
          status?: Database["public"]["Enums"]["enrollmentstatus"]
          updatedAt?: string
          userId: string
        }
        Update: {
          createdAt?: string
          id?: string
          isActive?: boolean
          matchId?: string
          status?: Database["public"]["Enums"]["enrollmentstatus"]
          updatedAt?: string
          userId?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollment_matchId_fkey"
            columns: ["matchId"]
            isOneToOne: false
            referencedRelation: "match"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollment_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      match: {
        Row: {
          createdAt: string
          formatId: string
          id: string
          isActive: boolean
          organizerId: string
          priceAmount: number
          rules: string | null
          startsAt: string
          status: Database["public"]["Enums"]["matchstatus"]
          updatedAt: string
          venueId: string
        }
        Insert: {
          createdAt?: string
          formatId: string
          id?: string
          isActive?: boolean
          organizerId: string
          priceAmount: number
          rules?: string | null
          startsAt: string
          status?: Database["public"]["Enums"]["matchstatus"]
          updatedAt?: string
          venueId: string
        }
        Update: {
          createdAt?: string
          formatId?: string
          id?: string
          isActive?: boolean
          organizerId?: string
          priceAmount?: number
          rules?: string | null
          startsAt?: string
          status?: Database["public"]["Enums"]["matchstatus"]
          updatedAt?: string
          venueId?: string
        }
        Relationships: [
          {
            foreignKeyName: "match_formatId_fkey"
            columns: ["formatId"]
            isOneToOne: false
            referencedRelation: "matchFormat"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_organizerId_fkey"
            columns: ["organizerId"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_venueId_fkey"
            columns: ["venueId"]
            isOneToOne: false
            referencedRelation: "venue"
            referencedColumns: ["id"]
          },
        ]
      }
      matchFormat: {
        Row: {
          createdAt: string
          durationMin: number
          id: string
          isActive: boolean
          name: string
          totalSlots: number
        }
        Insert: {
          createdAt?: string
          durationMin: number
          id?: string
          isActive?: boolean
          name: string
          totalSlots: number
        }
        Update: {
          createdAt?: string
          durationMin?: number
          id?: string
          isActive?: boolean
          name?: string
          totalSlots?: number
        }
        Relationships: []
      }
      payment: {
        Row: {
          createdAt: string
          enrollmentId: string
          id: string
          isActive: boolean
          method: Database["public"]["Enums"]["paymentmethod"]
          receiptUrl: string
          rejectionReason: string | null
          reviewedAt: string | null
          reviewedBy: string | null
          status: Database["public"]["Enums"]["paymentstatus"]
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          enrollmentId: string
          id?: string
          isActive?: boolean
          method: Database["public"]["Enums"]["paymentmethod"]
          receiptUrl: string
          rejectionReason?: string | null
          reviewedAt?: string | null
          reviewedBy?: string | null
          status?: Database["public"]["Enums"]["paymentstatus"]
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          enrollmentId?: string
          id?: string
          isActive?: boolean
          method?: Database["public"]["Enums"]["paymentmethod"]
          receiptUrl?: string
          rejectionReason?: string | null
          reviewedAt?: string | null
          reviewedBy?: string | null
          status?: Database["public"]["Enums"]["paymentstatus"]
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_enrollmentId_fkey"
            columns: ["enrollmentId"]
            isOneToOne: false
            referencedRelation: "enrollment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_reviewedBy_fkey"
            columns: ["reviewedBy"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      profile: {
        Row: {
          avatarUrl: string | null
          city: Database["public"]["Enums"]["city"]
          createdAt: string
          firstName: string
          id: string
          isActive: boolean
          lastName: string
          phone: string
          role: Database["public"]["Enums"]["userrole"]
          updatedAt: string
        }
        Insert: {
          avatarUrl?: string | null
          city: Database["public"]["Enums"]["city"]
          createdAt?: string
          firstName: string
          id: string
          isActive?: boolean
          lastName: string
          phone: string
          role?: Database["public"]["Enums"]["userrole"]
          updatedAt?: string
        }
        Update: {
          avatarUrl?: string | null
          city?: Database["public"]["Enums"]["city"]
          createdAt?: string
          firstName?: string
          id?: string
          isActive?: boolean
          lastName?: string
          phone?: string
          role?: Database["public"]["Enums"]["userrole"]
          updatedAt?: string
        }
        Relationships: []
      }
      venue: {
        Row: {
          address: string
          city: Database["public"]["Enums"]["city"]
          createdAt: string
          id: string
          isActive: boolean
          latitude: number | null
          longitude: number | null
          name: string
          photoUrl: string | null
          updatedAt: string
          zone: string | null
        }
        Insert: {
          address: string
          city: Database["public"]["Enums"]["city"]
          createdAt?: string
          id?: string
          isActive?: boolean
          latitude?: number | null
          longitude?: number | null
          name: string
          photoUrl?: string | null
          updatedAt?: string
          zone?: string | null
        }
        Update: {
          address?: string
          city?: Database["public"]["Enums"]["city"]
          createdAt?: string
          id?: string
          isActive?: boolean
          latitude?: number | null
          longitude?: number | null
          name?: string
          photoUrl?: string | null
          updatedAt?: string
          zone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      city: "ccs" | "mbo" | "vlc"
      enrollmentstatus: "pending" | "approved" | "rejected" | "cancelled"
      matchstatus: "open" | "closed" | "cancelled" | "completed"
      paymentmethod: "zelle" | "pagoMovil" | "usdt" | "binancePay" | "paypal"
      paymentstatus: "pendingReview" | "approved" | "rejected"
      userrole: "player" | "organizer" | "admin"
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
      city: ["ccs", "mbo", "vlc"],
      enrollmentstatus: ["pending", "approved", "rejected", "cancelled"],
      matchstatus: ["open", "closed", "cancelled", "completed"],
      paymentmethod: ["zelle", "pagoMovil", "usdt", "binancePay", "paypal"],
      paymentstatus: ["pendingReview", "approved", "rejected"],
      userrole: ["player", "organizer", "admin"],
    },
  },
} as const
