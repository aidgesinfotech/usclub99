require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const fileuploadRoutes = require("./routes/fileuploadRoutes");

const usersRoutes = require('./routes/usersRoutes');
const rolesRoutes = require('./routes/rolesRoutes');
const permissionsRoutes = require('./routes/permissionsRoutes');
const pagesRoutes = require('./routes/pagesRoutes');
const pagescategoryRoutes = require('./routes/pagescategoryRoutes');
const bannersRoutes = require('./routes/bannersRoutes');
const siteconfigRoutes = require('./routes/siteconfigRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const playerRoutes = require('./routes/playerRoutes');
const casinogamesRoutes = require('./routes/casinogamesRoutes');
const casinoprovidersRoutes = require('./routes/casinoprovidersRoutes');
const casinocategorysRoutes = require('./routes/casinocategorysRoutes');
const depositmethodRoutes = require('./routes/depositmethodRoutes');
const withdrawmethodRoutes = require('./routes/withdrawmethodRoutes');
const depositRoutes = require('./routes/depositRoutes');
const withdrawRoutes = require('./routes/withdrawRoutes');
const casinobetRoutes = require('./routes/casinobetRoutes');
const colorpredictionRoutes = require('./routes/colorpredictionRoutes');
const luckyjetRoutes = require('./routes/luckyjetRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS options
const corsOptions = {
  origin: '*', // If you want any URL then use '*'
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Use CORS middleware with options
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));

app.use("/api/file", fileuploadRoutes);

app.use('/api/users', usersRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/permissions', permissionsRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/pagescategory', pagescategoryRoutes);
app.use('/api/banner', bannersRoutes);
app.use('/api/siteconfig', siteconfigRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/casinogames', casinogamesRoutes);
app.use('/api/casinoproviders', casinoprovidersRoutes);
app.use('/api/casinocategory', casinocategorysRoutes);
app.use('/api/depositmethod', depositmethodRoutes);
app.use('/api/withdrawmethod', withdrawmethodRoutes);
app.use('/api/deposit', depositRoutes);
app.use('/api/withdraw', withdrawRoutes);
app.use('/api/casinobet', casinobetRoutes);
app.use('/api/colorprediction', colorpredictionRoutes);
app.use('/api/luckyjet', luckyjetRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});