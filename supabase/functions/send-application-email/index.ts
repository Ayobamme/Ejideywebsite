import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

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
  class_seeking_admission: string;
  created_at: string;
}

serve(async (req: Request) => {
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
        from: 'Ejidey Schools <noreply@ejideychools.ng>',
        to: ['jekztechnologies@gmail.com'],
        subject: `New Application Submission - ${studentFullName}`,
        html: `
          <h2>New Student Application Received</h2>
          <p>A new application has been submitted to Ejidey Schools.</p>
          <h3>Student Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${studentFullName}</li>
            <li><strong>Class Seeking Admission:</strong> ${applicationData.class_seeking_admission}</li>
            <li><strong>Guardian Name:</strong> ${applicationData.guardian_name}</li>
            <li><strong>Guardian Email:</strong> ${applicationData.guardian_email}</li>
            <li><strong>Submission Date:</strong> ${new Date(applicationData.created_at).toLocaleString()}</li>
          </ul>
          <p>Please log in to the admin portal to review this application.</p>
        `,
      }),
    });

    // Send confirmation email to applicant
    const applicantEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Ejidey Schools <noreply@ejideychools.ng>',
        to: [applicationData.guardian_email],
        subject: 'Application Submission Confirmation - Ejidey Schools',
        html: `
          <h2>Thank You for Your Application</h2>
          <p>Dear ${applicationData.guardian_name},</p>
          <p>We have successfully received the application for <strong>${studentFullName}</strong> to join <strong>${applicationData.class_seeking_admission}</strong> at Ejidey Schools.</p>
          <h3>Next Steps:</h3>
          <ol>
            <li>Our admissions team will review your application</li>
            <li>You will be contacted within 3-5 business days</li>
            <li>An aptitude test will be scheduled if the application is successful</li>
          </ol>
          <p>If you have any questions, please contact us at:</p>
          <ul>
            <li>Email: info@ejideychools.ng</li>
            <li>Phone: +234 802 854 7932</li>
          </ul>
          <p>Thank you for choosing Ejidey Schools.</p>
          <p><strong>Ejidey Schools Administration</strong></p>
        `,
      }),
    });

    if (!adminEmailResponse.ok || !applicantEmailResponse.ok) {
      throw new Error('Failed to send emails');
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
