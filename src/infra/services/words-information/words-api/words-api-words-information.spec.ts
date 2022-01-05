
import { WordInformation } from '@/data/protocols/external/get-word-information-service'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { WordsApiWordsInformation } from './words-api-words-information'

jest.mock('axios')

const makeFakeApiResponse = (): any => ({
  data: {
    word: 'table',
    results: [
      {
        definition: 'flat tableland with steep edges',
        partOfSpeech: 'noun',
        synonyms: [
          'mesa'
        ],
        typeOf: [
          'tableland',
          'plateau'
        ],
        derivation: [
          'tabular'
        ]
      },
      {
        definition: 'a set of data arranged in rows and columns',
        partOfSpeech: 'noun',
        synonyms: [
          'tabular array'
        ],
        typeOf: [
          'array'
        ],
        hasTypes: [
          'contents',
          'calendar',
          'actuarial table',
          'correlation table',
          'file allocation table',
          'periodic table',
          'statistical table',
          'table of contents'
        ],
        hasMembers: [
          'column',
          'row'
        ],
        derivation: [
          'tabular',
          'tabulate'
        ],
        examples: [
          'see table 1'
        ]
      },
      {
        definition: 'arrange or enter in tabular form',
        partOfSpeech: 'verb',
        synonyms: [
          'tabularise',
          'tabularize',
          'tabulate'
        ],
        typeOf: [
          'arrange',
          'set'
        ]
      },
      {
        definition: 'food or meals in general',
        partOfSpeech: 'noun',
        synonyms: [
          'board'
        ],
        typeOf: [
          'fare'
        ],
        hasTypes: [
          'training table'
        ],
        examples: [
          'she sets a fine table'
        ]
      },
      {
        definition: 'hold back to a later time',
        partOfSpeech: 'verb',
        synonyms: [
          'defer',
          'hold over',
          'postpone',
          'prorogue',
          'put off',
          'put over',
          'remit',
          'set back',
          'shelve'
        ],
        entails: [
          'call off',
          'scratch',
          'scrub',
          'reschedule',
          'cancel'
        ],
        typeOf: [
          'delay'
        ],
        hasTypes: [
          'suspend',
          'call',
          'hold',
          'probate',
          'reprieve',
          'respite'
        ]
      },
      {
        definition: 'a company of people assembled at a table for a meal or game',
        partOfSpeech: 'noun',
        typeOf: [
          'assemblage',
          'gathering'
        ],
        examples: [
          'he entertained the whole table with his witty remarks'
        ]
      },
      {
        definition: 'a piece of furniture having a smooth flat top that is usually supported by one or more vertical legs',
        partOfSpeech: 'noun',
        typeOf: [
          'piece of furniture',
          'furniture',
          'article of furniture'
        ],
        hasTypes: [
          'booth',
          'breakfast table',
          'altar',
          'card table',
          'cocktail table',
          'coffee table',
          'communion table',
          'conference table',
          'console',
          'console table',
          'billiard table',
          'vanity',
          'tea table',
          'toilet table',
          'trestle table',
          'operating table',
          'parsons table',
          'pedestal table',
          'pier table',
          'ping-pong table',
          'pingpong table',
          'worktable',
          'platen',
          'pool table',
          'work table',
          'snooker table',
          'stand',
          'table-tennis table',
          'council board',
          'council table',
          'counter',
          'desk',
          'dresser',
          'dressing table',
          'drop-leaf table',
          'gaming table',
          'gueridon',
          'kitchen table',
          "lord's table"
        ],
        hasInstances: [
          'round table',
          "king arthur's round table"
        ],
        hasParts: [
          'leg',
          'tableware',
          'tabletop'
        ],
        examples: [
          'it was a sturdy table'
        ]
      },
      {
        definition: 'a piece of furniture with tableware for a meal laid out on it',
        partOfSpeech: 'noun',
        typeOf: [
          'article of furniture',
          'piece of furniture',
          'furniture'
        ],
        hasTypes: [
          'board',
          'dining table'
        ],
        examples: [
          'I reserved a table at my favorite restaurant'
        ]
      }
    ],
    syllables: {
      count: 2,
      list: [
        'ta',
        'ble'
      ]
    },
    pronunciation: {
      all: "'tebəl"
    },
    frequency: 4.94
  }
})

const makeFakeNoDefinitionsApiResponse = (): any => ({ data: {} })

const makeFakeFulfilledWordInformation = (): WordInformation => ({
  usageExamples: [
    'see table 1',
    'she sets a fine table',
    'he entertained the whole table with his witty remarks',
    'it was a sturdy table',
    'I reserved a table at my favorite restaurant'
  ],
  meanings: [
    {
      definition: 'flat tableland with steep edges',
      partOfSpeech: 'noun',
      synonyms: ['mesa']
    },
    {
      definition: 'a set of data arranged in rows and columns',
      partOfSpeech: 'noun',
      synonyms: ['tabular array']
    },
    {
      definition: 'arrange or enter in tabular form',
      partOfSpeech: 'verb',
      synonyms: [
        'tabularise',
        'tabularize',
        'tabulate'
      ]
    },
    {
      definition: 'food or meals in general',
      partOfSpeech: 'noun',
      synonyms: [
        'board'
      ]
    },
    {
      definition: 'hold back to a later time',
      partOfSpeech: 'verb',
      synonyms: [
        'defer',
        'hold over',
        'postpone',
        'prorogue',
        'put off',
        'put over',
        'remit',
        'set back',
        'shelve'
      ]
    },
    {
      definition: 'a company of people assembled at a table for a meal or game',
      partOfSpeech: 'noun',
      synonyms: []
    },
    {
      definition: 'a piece of furniture having a smooth flat top that is usually supported by one or more vertical legs',
      partOfSpeech: 'noun',
      synonyms: []
    },
    {
      definition: 'a piece of furniture with tableware for a meal laid out on it',
      partOfSpeech: 'noun',
      synonyms: []
    }
  ]
})

const makeFakeEmptyWordInformation = (): WordInformation => ({
  meanings: [],
  usageExamples: []
})

const makeSut = (): WordsApiWordsInformation => new WordsApiWordsInformation('any_key')

describe('Words Information Words Api Service', () => {
  describe('getInformation()', () => {
    jest.spyOn(axios, 'get').mockReturnValue(Promise.resolve(makeFakeApiResponse()))

    test('Should make external request with correct values', async () => {
      const sut = makeSut()

      await sut.getInformation('table')

      expect(axios.get).toHaveBeenCalledWith(
        'https://wordsapiv1.p.rapidapi.com/words/table',
        {
          headers: {
            'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
            'x-rapidapi-key': 'any_key'
          }
        } as AxiosRequestConfig
      )
    })

    test('Should return fulfilled WordInformation on success', async () => {
      const sut = makeSut()
      const wordInformation = await sut.getInformation('table')

      expect(wordInformation).toEqual(makeFakeFulfilledWordInformation())
    })

    test('Should return empty WordInformation on success but no definitions', async () => {
      const sut = makeSut()
      jest.spyOn(axios, 'get').mockReturnValueOnce(Promise.resolve(makeFakeNoDefinitionsApiResponse()))
      const wordInformation = await sut.getInformation('went')

      expect(wordInformation).toEqual(makeFakeEmptyWordInformation())
    })

    test('Should return null if external api returns 404 (word not found)', async () => {
      const sut = makeSut()
      jest.spyOn(axios, 'get').mockRejectedValueOnce({ response: { status: 404 } } as AxiosError)
      const wordInformation = await sut.getInformation('went')

      expect(wordInformation).toBeNull()
    })

    test('Should throw on unexpected throws', async () => {
      const sut = makeSut()
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error())

      await expect(sut.getInformation('went')).rejects.toThrow()
    })
  })
})
