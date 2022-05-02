import { Client } from '@elastic/elasticsearch'

const handler = async (req, res) => {
        const { search } = req.query;
        const  page  = req.body.page;

        const client = new Client({
                node: 'http://localhost:9200'
        });

        const thePage = (page != 0 ? ((page * 10) + 1) : 0)

        const query_body = {
                "query" :  {
                        "match_phrase_prefix" :  {
                                 "Name":  search
                        }
                }
        }

        const result = await client.search({
                index: 'pokemon',
                query: {
                        "query_string": {
                                "fields": ["message", "log.file.path"],
                                "query": `*${search}* OR ${search}~`
                        }
                },
                'from': thePage,
                'size': 10
        })

        res.status(200).json({ success: true, data: result, currentPage: page })
}

export default handler;
