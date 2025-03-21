const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../ShipNGo-frontend")));

// Import routes]
app.use("/auth", require("./routes/auth"));                  //login route

app.use("/tracking", require("./routes/tracking"));          //tracking route for index
console.log("Tracking route initialized.");                  //log for index

app.use("/shipment", require("./routes/shipment"));          //route for creating packages

app.use("/packages", require("./routes/packageRoutes"));     //route for showing packages

app.use("/edit", require("./routes/deliverypoints"));        //yusuf did this idk

app.use("/claims", require("./routes/claimRoutes"));         //claims route

// Serve customer and employee dashboards from frontend 
app.get("/dashboard/customer", (req, res) => {
  res.sendFile(path.join(__dirname, "../ShipNGo-frontend/pages/dashboard/customer.html"));
});
app.get("/dashboard/employee", (req, res) => {
  res.sendFile(path.join(__dirname, "../ShipNGo-frontend/pages/dashboard/employee.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));