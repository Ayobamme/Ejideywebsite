import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface ApplicationData {
  surname: string;
  first_name: string;
  middle_name?: string;
  guardian_email: string;
  guardian_name: string;
  guardian_mobile: string;
  class_seeking_admission: string;
  date_of_birth: string;
  gender: string;
  created_at: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { applicationData }: { applicationData: ApplicationData } = await req.json();

    const studentFullName = `${applicationData.surname} ${applicationData.first_name} ${applicationData.middle_name || ''}`.trim();

    // Send email to admin
    const adminEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Ejidey Schools <onboarding@resend.dev>',
        to: ['jekztechnologies@gmail.com'],
        subject: `New Application Submission - ${studentFullName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #059669;">New Student Application Received</h2>
            <p>A new application has been submitted to Ejidey Schools.</p>
            
            <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #059669; margin-top: 0;">Student Details:</h3>
              <table style="width: 100%;">
                <tr><td><strong>Name:</strong></td><td>${studentFullName}</td></tr>
                <tr><td><strong>Date of Birth:</strong></td><td>${new Date(applicationData.date_of_birth).toLocaleDateString()}</td></tr>
                <tr><td><strong>Gender:</strong></td><td>${applicationData.gender}</td></tr>
                <tr><td><strong>Class Seeking Admission:</strong></td><td>${applicationData.class_seeking_admission}</td></tr>
              </table>
            </div>
            
            <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #2563eb; margin-top: 0;">Guardian Details:</h3>
              <table style="width: 100%;">
                <tr><td><strong>Name:</strong></td><td>${applicationData.guardian_name}</td></tr>
                <tr><td><strong>Email:</strong></td><td>${applicationData.guardian_email}</td></tr>
                <tr><td><strong>Phone:</strong></td><td>${applicationData.guardian_mobile}</td></tr>
              </table>
            </div>
            
            <p><strong>Submission Date:</strong> ${new Date(applicationData.created_at).toLocaleString()}</p>
            <p style="margin-top: 30px;">Please log in to the admin portal to review this application and view all submitted documents.</p>
          </div>
        `,
      }),
    });

    if (!adminEmailResponse.ok) {
      const errorData = await adminEmailResponse.json();
      console.error('Admin email error:', errorData);
      throw new Error('Failed to send admin email');
    }

    // Send confirmation email to applicant
    const applicantEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Ejidey Schools <onboarding@resend.dev>',
        to: [applicationData.guardian_email],
        subject: 'Application Submission Confirmation - Ejidey Schools',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #059669; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0;">Ejidey Schools</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Excellence in Education</p>
            </div>
            
            <div style="padding: 30px; background-color: #ffffff; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
              <h2 style="color: #059669;">Application Received Successfully!</h2>
              <p>Dear ${applicationData.guardian_name},</p>
              <p>Thank you for submitting an application for <strong>${studentFullName}</strong> to join <strong>${applicationData.class_seeking_admission}</strong> at Ejidey Schools.</p>
              
              <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; border-left: 4px solid #059669; margin: 25px 0;">
                <h3 style="color: #059669; margin-top: 0;">What Happens Next?</h3>
                <ol style="margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 10px;">Our admissions team will carefully review your application</li>
                  <li style="margin-bottom: 10px;">You will be contacted within <strong>3-5 business days</strong></li>
                  <li style="margin-bottom: 10px;">An aptitude test will be scheduled if the application meets our requirements</li>
                  <li style="margin-bottom: 10px;">We will guide you through the enrollment process</li>
                </ol>
              </div>
              
              <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h3 style="color: #2563eb; margin-top: 0;">Application Summary</h3>
                <table style="width: 100%; font-size: 14px;">
                  <tr><td style="padding: 5px 0;"><strong>Student Name:</strong></td><td>${studentFullName}</td></tr>
                  <tr><td style="padding: 5px 0;"><strong>Class Applying For:</strong></td><td>${applicationData.class_seeking_admission}</td></tr>
                  <tr><td style="padding: 5px 0;"><strong>Submission Date:</strong></td><td>${new Date(applicationData.created_at).toLocaleDateString()}</td></tr>
                </table>
              </div>
              
              <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
                <h3 style="color: #374151;">Contact Us</h3>
                <p style="margin: 5px 0;"><strong>Email:</strong> info@ejideychools.ng</p>
                <p style="margin: 5px 0;"><strong>Phone:</strong> +234 802 854 7932</p>
                <p style="margin: 5px 0;"><strong>WhatsApp:</strong> +234 802 854 7932</p>
              </div>
              
              <p style="margin-top: 30px; color: #6b7280; font-size: 14px;">Thank you for choosing Ejidey Schools. We look forward to welcoming your child to our learning community.</p>
              
              <p style="margin-top: 20px; font-weight: bold; color: #059669;">Ejidey Schools Administration</p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        `,
      }),
    });

    if (!applicantEmailResponse.ok) {
      const errorData = await applicantEmailResponse.json();
      console.error('Applicant email error:', errorData);
      throw new Error('Failed to send applicant email');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Emails sent successfully' }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});