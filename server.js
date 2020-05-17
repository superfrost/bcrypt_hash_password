const express = require("express")
const app = express()
const bcrypt = require("bcrypt")

const PORT = process.env.PORT || 3030

app.use(express.json())

const users = []

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', async (req, res) => {
  try {  
    // if(!req.body || !req.body.name || !req.body.password) {
    //   return res.status(400).json({error: "wrong query"})
    // } else {
      // const salt = await bcrypt.genSalt()
      // const hashedPassword = await bcrypt.hash(req.body.password, salt)
      // console.log(salt)

      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      console.log(hashedPassword);
      
      const user = {name: req.body.name, password: hashedPassword}
      users.push(user)
      res.status(200).json({msg: "OK"})
    // }
    console.log(users);
  } catch {
    res.status(500).json({error: "Server side error"})
  }
})

app.post("/users/login", async (req, res) => {
  const user = users.find(user => user.name === req.body.name)
  if(user === null) {
    res.status(400).send({error: "can't find user"})
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not allowed')
    }
  } catch {
    res.status(500).json({error: "Server side error"})
  }
})

app.listen(PORT, () => {
  console.log(`Server start at http://localhost:${PORT}`);
  
})