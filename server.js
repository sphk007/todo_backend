const mongoose = require("mongoose"); // connecting monogodb
const express = require("express"); // connecting express
const cors = require("cors"); //connecting crosss origin
const app = express();
const port = process.env.PORT || 5006;



mongoose
  .connect("mongodb+srv://ponharishkumarsakthivel:YA1nWfexwq4OccAD@cluster0.9iojjtv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )

  .then(() => {
    console.log("Connected to  database");
  })
  .catch((err) => {
    console.error(err);
  });


  const User = new mongoose.Schema({
      name: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        unique: true,
        require: true,
      },
      password: {
        type: String,
        require: true,
      }
  });

  const UserModel = mongoose.model("UsersDet", User);

  app.use(express.json());
app.use(cors());

app.post("/saveuser", async (req, res) => {
    try {
      const {name,email,password}=req.body;
      const user=new UserModel({name,email,password});
      console.log(user)
      await user.save();
      // const user = new UserModel(req.body);
      // const results = await user.save();
      // const datasending = results.toObject();
      
      res.send(user);
    } catch (e) {
      console.error(e);
      res.status(500).send("Something Went Wrong");
    }
  });


  app.get("/getting", async (req, resp) => {
    try {
      const users = await UserModel.find();
      resp.json(users);
    } catch (e) {
      console.error(e);
      resp.status(500).send("Failed to retrieve user data");
    }
  });
  


  app.put("/updating/:id", async (req, res) => {
    const { id } = req.params;
    const { name,email,password } = req.body;
  
    try {
      const updatedTodo = await UserModel.findByIdAndUpdate(
        id,
        { name,email,password },
        { new: true }
      );
  
      if (!updatedTodo) {
        return res.status(404).send("Todo not found");
      }
  
      res.json(updatedTodo);
    } catch (error) {
      console.error("Failed to update todo:", error);
      res.status(500).send("Failed to update todo");
    }
  });


  app.put("/updating/:id", async (req, res) => {
    const { id } = req.params;
    const { name,email,password } = req.body;
  
    try {
      const updatedTodo = await UserModel.findByIdAndUpdate(
        id,
        { name,email,password },
        { new: true }
      );
  
      if (!updatedTodo) {
        return res.status(404).send("User not found");
      }
  
      res.json(updatedTodo);
    } catch (error) {
      console.error("Failed to update User:", error);
      res.status(500).send("Failed to update User");
    }
  });


  app.delete("/deleting/:id", async (req, resp) => {
    try {
      const { id } = req.params;
      console.log(id)
  
      const result = await UserModel.findByIdAndDelete(id);
  
      if (!result) {
        return resp.status(404).send("user not found");
      }
  
      resp.send("user deleted successfully");
    } catch (e) {
      console.error(e);
      resp.status(500).send("Failed to delete todo");
    }
  });

  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
  