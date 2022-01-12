export interface Concert {
  private: boolean
  title: string
  date: Date
  time: string
  place: string
  link: string
}
export interface ConcertID extends Concert {
  id: string
}
export interface Projecte {
  private: boolean
  order: number
  title: string
  url: string
  text: {
    ca: string
    es: string
    en: string
  }
  image: string
  link: string
  instagram: string
  spotify: string
  video: string
}
export interface ProjecteID extends Projecte {
  id: string
}
