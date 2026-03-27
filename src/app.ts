

import express, { Request, Response } from "express"
 
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { prisma } from "./lib/prisma";
import cors from 'cors';
import { authRoutes } from "./modules/auth/auth.route";
 import { userRouter } from "./modules/user/user.route";
 
const app = express();
app.set("trust proxy", 1);

// Allow multiple origins via TRUSTED_ORIGINS (comma-separated) or fallback to APP_URL
const corsOrigins = ("" + process.env.TRUSTED_ORIGINS || process.env.APP_URL || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
console.log('[CORS] allowed origins:', corsOrigins);

app.use(cors({
    origin: corsOrigins,
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"] 
}))

app.use(express.json());
//get current user
// Log auth-related requests to help debug state/callback issues
app.use((req, res, next) => {
  if (req.path.startsWith('/api/auth')) {
    console.log('[Auth Debug] request:', req.method, req.path, 'query=', req.query);
  }
  next();
});

// Detailed callback checker: logs callback state and inspects verification rows (non-production friendly)
app.use(async (req, res, next) => {
  try {
    if (req.path.startsWith('/api/auth') && req.query && (req.query as any).state) {
      const state = String((req.query as any).state);
      console.log('[Auth Debug] callback state:', state, 'path:', req.path);
      const rows = await prisma.verification.findMany({
        where: { OR: [{ identifier: state }, { value: state }] },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: { id: true, identifier: true, value: true, expiresAt: true, createdAt: true }
      });
      console.log('[Auth Debug] verification rows found:', rows.length, rows);
    }
  } catch (err) {
    console.error('[Auth Debug] verification lookup error:', err);
  } finally {
    next();
  }
});

// Use a standard wildcard so Express matches callbacks and subroutes properly
app.all("/api/auth/{*splat}", toNodeHandler(auth));


app.use("/api/authenticatoin",authRoutes)
 

//all user get admi 
app.use("/api/admin", userRouter);


//reviw path 
 
app.get("/",(req:Request,res:Response)=>{
    res.send('hlw world')
})


export default app;