const required=['NEXT_PUBLIC_TURNSTILE_SITE_KEY','TURNSTILE_SECRET_KEY','MONGODB_URI','POSTMARK_API_KEY','POSTMARK_FROM_EMAIL','POSTMARK_TO_EMAIL','ADMIN_PASSWORD','ADMIN_SESSION_SECRET'];
const missing=required.filter(name=>!process.env[name]?.trim());
if(!process.env.FORM_SECURITY_SECRET && !process.env.ADMIN_SESSION_SECRET) missing.push('FORM_SECURITY_SECRET or ADMIN_SESSION_SECRET');
if(missing.length){console.error('Missing production settings: '+missing.join(', '));process.exitCode=1;}
else console.log('Required settings are present. Verify Turnstile hostnames, sender approval and real inbox delivery before publishing.');
