import { ConnectOptions, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri

    this.client = await MongoClient.connect(this.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions)
  },

  async disconnect () {
    await this.client.close()
    this.client = (null as unknown as MongoClient)
  },

  async getCollection (name: string) {
    if (!this.client) {
      await this.connect(this.uri)
    }

    return this.client.db().collection(name)
  }
}
