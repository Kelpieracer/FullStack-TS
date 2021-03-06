import express from 'express'
const app = express()
import bodyParser from 'body-parser'

app.use(bodyParser.json())

interface INotes {
  id: number,
  content: string,
  date: string,
  important: boolean
} 

let notes: INotes[] = [
  {
    id: 1,
    content: 'HTML on helppoa',
    date: '2017-12-10T17:30:31.098Z',
    important: true
  }, 
  { 
    id: 2,
    content: 'Selain pystyy suorittamaan vain javascriptiä',
    date: '2017-12-10T18:39:34.091Z',
    important: false
  }, 
  { 
    id: 3, 
    content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    date: '2017-12-10T19:20:14.298Z',
    important: true
  }
]

app.get('/', (_req:any, res:any) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/notes', (_req:any, res:any) => {
  res.json(notes)
})

app.get('/notes/:id', (req:any, res:any) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

const generateId = () => {
  const maxId = notes.length > 0 ? notes.map(n => n.id).sort().reverse()[0] : 1
  return maxId + 1
}

app.post('/notes', (req:any, res:any) => {
  const body = req.body

  if (body.content === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }

  const note: INotes = {
    content: body.content,
    important: body.important || false,
    date: new Date().toDateString(),
    id: generateId()
  }

  notes = notes.concat(note)

  res.json(note)
})

app.delete('/notes/:id', (req:any, res:any) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)

  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})