import express from "express"
import cors from 'cors'


const app = express()
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));

app.use(express.json());
app.get("/health", (request, response) => {
  return response.json({ message: 'Hello World!' })
})
app.options(/.*/, cors(corsConfig));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});