import INpmObject from './INpmObject'

export default interface INpmResponse {
  objects: INpmObject[]
  total: number
  time: string
}
