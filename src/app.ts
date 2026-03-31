

import express, { Request, Response } from "express"
 
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
 import cors from 'cors';
import { authRoutes } from "./modules/auth/auth.route";
 import { userRouter } from "./modules/user/user.route";
import { ScholarshipRoutes } from "./modules/Scholarship/scholarship.route";
import { ApplicationsRoutes } from "./modules/Applications/applications.route";
import { ReviewsRoutes } from "./modules/Reviews/reviews.route";
import { PaymentRoutes } from "./modules/Payment/payment.route";
import globalErrorHandler from "./middalewared/globalErrorHandler";
import notFound from "./middalewared/NotFound";
import { env } from "./config/env";
 
const app = express();
app.set("trust proxy", 1);

app.use(cors({
    origin:process.env.TRUSTED_ORIGINS,
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"],
    allowedHeaders: ["Content-Type", "Authorization","Cookie"], 
}))

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

 

app.use((req, res, next) => {
  if (req.path.startsWith('/api/auth')) {
    console.log('[Auth Debug] request:', req.method, req.path, 'query=', req.query);
  }
  next();
});



// Use a standard wildcard so Express matches callbacks and subroutes properly
app.all("/api/auth/*splat", toNodeHandler(auth));


app.use("/api/authenticatoin",authRoutes)
 

//all user get admi 
app.use("/api/admin", userRouter);

app.use("/api/scholarship", ScholarshipRoutes);

app.use("/api/applications", ApplicationsRoutes);

app.use("/api/reviews", ReviewsRoutes);

app.use("/api/payment",PaymentRoutes)
 
app.get("/",(req:Request,res:Response)=>{
    res.send('scholarship hub is running')
})

//global error handler
app.use(globalErrorHandler);

app.use(notFound);

export default app;