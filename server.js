// webbtjänst med MongoDb och express

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { type } = require('os');

//init express
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

//connect to MongoDB
mongoose.connect("mongodb://localhost:27017/CV").then(() => {
    console.log("connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to database: " + error);
})

// Work Experience Schema
const WorkExperienceSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, "Du måste skicka med namn på företaget"],
    },
    jobtitle: {
        type: String,
        required: [true, "Du måste skicka med din titel på jobbet"],
    },
    location: {
        type: String,
        required: [true, "Du måste skicka med var företaget ligger"],
    },
    startdate: {
        type: Date,
        required: [true, "Du måste skicka med stardatum på din anställning"],
    },
    enddate: {
        type: Date,
        required: false,
    },
    description: {
        type: String,
        required: [true, "Du måste skicka med en beskrivning på dina arbetssysslor"],
    },
});

const WorkExperience = mongoose.model("WorkExperience", WorkExperienceSchema);

//routes 
app.get("/api", async (req, res) => {
    res.json({ message: "Welcome to this API" });
});

//Hämta data från databasen
app.get("/api/workexperience", async (req, res) => {
    try {
        let result = await WorkExperience.find({});

        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

//Lägg till data i databasen
app.post("/api/workexperience", async (req, res) => {
    try {
        let result = await WorkExperience.create(req.body);

        return res.json(result);
    } catch (error) {
        return res.status(400).jason(error);
    }
});

//Ta bort rader från databasen
app.delete("/api/workexperience/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await WorkExperience.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Work experience not found" });
        }

        return res.json({ message: "Work experience deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong", details: error });
    }
});

// Uppdatera data i databasen
app.put("/api/workexperience/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body; // Data som ska uppdateras

        // Uppdatera dokumentet med id:t
        const result = await WorkExperience.findByIdAndUpdate(id, updatedData, { new: true });

        if (!result) {
            return res.status(404).json({ message: "Work experience not found" });
        }

        return res.json({ message: "Work experience updated successfully", data: result });
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong", details: error });
    }
});


app.listen(port, () => {
    console.log('Server is running on port: ' + port)
});