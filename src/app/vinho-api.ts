import { InMemoryDbService } from 'angular-in-memory-web-api'

export class VinhoApi implements InMemoryDbService {
    createDb() {
        let vinhos = [
            {   id: 1,
                nome: 'Casillero Del Diablo',
                classificacao: 'Tinto',
                uva: 'Merlot',
                fabricante: 'Concha y Toro',
                paisOrigem: 'Chile',
                anoSafra: 2010
            },
            {   id: 2,
                nome: 'Salton Talento',
                classificacao: 'Tinto',
                uva: 'Carmenere',
                fabricante: 'Vinícola Salton',
                paisOrigem: 'Brasil',
                anoSafra: 2010
            },
            {   id: 3,
                nome: 'Salton Talento x',
                classificacao: 'Tinto',
                uva: 'Carmenere',
                fabricante: 'Vinícola Salton',
                paisOrigem: 'Brasil',
                anoSafra: 2010
            },
            {   id: 4,
                nome: 'Salton Talento xxx',
                classificacao: 'Tinto',
                uva: 'Carmenere',
                fabricante: 'Vinícola Salton',
                paisOrigem: 'Brasil',
                anoSafra: 2010
            }
        ]
        return {vinhos}
    }
}
