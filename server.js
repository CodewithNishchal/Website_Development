import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"; 
import researchRoutes from "./routes/research.js";
import adminRoutes from "./routes/admin.js";
import awardRoutes from "./routes/awards.js"
import { authMiddleware } from "./middlewares/auth.js";
import Research from "./models/research.js";
import Event from "./models/Events.js";
import SNotice from "./models/studentnotice.js";
import Award from "./models/Award.js"
import eventsRouter from "./routes/Events.js";
import FacultyNotice from "./models/facultynotice.js";
import Headline from "./models/Headline.js";
import Carousel from "./models/carousel.js";
import studentnoticeRouter from "./routes/studentnotice.js";
import facultynoticeRouter from "./routes/facultynotice.js"
import headlineRouter from "./routes/Headline.js"
import carouselRouter from "./routes/carousel.js"

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()); // For handling cookies

// Set up EJS
app.set("view engine", "ejs");

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/college_website"; // Replace with actual MongoDB URI
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB", MONGO_URI))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/admin", adminRoutes);
app.use("/admin/research", authMiddleware, researchRoutes);
app.use("/admin/Events", authMiddleware ,eventsRouter);
app.use("/admin/awards", authMiddleware ,awardRoutes);
app.use("/admin/studentnotice",authMiddleware,studentnoticeRouter);
app.use("/admin/facultynotice",authMiddleware,facultynoticeRouter);
app.use("/admin/headlines",authMiddleware,headlineRouter);
app.use("/admin/carousel",authMiddleware,carouselRouter);

app.get("/admin/dashboard",authMiddleware,(req,res)=>{
   res.render("dashboard");
});
// Home Page Route
app.get("/", async (req, res) => {
    try {
        const carouselimages = await Carousel.find({});
        const headlines = await Headline.find({});
        const studentnotices = await SNotice.find({});
        const facultynotices = await FacultyNotice.find({});
        const events= await Event.find({});
        const awards = await Award.find({});
        const researchItems = await Research.find({}); // Fetch Research data
        res.render("index", { researchItems,events,awards,studentnotices,facultynotices,headlines,carouselimages }); // Pass data to index.ejs
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

app.get("/calendar", (req,res)=>{
  res.render("foot/calendar.ejs")
})

app.get("/fees", (req,res)=>{
  res.render("foot/fees.ejs")
})

app.get("/reach", (req,res)=>{
  res.render("foot/reach.ejs")
})

app.get("/recruitment", (req,res)=>{
  res.render("foot/recruitment.ejs")
})

app.get("/complaints/internal",(req,res)=>{
  res.render("foot/complaints/internal.ejs")
})

app.get("/complaints/scst",(req,res)=>{
  res.render("foot/complaints/scst.ejs")
})

app.get("/complaints/anti-ragging",(req,res)=>{
  res.render("foot/complaints/anti-ragging.ejs")
});

app.get("/aboutUs",(req,res)=>{
  res.render("aboutUs");
});

app.get("/complaints/networking",(req,res)=>{
  res.render("foot/complaints/networking.ejs")
})



app.get("/academic/affairs", (req,res) => { res.render("academics/academic/affairs.ejs") })
app.get("/academic/calendar", (req,res) => { res.render("academics/academic/calendar.ejs") })
app.get("/academic/program", (req,res) => { res.render("academics/academic/program.ejs") })
app.get("/academic/admissions", (req,res) => { res.render("academics/academic/admissions.ejs") })
app.get("/academic/rules", (req,res) => { res.render("academics/academic/rules.ejs") })
app.get("/academic/convocation", (req,res) => { res.render("academics/academic/convocation.ejs") })
app.get("/academic/pmrf", (req,res) => { res.render("academics/academic/pmrf.ejs") })

app.get("/departments/cse", (req,res) => { res.render("academics/departments/cse.ejs") })
app.get("/departments/basic-sci", (req,res) => { res.render("academics/departments/basic-sci.ejs") })
app.get("/departments/ece", (req,res) => { res.render("academics/departments/ece.ejs") })
app.get("/departments/doctoral", (req,res) => { res.render("academics/departments/doctoral.ejs") })
app.get("/departments/math", (req,res) => { res.render("academics/departments/math.ejs") })
app.get("/departments/physics", (req,res) => { res.render("academics/departments/physics.ejs") })

app.get("/centres/dmr", (req,res) => { res.render("academics/centres/dmr.ejs") })
app.get("/centres/drone", (req,res) => { res.render("academics/centres/drone.ejs") })
app.get("/centres/environment", (req,res) => { res.render("academics/centres/environment.ejs") })
app.get("/centres/iks", (req,res) => { res.render("academics/centres/iks.ejs") })
app.get("/centres/icps", (req,res) => { res.render("academics/centres/icps.ejs") })
app.get("/centres/linguistic", (req,res) => { res.render("academics/centres/linguistic.ejs") })
app.get("/centres/nano", (req,res) => { res.render("academics/centres/nano.ejs") })
app.get("/centres/polymer", (req,res) => { res.render("academics/centres/polymer.ejs") })
app.get("/centres/water", (req,res) => { res.render("academics/centres/water.ejs") })


// For Faculty
app.get("/faculty/all", (req, res) => { res.render("faculty&staff/faculty/all.ejs") });
app.get("/faculty/forum", (req, res) => { res.render("faculty&staff/faculty/forum.ejs") });
app.get("/faculty/retired", (req, res) => { res.render("faculty&staff/faculty/retired.ejs") });
app.get("/faculty/current-openings", (req, res) => { res.render("faculty&staff/faculty/current-openings.ejs") });
app.get("/faculty/awards", (req, res) => { res.render("faculty&staff/faculty/awards.ejs") });

// For Staff
app.get("/staff/all", (req, res) => { res.render("faculty&staff/staff/all.ejs") });
app.get("/staff/retired", (req, res) => { res.render("faculty&staff/staff/retired.ejs") });
app.get("/staff/current-openings", (req, res) => { res.render("faculty&staff/staff/current-openings.ejs") });

// Facilities
app.get("/facilities/housing", (req, res) => { res.render("faculty&staff/facilities/housing.ejs") });
app.get("/facilities/healthcare", (req, res) => { res.render("faculty&staff/facilities/healthcare.ejs") });

// Others
app.get("/others/equal-opportunity", (req, res) => { res.render("faculty&staff/others/equal-opportunity.ejs") });
app.get("/others/internal-committee", (req, res) => { res.render("faculty&staff/others/internal-committee.ejs") });
app.get("/others/mental-wellbeing", (req, res) => { res.render("faculty&staff/others/mental-wellbeing.ejs") });

//about iitn
app.get("/about/former-directors", (req, res) => { res.render("institute/about/former-directors.ejs") });
app.get("/about/ranking-recognition", (req, res) => { res.render("institute/about/ranking.ejs") });
app.get("/about/vision-mission", (req, res) => { res.render("institute/about/vision-mission.ejs") });
app.get("/about/campus-facilities", (req, res) => { res.render("institute/about/campus-facilities.ejs") });
app.get("/about/campus-map", (req, res) => { res.render("institute/about/campus-map.ejs") });
app.get("/about/gallery", (req, res) => { res.render("institute/about/gallery.ejs") });
app.get("/about/contact", (req, res) => { res.render("institute/about/contact.ejs") });

// Administration
app.get("/administration/council", (req, res) => { res.render("institute/administration/council.ejs") });
app.get("/administration/governors", (req, res) => { res.render("institute/administration/governor.ejs") });
app.get("/administration/senate", (req, res) => { res.render("institute/administration/senate.ejs") });
app.get("/administration/chairperson", (req, res) => { res.render("institute/administration/chairperson.ejs") });
app.get("/administration/director", (req, res) => { res.render("institute/administration/director.ejs") });
app.get("/administration/administration", (req, res) => { res.render("institute/administration/administration.ejs") });
app.get("/administration/finance-committee", (req, res) => { res.render("institute/administration/finance-committee.ejs") });
app.get("/administration/building-work-committee", (req, res) => { res.render("institute/administration/building-work-committee.ejs") });

// Accreditation
app.get("/accreditation/nirf", (req, res) => { res.render("institute/accreditation/nirf.ejs") });
app.get("/accreditation/nba", (req, res) => { res.render("institute/accreditation/nba.ejs") });
app.get("/accreditation/ariia", (req, res) => { res.render("institute/accreditation/ariia.ejs") });
app.get("/accreditation/qs", (req, res) => { res.render("institute/accreditation/qs.ejs") });

// Training & Placement (T&P)
app.get("/tnp/about-us", (req, res) => { res.render("tnp/about-us.ejs") });
app.get("/tnp/recruit-from-iiitn", (req, res) => { res.render("tnp/recruit-from-iiitn.ejs") });
app.get("/tnp/nagpur", (req, res) => { res.render("tnp/nagpur.ejs") });
app.get("/tnp/placement-statistics", (req, res) => { res.render("tnp/placement-statistics.ejs") });
app.get("/tnp/for-companies", (req, res) => { res.render("tnp/for-companies.ejs") });
app.get("/tnp/for-students", (req, res) => { res.render("tnp/for-students.ejs") });
app.get("/tnp/contact-tp", (req, res) => { res.render("tnp/contact-tp.ejs") });
app.get("/tnp/internships", (req, res) => { res.render("tnp/internships.ejs") });


//Admisssions
app.get("/admissions/ug", (req, res) => { res.render("admissions/ug.ejs") });
app.get("/admissions/pg", (req, res) => { res.render("admissions/pg.ejs") });
app.get("/admissions/rule-book", (req, res) => { res.render("admissions/rule-book.ejs") });

app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
});
