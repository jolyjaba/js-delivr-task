import INpmMaintainer from './INpmMaintainer'

export default interface INpmObject {
  package: {
    author: {
      name: string
    }
    name: string
    version: string
    description: string
    keywords: string[]
    date: string
    links: {
      npm: string
      homepage: string
      repository: string
      bugs: string
    }
    publisher: INpmMaintainer
    maintainers: INpmMaintainer[]
  }
  score: {
    final: number
    detail: {
      quality: number
      popularity: number
      maintenance: number
    }
  }
  searchScore: number
}
