import express from 'express';
import swaggerUi from 'swagger-ui-express';
import carRoutes from './Routes/CarRoutes';
import motorcycleRoutes from './Routes/MotorcycleRoutes';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerDocument = require('./SwaggerConfig/swagger_output.json');

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/cars', carRoutes);
app.use('/motorcycles', motorcycleRoutes);
export default app;
