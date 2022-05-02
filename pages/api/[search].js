import { Client } from '@elastic/elasticsearch'

const handler = async (req, res) => {
        const { search } = req.query;

        const client = new Client({
                node: 'http://localhost:9200'
        });

        const query_body = {
                "query" :  {
                        "match_phrase_prefix" :  {
                                 "Name":  "Pikachu"
                        }
                }
        }

        const result = await client.search({
                index: 'pokemon',
                query: {
                        'match_phrase_prefix': {
                                 Name: 'Pikachu'
                        }
                }
        })

        res.status(200).json({ success: true, data: result, lol: "lol" })
}

export default handler;
