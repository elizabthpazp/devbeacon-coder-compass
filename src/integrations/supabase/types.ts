export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      benefits: {
        Row: {
          created_at: string
          description: string | null
          descriptionSpanish: string | null
          id: number
          id_course: number | null
          image: string | null
          title: string | null
          titleSpanish: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          descriptionSpanish?: string | null
          id?: number
          id_course?: number | null
          image?: string | null
          title?: string | null
          titleSpanish?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          descriptionSpanish?: string | null
          id?: number
          id_course?: number | null
          image?: string | null
          title?: string | null
          titleSpanish?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "benefits_id_course_fkey"
            columns: ["id_course"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category: string
          date: string | null
          description: string
          descriptionSpanish: string | null
          hours: string | null
          id: number
          image: string | null
          info: string | null
          instructor: string | null
          price: number | null
          publico: string | null
          title: string
          titleSpanish: string | null
          visibility: boolean | null
        }
        Insert: {
          category: string
          date?: string | null
          description: string
          descriptionSpanish?: string | null
          hours?: string | null
          id?: never
          image?: string | null
          info?: string | null
          instructor?: string | null
          price?: number | null
          publico?: string | null
          title: string
          titleSpanish?: string | null
          visibility?: boolean | null
        }
        Update: {
          category?: string
          date?: string | null
          description?: string
          descriptionSpanish?: string | null
          hours?: string | null
          id?: never
          image?: string | null
          info?: string | null
          instructor?: string | null
          price?: number | null
          publico?: string | null
          title?: string
          titleSpanish?: string | null
          visibility?: boolean | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          completed: boolean | null
          created_at: string
          duration: string | null
          id: number
          id_module: number | null
          title: string | null
          titleSpanish: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          duration?: string | null
          id?: number
          id_module?: number | null
          title?: string | null
          titleSpanish?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          duration?: string | null
          id?: number
          id_module?: number | null
          title?: string | null
          titleSpanish?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_id_module_fkey"
            columns: ["id_module"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          completed: boolean | null
          created_at: string
          duration: string | null
          id: number
          id_course: number | null
          title: string | null
          titleSpanish: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          duration?: string | null
          id?: number
          id_course?: number | null
          title?: string | null
          titleSpanish?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          duration?: string | null
          id?: number
          id_course?: number | null
          title?: string | null
          titleSpanish?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "modules_id_course_fkey"
            columns: ["id_course"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          descriptionSpanish: string | null
          id: number
          id_course: number | null
          id_step: number | null
          image: string | null
          title: string | null
          titleSpanish: string | null
          visible: boolean | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          descriptionSpanish?: string | null
          id?: number
          id_course?: number | null
          id_step?: number | null
          image?: string | null
          title?: string | null
          titleSpanish?: string | null
          visible?: boolean | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          descriptionSpanish?: string | null
          id?: number
          id_course?: number | null
          id_step?: number | null
          image?: string | null
          title?: string | null
          titleSpanish?: string | null
          visible?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_id_course_fkey"
            columns: ["id_course"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_id_step_fkey"
            columns: ["id_step"]
            isOneToOne: false
            referencedRelation: "steps"
            referencedColumns: ["id"]
          },
        ]
      }
      steps: {
        Row: {
          created_at: string
          id: number
          step1: string | null
          step1Description: string | null
          step1DescriptionSpanish: string | null
          step1Spanish: string | null
          step2: string | null
          step2Description: string | null
          step2DescriptionSpanish: string | null
          step2Spanish: string | null
          step3: string | null
          step3Description: string | null
          step3DescriptionSpanish: string | null
          step3Spanish: string | null
          structure1: string | null
          structure1Spanish: string | null
          structure2: string | null
          structure2Spanish: string | null
          structure3: string | null
          structure3Spanish: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          step1?: string | null
          step1Description?: string | null
          step1DescriptionSpanish?: string | null
          step1Spanish?: string | null
          step2?: string | null
          step2Description?: string | null
          step2DescriptionSpanish?: string | null
          step2Spanish?: string | null
          step3?: string | null
          step3Description?: string | null
          step3DescriptionSpanish?: string | null
          step3Spanish?: string | null
          structure1?: string | null
          structure1Spanish?: string | null
          structure2?: string | null
          structure2Spanish?: string | null
          structure3?: string | null
          structure3Spanish?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          step1?: string | null
          step1Description?: string | null
          step1DescriptionSpanish?: string | null
          step1Spanish?: string | null
          step2?: string | null
          step2Description?: string | null
          step2DescriptionSpanish?: string | null
          step2Spanish?: string | null
          step3?: string | null
          step3Description?: string | null
          step3DescriptionSpanish?: string | null
          step3Spanish?: string | null
          structure1?: string | null
          structure1Spanish?: string | null
          structure2?: string | null
          structure2Spanish?: string | null
          structure3?: string | null
          structure3Spanish?: string | null
        }
        Relationships: []
      }
      user_courses: {
        Row: {
          course_id: number | null
          created_at: string
          id: number
          user_id: number | null
        }
        Insert: {
          course_id?: number | null
          created_at?: string
          id?: number
          user_id?: number | null
        }
        Update: {
          course_id?: number | null
          created_at?: string
          id?: number
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_courses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          country: string | null
          created_at: string
          email: string | null
          id: number
          is_premium: boolean | null
          name: string | null
          phone: string | null
          user_id: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          email?: string | null
          id?: number
          is_premium?: boolean | null
          name?: string | null
          phone?: string | null
          user_id?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          email?: string | null
          id?: number
          is_premium?: boolean | null
          name?: string | null
          phone?: string | null
          user_id?: string | null
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
