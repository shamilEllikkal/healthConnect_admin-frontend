import { create } from "zustand"
import axios from "../axiosInstance"

type ApiStore = {
  users: string[] | null
  doctors: string[] | null
  appointments: string[] | null
  loading: boolean
  error: string | null

  fetchUsers: () => Promise<void>
  fetchDoctors: () => Promise<void>
  fetchAppointments: () => Promise<void>
}

export const dataStore = create<ApiStore>((set) => ({
  users: null,
  doctors: null,
  appointments: null,
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null })
    try {
      const res = await axios.get("/admin/users")
      if (!res.data) throw new Error("Failed to fetch users")
      const data = await res.data
      set({ users: data, loading: false })
    } catch (err) {
      set({ error: (err as Error).message, loading: false })
    }
  },

  fetchDoctors: async () => {
    set({ loading: true, error: null })
    try {
      const res = await axios.get("/doctors")
      if (!res.data) throw new Error("Failed to fetch doctors")
      const data = await res.data
      set({ doctors: data, loading: false })
    } catch (err) {
      set({ error: (err as Error).message, loading: false })
    }
  },

  fetchAppointments: async () => {
    set({ loading: true, error: null })
    try {
      const res = await axios.get("/admin/appointments/all")
      if (!res.data) throw new Error("Failed to fetch appointments")
      const data = await res.data
      set({ appointments: data, loading: false })
    } catch (err) {
      set({ error: (err as Error).message, loading: false })
    }
  },
}))
