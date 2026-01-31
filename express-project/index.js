import express from 'express';
import userRoutes from './routes/users.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();
app.use(express.json()); // to enable our req.body


app.use("/users", userRoutes);

// It must be the last middleware
app.use(errorMiddleware);
// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


// Client (PostMan) - > Routes -> Controller -> Service -> Data (JSON File)
// SOLID Principles:
// S - Single Responsibility Principle
// O - Open/Closed Principle
// L - Liskov Substitution Principle
// I - Interface Segregation Principle
// D - Dependency Inversion Principle