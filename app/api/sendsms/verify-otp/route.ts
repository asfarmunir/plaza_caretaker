import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = 'AC64ec9bac160a80077c11b51d8a8944ac';
const authToken = '747b77356cecd084e2e633ac9b009b99';
const serviceId= 'VA6ccef3d62796e922f0862ba7fd0a883f'
const client = twilio(accountSid, authToken);


 export async function GET(req: NextRequest) {

   try {
    const {searchParams} = new URL(req.url);
    const otp = searchParams.get('otp') as string;
    
    const verificationCheck = await client.verify.v2.services(serviceId).verificationChecks.create(
        {
        to: '+923209814731',
        code: otp
        })

    if(verificationCheck.status !== 'approved'){
        return NextResponse.json({verified:false}, {status: 400})
    }

    return NextResponse.json({verified:true}, {status: 200})
   
   } catch (error:any) {
     console.error(error);
     return NextResponse.json({ error: error.message }, { status: 500 });
    
   }

 }
 