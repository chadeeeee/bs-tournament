import { supabase } from './supabase'

export interface Team {
  name: string
  members: string[] // Array of 3 full names (PIB)
}

export interface Participant {
  id: string
  className: string
  teams: Team[]
  present: boolean
  createdAt: string
  ip?: string
}

export async function getParticipants(): Promise<Participant[]> {
  const { data, error } = await supabase
    .from('participants')
    .select('*')
    .order('createdAt', { ascending: false })

  if (error) {
    console.error('Error fetching participants:', error)
    return []
  }

  return data as Participant[]
}

export async function addParticipant(className: string, teams: Team[], ip?: string): Promise<Participant | null> {
  const newParticipant = {
    className,
    teams,
    present: false,
    createdAt: new Date().toISOString(),
    ip
  }

  const { data, error } = await supabase
    .from('participants')
    .insert([newParticipant])
    .select()
    .single()

  if (error) {
    console.error('Error adding participant:', error)
    return null
  }

  return data as Participant
}

export async function updateParticipantPresence(id: string, present: boolean): Promise<Participant | null> {
  const { data, error } = await supabase
    .from('participants')
    .update({ present })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating participant presence:', error)
    return null
  }

  return data as Participant
}
