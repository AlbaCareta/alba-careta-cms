export interface Concert {
  private: boolean
  title: string
  date: Date
  time: string
  place: string
}
export interface ConcertID extends Concert {
  id: string
}
