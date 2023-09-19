import { notFound, errorHandler } from './middleware/errorMiddleware.js'; 
import userRoutes from './routes/userRoutes.js'

app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);
