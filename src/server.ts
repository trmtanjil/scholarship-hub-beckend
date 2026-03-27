 import app from "./app";
import { prisma } from "./lib/prisma";
app.set("trust proxy", 1);

const PORT = process.env.PORT || 5000;

async function main() {
    try{
        await prisma.$connect();
 
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }catch(error){
         await prisma.$disconnect();
        process.exit(1);
    }
}
main(); 